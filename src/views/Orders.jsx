import DashboardContent from "components/DashboardContent";

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

const Orders = () => {
  return <DashboardContent columns={COLUMNS} />;
};

export default Orders;
