import axios from "axios";
import AlertBox from "components/AlertBox";
import DashboardContent from "components/DashboardContent";
import { useEffect, useState } from "react";
import { API_HOST, token } from "utils/config";

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

const Orders = () => {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
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
      const res = await axios.get(`${API_HOST}/orders`, {
        headers: { Authorization: `Bearer ${token()}` },
      });

      if (res?.data?.orders) {
        const temp = res.data.orders.map((order) => ({
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
      data={orders}
      title="Orders"
      collectionType="order"
      loading={loading}
    >
      <AlertBox className="alertBox" type={alertType} text={alertText} />
    </DashboardContent>
  );
};

export default Orders;
