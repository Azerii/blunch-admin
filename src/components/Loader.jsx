import styled, { keyframes } from "styled-components";
// import logo from "../assets/logo.svg";

const bounce = keyframes`
  from {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-2.4rem);
  }

  to {
    transform: translateY(0);
  }
`;

const load = keyframes`
  from {
    width: 0;
  }

  20% {
    width: 30%;
  }

  40% {
    width: 40%;
  }

  50% {
    width: 40%;
  }

  60% {
    width: 40%;
  }

  to {
    width: 95%;
  }
`;

const Wrapper = styled.div`
  // position: absolute;
  // top: 0;
  // left: 0;
  // z-index: 20;
  min-height: 50vh;
  width: 100%;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease-out;

  .progress {
    position: relative;
    width: 32rem;
    height: 3px;
    border-radius: 3px;
    overflow: hidden;
  }

  .bar {
    display: block;
    width: 100%;
    background-color: var(--background);
    height: 100%;
    width: 0;
    height: 100%;
    background-color: var(--primary);
    animation: ${load} 1.5s ease-in-out forwards;
  }

  .logo {
    height: 7.2rem;
    animation: ${bounce} 1s ease-in-out infinite;
  }
`;

export default function Loader() {
  return (
    <Wrapper>
      {/* <img src={logo} alt="Blunch.ng" className="logo" /> */}
      <div className="progress">
        <span className="bar"></span>
      </div>
    </Wrapper>
  );
}
