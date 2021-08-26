import DataTable from "components/DataTable";
import styled from "styled-components";
import { useTable, useGlobalFilter, usePagination } from "react-table";
import Navbar from "components/Navbar";
import MOCK_DATA from "utils/MOCK_DATA";

const Wrapper = styled.div`
  padding: 4.8rem;
`;

const DashboardContent = ({
  children,
  data = MOCK_DATA,
  columns = [],
  title,
}) => {
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

  const tableProps = {
    title,
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
  };

  return (
    <>
      <Navbar searchVal={globalFilter} setSearchVal={setGlobalFilter} />
      <Wrapper>
        {children}
        <DataTable {...tableProps} />
      </Wrapper>
    </>
  );
};

export default DashboardContent;
