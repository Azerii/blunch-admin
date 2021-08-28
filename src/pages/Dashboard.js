import Sidebar from "components/Sidebar";
import { Route, Switch } from "react-router";
import styled from "styled-components";
import Home from "views/Home";
import Meals from "views/Meals";
import Orders from "views/Orders";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 24rem auto;
  background-color: #f9fafb;

  .content {
    height: 100vh;
    overflow: auto;
  }
`;

const Dashboard = () => {
  return (
    <Wrapper>
      <Sidebar />
      <div className="content">
        <Switch>
          <Route exact path="/dashboard" component={Home} />
          <Route exact path="/dashboard/orders" component={Orders} />
          <Route exact path="/dashboard/meals" component={Meals} />
        </Switch>
      </div>
    </Wrapper>
  );
};

export default Dashboard;
