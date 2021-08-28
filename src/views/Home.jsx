import styled from "styled-components";
import DashboardContent from "components/DashboardContent";
import Spacer from "components/Spacer";

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
    accessor: "full_name",
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
    Header: "Location",
    accessor: "location",
  },
  {
    Header: "Order",
    accessor: "order",
  },
  {
    Header: "Date",
    accessor: "date",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
];

const Home = () => {
  return (
    <DashboardContent columns={COLUMNS} title="order">
      <Wrapper>
        {/* Orders due today */}
        <OverviewCard>
          <span className="dot"></span>
          <h2 className="info">20</h2>
          <Spacer y={1.4} />
          <p className="sup">Orders due today</p>
        </OverviewCard>
        {/* Total orders */}
        <OverviewCard>
          <span className="dot"></span>
          <h2 className="info">360</h2>
          <Spacer y={1.4} />
          <p className="sup">Total orders</p>
        </OverviewCard>
        {/* Cash available */}
        <OverviewCard>
          <span className="dot"></span>
          <h2 className="info">NGN 20,000</h2>
          <Spacer y={1.4} />
          <p className="sup">Cash available</p>
        </OverviewCard>
      </Wrapper>
      <Spacer y={4.8} />
    </DashboardContent>
  );
};

export default Home;
