import styled from "styled-components";
import PropTypes from "prop-types";
import searchIcon from "assets/searchIcon.svg";
import userIcon from "assets/userIcon.svg";
import chevronDown from "assets/chevronDown.svg";
import Backdrop from "./Backdrop";

const Wrapper = styled.nav`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 7.2rem;
  padding: 0 4.8rem;
  border-bottom: 1px solid var(--border_color);
  background-color: var(--white);
`;

const Search = styled.div`
  display: flex;
  align-items: center;
  background-color: transparent;
  width: 36rem;
  border: 1px solid var(--border_color);
  padding: 1.2rem 2.4rem;
  border-radius: 0.4rem;

  .searchIcon {
    height: 2rem;
    margin-right: 0.6rem;
  }

  input {
    display: inline-block;
    color: var(--grey_1);
    width: 100%;
    background-color: transparent;
    border: none;
    font-size: 14px;
    font-weight: 400;
    text-align: left;

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: var(--sup_text);
    }
  }
`;

const Admin = styled.div`
  display: flex;
  align-items: center;
  width: max-content;
  cursor: pointer;
  position: relative;

  .imgWrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    margin-right: 0.4rem;
    background-color: #d8d8d8;
    border-radius: 50%;
    height: 3.6rem;
    width: 3.6rem;
  }

  .userIcon,
  .downIcon {
    height: 1.6rem;
  }

  .menu {
    background-color: var(--white);
    width: 16rem;
    border-radius: 0.4rem;
    position: absolute;
    top: 2.4rem;
    right: 0;
    box-shadow: 0px 0px 10px var(--background);
    z-index: 10;
    opacity: 0;
    pointer-events: none;
    transition: all 0.2s ease-out;

    &.show {
      top: 4.8rem;
      opacity: 1;
      pointer-events: all;
    }

    .item {
      padding: 1.6rem;
      width: 100%;
      text-align: left;

      &:hover {
        background-color: var(--background);
      }
    }
  }
`;

const Navbar = ({ searchVal = "", setSearchVal }) => {
  const showMenu = () => {
    document.querySelector("#backdrop").classList.add("show");
    document.querySelector("#adminMenu").classList.add("show");
  };

  const hideMenu = () => {
    document.querySelector("#backdrop").classList.remove("show");
    document.querySelector("#adminMenu").classList.remove("show");
  };
  return (
    <Wrapper>
      <Backdrop
        id="backdrop"
        onClick={(e) => {
          e.target.id === e.currentTarget.id && hideMenu();
        }}
        transparent
      />
      <Search>
        <img src={searchIcon} alt="search" className="searchIcon" />
        <input
          type="text"
          name="search"
          placeholder="Search"
          onChange={(e) => setSearchVal(e.target.value)}
          value={searchVal}
        />
      </Search>
      <Admin onClick={showMenu}>
        <div className="imgWrapper">
          <img src={userIcon} alt="user icon" className="userIcon" />
        </div>
        <img src={chevronDown} alt="chevron down" className="downIcon" />
        <div id="adminMenu" className="menu">
          {/* <button className="item sup">Profile</button> */}
          <button className="item sup">Log out</button>
        </div>
      </Admin>
    </Wrapper>
  );
};

Navbar.propTypes = {
  searchVal: PropTypes.string,
  setSearchVal: PropTypes.func,
};

export default Navbar;
