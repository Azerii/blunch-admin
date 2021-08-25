import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Logo from "./Logo";
import overviewIcon from "assets/overviewIcon.svg";
import menuIcon from "assets/menuIcon.svg";
import bagIcon from "assets/bagIcon.svg";
import locationIcon from "assets/locationIcon.svg";
import tagIcon from "assets/tagIcon.svg";

const Wrapper = styled.div`
  padding: 0 2.4rem;
  background-color: #320102;
  height: 100vh;
  width: 100%;
  overflow: auto;
`;

const Header = styled.div`
  height: 7.2rem;
  display: flex;
  align-items: center;
  margin-bottom: 7.2rem;
`;

const Menu = styled.div`
  display: grid;
  grid-gap: 2.4rem;

  .item {
    padding: 1.4rem 2rem;
    color: #cccccc;
    border-radius: 0.8rem;
    display: flex;
    align-items: center;
    transition: all 0.2s ease-out;

    &:hover,
    &.active {
      background-color: #b2000133;
      color: #ffffff;

      .icon {
        filter: var(--filter_white);
      }
    }

    .icon {
      height: 2rem;
    }

    .text {
      margin-left: 1.2rem;
    }
  }
`;

const Sidebar = () => {
  return (
    <Wrapper>
      <Header>
        <Logo />
      </Header>
      <Menu>
        <NavLink exact to="/dashboard" className="item">
          <img src={overviewIcon} alt="Pie chart icon" className="icon" />
          <span className="sup text">Home</span>
        </NavLink>
        <NavLink to="/dashboard/orders" className="item">
          <img src={menuIcon} alt="Menu icon" className="icon" />
          <span className="sup text">Orders</span>
        </NavLink>
        <NavLink to="/dashboard/products" className="item">
          <img src={bagIcon} alt="shopping bag icon" className="icon" />
          <span className="sup text">Products</span>
        </NavLink>
        <NavLink to="/dashboard/locations" className="item">
          <img src={locationIcon} alt="Map pin" className="icon" />
          <span className="sup text">Locations</span>
        </NavLink>
        <NavLink to="/dashboard/coupons" className="item">
          <img src={tagIcon} alt="tag icon" className="icon" />
          <span className="sup text">Coupons</span>
        </NavLink>
      </Menu>
    </Wrapper>
  );
};

export default Sidebar;
