import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CheckBox from "./CheckBox";
import deleteIcon from "assets/deleteIconWhite.svg";
import downloadIcon from "assets/downloadIconWhite.svg";
import chevronDown from "assets/chevronDownSlim.svg";
import nextIcon from "assets/nextIcon.svg";
import prevIcon from "assets/prevIcon.svg";
import closeIcon from "assets/closeWhite.svg";
import Button from "./Button";
import Backdrop from "./Backdrop";

const Wrapper = styled.div`
  background-color: transparent;
  overflow: auto;

  .loader {
    height: 70vh;
    width: 100%;
    display: flex;
    align-items: center;
  }
`;

const Inner = styled.table`
  border-collapse: collapse;
  width: 100%;
  background-color: #ffffff;
  border-radius: 0.25rem;

  td {
    border: 1px solid var(--border_color);
    border-left: none;
    border-right: none;
    padding: 1.8rem 1rem;
    color: var(--sup_text);
    font-size: 14px;
    line-height: 18px;
    max-width: 14rem;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  tr {
    transition: all 0.2s ease-out;
  }

  tr:hover {
    background-color: var(--background);
    cursor: pointer;
  }

  tr.header {
    cursor: default;
  }

  tr.header: hover {
    background-color: transparent;
  }

  th {
    padding: 1.8rem 1rem;
    text-align: left;
    color: var(--text);
    font-size: 14px;
    font-weight: 500;
    line-height: 18px;
    white-space: nowrap;
  }

  .checkbox {
    padding: 0 2.4rem;
  }
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: var(--text);
  width: 100%;

  .col {
    display: flex;
  }

  .item {
    padding: 1.6rem;
    display: flex;
    align-items: center;
    color: var(--white);
    font-size: 14px;
    line-height: 18px;

    .icon {
      margin-left: 1.2rem;
    }
  }

  button.item {
    &:hover {
      background-color: #ffffff20;
    }
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: var(--white);
  margin-top: 1.6rem;
  border-bottom: 1px solid var(--border_color);

  .divider {
    height: 100%;
    width: 1px;
    background-color: var(--border_color);
  }

  .col {
    display: flex;
    align-items: center;
  }

  .item {
    padding: 1.6rem;
  }

  .pageSize {
    span {
      margin-right: 1.6rem;
    }
  }

  #pageIndex {
    padding: 0 1.6rem;
  }
`;

const RowDetails = styled(Backdrop)`
  opacity: 1;
  pointer-events: all;

  .contentWrapper {
    width: 52rem;
    margin: 12rem auto;
  }

  .header {
    background-color: var(--primary);
    padding: 1.8rem 2.4rem;
    color: var(--white);
    border-radius: 1rem 1rem 0 0;

    button {
      width: max-content;
    }

    .text {
      text-transform: capitalize;
    }

    .icon {
      height: 2rem;
    }
  }

  .details {
    background-color: var(--white);
    padding: 2.4rem;
    border-radius: 0 0 1rem 1rem;
  }

  .rowItem {
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-gap: 1.2rem;
    margin-bottom: 2.4rem;
  }

  .exportBtn {
    font-size: 14px;
    line-height: 18px;
  }
`;

const DeleteModal = styled(Backdrop)`
  opacity: 1;
  pointer-events: all;

  .contentWrapper {
    width: 32rem;
    margin: 12rem auto;
    text-align: center;
    padding: 4.8rem 3.2rem;
    border-radius: 1rem;
    background-color: var(--white);
  }

  .actionBtns {
    margin-top: 2.4rem;
  }
`;

