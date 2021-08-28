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
import FormGroup from "./FormGroup";
import Dropdown from "./Dropdown";
import uploadCloud from "assets/uploadCloud.svg";
import plusIcon from "assets/plusIcon.svg";
import Spacer from "./Spacer";

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
    padding-left: 2.4rem;
    width: 5rem;
  }

  .img {
    height: 4.8rem;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2.4rem;
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

  button:disabled {
    background-color: var(--background);
    cursor: default;
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
    overflow-wrap: anywhere;
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

const FormWrapper = styled(Backdrop)`
  opacity: 1;
  pointer-events: all;

  .contentWrapper {
    width: 52rem;
    margin: 12rem auto;
    padding: 2.4rem;
    border-radius: 1rem;
    background-color: var(--white);
    display: grid;
    grid-gap: 2.4rem;
  }

  .dropZone {
    height: 14.4rem;
    background-color: #efefef;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 0.8rem;

    .prompt {
      color: var(--sup_text);
    }

    .browse {
      cursor: pointer;
    }
  }

  .attachment {
    display: grid;
    grid-template-columns: 10rem 2fr 1fr;
    grid-gap: 2.4rem;
    align-items: center;
    padding: 1.6rem 2.4rem;

    .imgWrapper {
      width: 100%;
      height: 10rem;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      border-radius: 0.4rem;

      img {
        height: 100%;
      }
    }

    .imgDetails {
      color: var(--sup_text);
      overflow: hidden;
      max-width: 90%;

      .text {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }

    .change {
      color: var(--danger);
      text-align: right;

      .prompt {
        cursor: pointer;
      }
    }
  }

  #photoInput {
    display: none;
  }

  .uploadIcon {
    height: 2.4rem;
    margin-bottom: 1.2rem;
  }

  .textUnderline {
    text-decoration: underline;
  }
`;

const days = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

const numSequence = (max) => {
  let arr = [];

  for (let i = 0; i < max; i++) {
    arr[i] = i + 1;
  }

  return arr;
};

const DataTable = (props) => {
  const [selectedContentIds, setSelectedContentIds] = useState([]);
  const [rowDetails, setRowDetails] = useState({});
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [selectedDay, setSelectedDay] = useState("");
  const [mealImgDetails, setMealImgDetails] = useState(false);
  const [activeFieldVal, setActiveFieldVal] = useState("");
  const [couponType, setCouponType] = useState("");
  const [showAdd, setShowAdd] = useState(false);

  const {
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

  const loadFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMealImgDetails(file);
      // console.log(file);
      // const url = URL.createObjectURL(file);
      // const photoOutput = document.querySelector("#photoOutput");
      // photoOutput.src = url;
    }
  };

  const getMediaSize = (size) => {
    return size < 1024
      ? `${size.toFixed(1)} b`
      : size > 1024 && size < 1024 * 1024
      ? `${(size / 1024).toFixed(1)} kb`
      : `${(size / 1024 / 1024).toFixed(1)} mb`;
  };

  useEffect(() => console.log(rows), []);

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
                <Button text="Delete" width="50%" className="plain textDark" />
              </div>
            </div>
          </DeleteModal>
        )}
        {!!Object.keys(rowDetails).length && (
          <RowDetails>
            <div className="contentWrapper">
              <div className="header row align-center justify-space-between">
                <span className="sup text">
                  {collectionType ?? "row"} details
                </span>
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
                  />
                </div>
              </div>
            </div>
          </RowDetails>
        )}
        {showAdd && (
          <FormWrapper>
            <form className="contentWrapper">
              <h5>Add new {collectionType}</h5>

              {/* Meal */}
              {collectionType?.toLowerCase() === "meal" && (
                <>
                  <FormGroup
                    fieldStyle="shortText"
                    name="name"
                    placeholder="Meal name"
                  />
                  <FormGroup
                    fieldStyle="shortText"
                    inputType="number"
                    name="price"
                    placeholder="Price"
                  />
                  <Dropdown
                    name="day"
                    list={days}
                    value={selectedDay}
                    setValue={setSelectedDay}
                    placeholder="Day"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    id="photoInput"
                    onChange={(e) => loadFile(e)}
                  />
                  {!mealImgDetails && (
                    <div className="dropZone">
                      <img
                        src={uploadCloud}
                        alt="upload"
                        className="uploadIcon"
                      />
                      <p className="sup prompt">
                        Drag &amp; drop or{" "}
                        <span
                          className="textUnderline browse"
                          onClick={() =>
                            document.querySelector("#photoInput").click()
                          }
                        >
                          browse
                        </span>
                      </p>
                    </div>
                  )}
                  {mealImgDetails && (
                    <div className="attachment">
                      <div className="imgWrapper">
                        <img
                          src={URL.createObjectURL(mealImgDetails)}
                          alt="meal"
                          id="photoOutput"
                        />
                      </div>
                      <div className="imgDetails">
                        <h5 className="text">{mealImgDetails.name}</h5>
                        <Spacer y={1.2} />
                        <p className="small">
                          {getMediaSize(mealImgDetails.size)}
                        </p>
                      </div>
                      <div className="change">
                        <span
                          className="textUnderline prompt"
                          onClick={() =>
                            document.querySelector("#photoInput").click()
                          }
                        >
                          Change
                        </span>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Location */}
              {collectionType?.toLowerCase() === "location" && (
                <>
                  <FormGroup
                    fieldStyle="shortText"
                    name="name"
                    placeholder="Location name"
                  />
                  <FormGroup
                    fieldStyle="shortText"
                    inputType="number"
                    name="price"
                    placeholder="Price"
                  />
                  <Dropdown
                    name="active"
                    list={[0, 1]}
                    value={activeFieldVal}
                    setValue={setActiveFieldVal}
                    placeholder="Active"
                  />
                </>
              )}

              {/* Coupon */}
              {collectionType?.toLowerCase() === "coupon" && (
                <>
                  <FormGroup
                    fieldStyle="shortText"
                    name="name"
                    placeholder="Coupon name"
                  />
                  <FormGroup
                    fieldStyle="shortText"
                    name="code"
                    placeholder="Coupon code"
                  />
                  <FormGroup
                    fieldStyle="shortText"
                    name="expires"
                    placeholder="Duration (in days)"
                  />
                  <Dropdown
                    name="type"
                    list={["delivery"]}
                    value={couponType}
                    setValue={setCouponType}
                    placeholder="Coupon type"
                  />
                </>
              )}

              <div className="row">
                <Button
                  type="button"
                  text="Cancel"
                  width="50%"
                  className="plain textDark"
                  onClick={() => setShowAdd(false)}
                />
                <Button type="submit" text="Save" width="50%" />
              </div>
            </form>
          </FormWrapper>
        )}
        {title && (
          <Header>
            <h1>{title}</h1>
            {canAdd && (
              <Button
                text={`Add ${collectionType}`}
                icon={plusIcon}
                onClick={() => setShowAdd(true)}
              />
            )}
          </Header>
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
                    <td {...cell.getCellProps()}>
                      {cell.column.Header === "Image" ? (
                        <img
                          src={cell.value}
                          alt={row.values.name}
                          className="img"
                        />
                      ) : (
                        cell.render("Cell")
                      )}
                    </td>
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
