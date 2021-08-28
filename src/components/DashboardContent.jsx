import DataTable from "components/DataTable";
import styled from "styled-components";
import { useTable, useGlobalFilter, usePagination } from "react-table";
import Navbar from "components/Navbar";

const Wrapper = styled.div`
  padding: 4.8rem;
`;

const DashboardContent = ({
  children,
  data = [],
  columns = [],
  title,
  collectionType,
  canAdd,
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
    collectionType,
    canAdd,
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