const DataTable = (props) => {
  const [selectedContentIds, setSelectedContentIds] = useState([]);
  const [rowDetails, setRowDetails] = useState({});
  const [confirmDelete, setConfirmDelete] = useState(false);

  const {
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
    pageIndex,
    gotoPage,
    pageCount,
    pageSize,
    setPageSize,
  } = props;

  const handleSelectAll = (event) => {
    event.stopPropagation();
    let newSelectedContentIds;

    if (selectedContentIds.length !== page.length) {
      newSelectedContentIds = page.map((item) => item.id);
    } else {
      newSelectedContentIds = [];
    }

    setSelectedContentIds(newSelectedContentIds);
  };

  const handleSelectOne = (event, id) => {
    event.stopPropagation();

    const selectedIndex = selectedContentIds.indexOf(id);
    let newSelectedContentIds = [];

    if (selectedIndex === -1) {
      newSelectedContentIds = newSelectedContentIds.concat(
        selectedContentIds,
        id
      );
    } else if (selectedIndex === 0) {
      newSelectedContentIds = newSelectedContentIds.concat(
        selectedContentIds.slice(1)
      );
    } else if (selectedIndex === selectedContentIds.length - 1) {
      newSelectedContentIds = newSelectedContentIds.concat(
        selectedContentIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedContentIds = newSelectedContentIds.concat(
        selectedContentIds.slice(0, selectedIndex),
        selectedContentIds.slice(selectedIndex + 1)
      );
    }

    setSelectedContentIds(newSelectedContentIds);
  };

  // useEffect(() => console.log(rows), []);

  const numSequence = (max) => {
    let arr = [];

    for (let i = 0; i < max; i++) {
      arr[i] = i + 1;
    }

    return arr;
  };

  return (
    <>
      <Wrapper>
        {confirmDelete && (
          <DeleteModal>
            <div className="contentWrapper">
              <h5>Delete selected items?</h5>
              <div className="actionBtns row justify-space-between">
                <Button
                  text="Cancel"
                  width="50%"
                  onClick={() => setConfirmDelete(false)}
                />
                <Button text="Delete" width="50%" className="plain" />
              </div>
            </div>
          </DeleteModal>
        )}
        {!!Object.keys(rowDetails).length && (
          <RowDetails>
            <div className="contentWrapper">
              <div className="header row align-center justify-space-between">
                <span className="sup text">{title ?? "row"} details</span>
                <button onClick={() => setRowDetails({})}>
                  <img src={closeIcon} alt="Close" className="icon" />
                </button>
              </div>
              <div className="details">
                {Object.keys(rowDetails.values).map((item, index) => (
                  <div key={item} className="rowItem">
                    <span className="sup">
                      {rowDetails.cells[index].column.Header}
                      {rowDetails.cells[index].column.Header === "Amount" &&
                        " Paid"}
                    </span>
                    <span className="sup">{rowDetails.values[item]}</span>
                  </div>
                ))}
                <div className="row justify-end">
                  <Button
                    className="exportBtn"
                    text="Export"
                    icon={downloadIcon}
                    hasIcon
                  />
                </div>
              </div>
            </div>
          </RowDetails>
        )}
        {!!selectedContentIds.length && (
          <Actions>
            <div className="col">
              <span className="item">
                {selectedContentIds.length} item
                {selectedContentIds.length > 1 ? "s" : ""} selected
              </span>
            </div>
            <div className="col">
              <button className="item">
                <span>Export</span>
                <img src={downloadIcon} alt="Arrow down" className="icon" />
              </button>
              <button className="item" onClick={() => setConfirmDelete(true)}>
                <span>Delete</span>
                <img src={deleteIcon} alt="Bin" className="icon" />
              </button>
              <button
                className="item"
                onClick={() => setSelectedContentIds([])}
              >
                <span>Cancel</span>
              </button>
            </div>
          </Actions>
        )}
        <Inner {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()} className="header">
                <th className="checkbox">
                  <CheckBox
                    name={`select_all`}
                    checked={selectedContentIds.length === page.length}
                    onClick={(e) => handleSelectAll(e)}
                  />
                </th>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  onClick={() => {
                    setRowDetails(row);
                  }}
                >
                  <td className="checkbox">
                    <CheckBox
                      name={`row_${row.id}`}
                      checked={selectedContentIds.indexOf(row.id) !== -1}
                      onClick={(event) => handleSelectOne(event, row.id)}
                    />
                  </td>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </Inner>
        <Pagination>
          <div className="col">
            <div className="col pageSize item">
              <span className="sup">Items per page: </span>
              <div className="col selectGroup">
                <select
                  id="pageSize"
                  name="pageSize"
                  onChange={(e) => setPageSize(Number(e.target.value))}
                  defaultValue={pageSize}
                >
                  <option value="" hidden>
                    {pageSize}
                  </option>
                  {rows.length >= 10 && <option value="10">10</option>}
                  {rows.length >= 20 && <option value="20">20</option>}
                  {rows.length >= 30 && <option value="30">30</option>}
                  {rows.length >= 40 && <option value="40">40</option>}
                  {rows.length >= 50 && <option value="50">50</option>}
                </select>
                <img
                  src={chevronDown}
                  alt="dropdown"
                  className="dropdownIcon"
                />
              </div>
            </div>
            <div className="divider"></div>
            <div className="col item">
              <span className="sup">
                {page[0].index + 1} – {page[pageSize - 1].index + 1} of{" "}
                {rows.length} items
              </span>
            </div>
            <div className="divider"></div>
          </div>
          <div className="col">
            <div className="divider"></div>
            <div className="col item">
              <div className="col selectGroup">
                <select
                  id="pageSize"
                  name="pageSize"
                  onChange={(e) => {
                    const pageNumber = e.target.value
                      ? Number(e.target.value) - 1
                      : 0;
                    gotoPage(pageNumber);
                  }}
                  value={pageIndex + 1}
                >
                  <option value="" hidden>
                    {pageIndex + 2}
                  </option>
                  {numSequence(pageCount).map((item) => (
                    <option key={`page_${item}`} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
                <img
                  src={chevronDown}
                  alt="dropdown"
                  className="dropdownIcon"
                />
              </div>
              <div className="col">
                <span className="sup">
                  &nbsp; of {pageCount} page{pageCount > 1 ? "s" : ""}
                </span>
              </div>
            </div>
            <div className="divider"></div>
            <button
              className="col item nav"
              disabled={!canPreviousPage}
              onClick={() => previousPage()}
            >
              <img src={prevIcon} alt="previous" className="icon" />
            </button>
            <div className="divider"></div>
            <button
              className="col item nav"
              disabled={!canNextPage}
              onClick={() => nextPage()}
            >
              <img src={nextIcon} alt="next" className="icon" />
            </button>
          </div>
        </Pagination>
      </Wrapper>
    </>
  );
};

export default DataTable;
