import styled from "styled-components";
import DashboardContent from "components/DashboardContent";
import Spacer from "components/Spacer";
import { useEffect, useState } from "react";
import AlertBox from "components/AlertBox";
import axios from "axios";
import { API_HOST, token } from "utils/config";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 4.8rem;
`;

const OverviewCard = styled.div`
  position relative;
  background-color: var(--white);
  border-radius: 1rem;
  padding: 2.4rem;

  .dot {
    height: 1rem;
    width: 1rem;
    background-color: var(--primary);
    border-radius: 50%;
    position: absolute;
    top: 2.4rem;
    right: 2.4rem;
  }

  .sup {
    color: var(--sup_text);
  }

  .info {
    width: 80%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;

const COLUMNS = [
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Phone number",
    accessor: "phone",
  },
  {
    Header: "Email address",
    accessor: "email",
  },
  {
    Header: "Address",
    accessor: "address",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Date",
    accessor: "date",
  },
];

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [ordersToday, setOrdersToday] = useState([]);
  const [alertType, setAlertType] = useState("");
  const [alertText, setAlertText] = useState("");

  const showAlert = (msg = "...", type) => {
    // e.preventDefault();
    setAlertType(type);
    setAlertText(msg);

    document.querySelector(".alertBox").classList.add("show");
    setTimeout(
      () => document.querySelector(".alertBox").classList.remove("show"),
      3000
    );
  };

  const getOrders = async () => {
    try {
      setLoading(true);
      const res_all = await axios.get(`${API_HOST}/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const res_today = await axios.get(`${API_HOST}/orders/today`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res_today?.data?.orders) {
        const temp = res_today.data.orders.map((order) => ({
          ...order,
          date: new Date(order.created_at).toLocaleDateString(),
        }));

        setOrdersToday(temp);
      }

      if (res_all?.data?.orders) {
        const temp = res_all.data.orders.map((order) => ({
          ...order,
          date: new Date(order.created_at).toLocaleDateString(),
        }));

        setOrders(temp);
      }

      setLoading(false);
    } catch (e) {
      setLoading(false);
      showAlert(e.message, "danger");
      console.log(e.message);
    }
  };

  useEffect(() => {
    getOrders();
    // eslint-disable-next-line
  }, []);

  return (
    <DashboardContent
      columns={COLUMNS}
      data={ordersToday}
      collectionType="order"
      loading={loading}
    >
      <AlertBox className="alertBox" type={alertType} text={alertText} />
      {!loading && (
        <Wrapper>
          {/* Orders due today */}
          <OverviewCard>
            <span className="dot"></span>
            <h2 className="info">{ordersToday.length}</h2>
            <Spacer y={1.4} />
            <p className="sup">Orders due today</p>
          </OverviewCard>
          {/* Total orders */}
          <OverviewCard>
            <span className="dot"></span>
            <h2 className="info">{orders.length}</h2>
            <Spacer y={1.4} />
            <p className="sup">Total orders</p>
          </OverviewCard>
          {/* Cash available */}
          <OverviewCard>
            <span className="dot"></span>
            <h2 className="info">N/A</h2>
            <Spacer y={1.4} />
            <p className="sup">Cash available</p>
          </OverviewCard>
        </Wrapper>
      )}
      <Spacer y={4.8} />
    </DashboardContent>
  );
};

export default Home;
