import { useGlobalFilter, useTable } from "react-table";
import TableContext from "./TableContext";

const TableProvider = ({ children, data = [], columns = [] }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    {
      data,
      columns,
    },
    useGlobalFilter
  );

  const { globalFilter } = state;

  const tableProps = {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    globalFilter,
    setGlobalFilter,
  };

  return (
    <TableContext.provider value={tableProps}>{children}</TableContext.provider>
  );
};

export default TableProvider;
