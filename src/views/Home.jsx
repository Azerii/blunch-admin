import DataTable from "components/DataTable";
import Spacer from "components/Spacer";
import styled from "styled-components";
import { useTable, useGlobalFilter, usePagination } from "react-table";
import Navbar from "components/Navbar";
import MOCK_DATA from "utils/MOCK_DATA";

const Wrapper = styled.div`
  padding: 4.8rem;

  .overview {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 4.8rem;
  }
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
    Header: "phone",
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
  const data = MOCK_DATA;
  const columns = COLUMNS;

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    setGlobalFilter,
  } = useTable(
    {
      data,
      columns,
    },
    useGlobalFilter,
    usePagination
  );

  const { globalFilter, pageIndex, pageSize } = state;

  const handleRowClick = () => {};

  const tableProps = {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    pageIndex,
    gotoPage,
    pageCount,
    pageSize,
    setPageSize,
    setGlobalFilter,
    globalFilter,
    handleRowClick,
  };

  return (
    <>
      <Navbar searchVal={globalFilter} setSearchVal={setGlobalFilter} />
      <Wrapper>
        <div className="overview">
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
        </div>
        <Spacer y={4.8} />
        <DataTable {...tableProps} />
      </Wrapper>
    </>
  );
};

export default Home;
