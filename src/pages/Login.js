import styled from "styled-components";
import Container from "components/Container";
import Logo from "components/Logo";
import Spacer from "components/Spacer";
import FormGroup from "components/FormGroup";
import Button from "components/Button";
import { useState } from "react";
import axios from "axios";
import { API_HOST } from "utils/config";
import { useHistory } from "react-router";
import formDataToJSON from "utils/formDataToJSON";
import AlertBox from "components/AlertBox";

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
  const router = useHistory();
  const [loading, setLoading] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [alertText, setAlertText] = useState("");

  const showAlert = (msg = "...", type) => {
    // e.preventDefault();
    setAlertType(type);
    setAlertText(msg);

    document.querySelector(".alertBox").classList.add("show");
    setTimeout(
      () => document.querySelector(".alertBox").classList.remove("show"),
      3000
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = formDataToJSON(formData);

    try {
      setLoading(true);
      const res = await axios.post(
        `${API_HOST}?email=${data.email}&password=${data.password}`
      );
      setLoading(false);
      if (res?.data[0]?.success) {
        sessionStorage.setItem("act", res.data[0].token);
        router.push("/dashboard");
      } else {
        showAlert(`${res.data.failure ?? "An error occurred"}`, "danger");
      }
    } catch (e) {
      setLoading(false);
      showAlert(e.message, "danger");
      console.log(e.message);
    }
  };

  return (
    <Wrapper>
      <AlertBox className="alertBox" type={alertType} text={alertText} />
      <Header>
        <Logo />
      </Header>
      <div className="formWrapper">
        <h1 className="title">Sign in</h1>
        <Spacer y={1.2} />
        <p className="sup">Enter your email address and password to sign in.</p>
        <Spacer y={4.8} />
        <form onSubmit={handleSubmit}>
          <FormGroup
            fieldStyle="shortText"
            name="email"
            inputType="email"
            placeholder="Email address"
          />
          <FormGroup
            fieldStyle="shortText"
            name="password"
            inputType="password"
            placeholder="Password"
            className="password"
          />
          <Button
            text={loading ? "Logging in" : "Login"}
            className="submitBtn"
            fullWidth
            disabled={loading}
          />
        </form>
      </div>
    </Wrapper>
  );
};

export default Login;
