import DashboardContent from "components/DashboardContent";
import MOCK_DATA_MEALS from "utils/MOCK_DATA_MEALS";

const COLUMNS = [
  {
    Header: "Image",
    accessor: "image",
  },
  {
    Header: "Meal name",
    accessor: "name",
  },
  {
    Header: "Price",
    accessor: "price",
  },
  {
    Header: "Day",
    accessor: "day",
  },
];

const Meals = () => {
  return (
    <DashboardContent
      data={MOCK_DATA_MEALS}
      columns={COLUMNS}
      title="Meals"
      collectionType="meal"
      canAdd
    />
  );
};

export default Meals;
