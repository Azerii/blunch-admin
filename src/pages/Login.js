import styled from "styled-components";
import Container from "components/Container";
import Logo from "components/Logo";
import Spacer from "components/Spacer";
import FormGroup from "components/FormGroup";
import Button from "components/Button";

const Wrapper = styled.div`
  .formWrapper {
    width: 36rem;
    margin: auto;
    margin-block: 10rem;
    text-align: center;
  }

  .title {
    font-size: 48px;
    font-weight: 700;
    line-height: 60px;
    letter-spacing: 0em;
  }

  form {
    display: grid;
    grid-gap: 2.4rem;
  }

  .submitBtn {
    margin-top: 2.4rem;
  }
`;

const Header = styled(Container)`
  height: 7.2rem;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--border_color);
`;

const Login = () => {
  return (
    <Wrapper>
      <Header>
        <Logo />
      </Header>
      <div className="formWrapper">
        <h1 className="title">Sign in</h1>
        <Spacer y={1.2} />
        <p className="sup">Enter your email address and password to sign in.</p>
        <Spacer y={4.8} />
        <form>
          <FormGroup
            fieldStyle="shortText"
            name="email"
            placeholder="Email address"
          />
          <FormGroup
            fieldStyle="shortText"
            name="password"
            placeholder="Password"
            className="password"
          />
          <Button text="Login" className="submitBtn" fullWidth disabled />
        </form>
      </div>
    </Wrapper>
  );
};

export default Login;
