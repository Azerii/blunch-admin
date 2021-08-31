import DataTable from "components/DataTable";
import styled from "styled-components";
import { useTable, useGlobalFilter, usePagination } from "react-table";
import Navbar from "components/Navbar";
import Loader from "./Loader";

const Wrapper = styled.div`
  padding: 4.8rem;
`;

const DashboardContent = ({
  children,
  data = [],
  columns = [],
  title,
  collectionType,
  handleAdd,
  handleEdit,
  submitting,
  loading,
  extra,
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
    handleAdd,
    handleEdit,
    submitting,
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
    extra,
  };

  return (
    <>
      <Navbar searchVal={globalFilter} setSearchVal={setGlobalFilter} />
      <Wrapper>
        {children}
        {loading ? <Loader /> : <DataTable {...tableProps} />}
      </Wrapper>
    </>
  );
};

export default DashboardContent;
