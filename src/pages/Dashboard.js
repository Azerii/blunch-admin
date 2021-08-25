import Sidebar from "components/Sidebar";
import { Route, Switch } from "react-router";
import styled from "styled-components";
import Home from "views/Home";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 24rem auto;
  background-color: #f9fafb;

  .content {
    height: 100vh;
    overflow: auto;
  }
`;

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: ${(props) =>
    props.transparent ? "transparent" : "#00000020"};
  opacity: 0;
  pointer-events: none;
  z-index: 5;

  &.show {
    opacity: 1;
    pointer-events: all;
  }
`;

const Dashboard = () => {
  return (
    <Wrapper>
      <Sidebar />
      <div className="content">
        <Switch>
          <Route exact path="/dashboard" component={Home} />
        </Switch>
      </div>
    </Wrapper>
  );
};

export default Dashboard;
