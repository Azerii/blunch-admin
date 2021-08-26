import styled from "styled-components";

const Backdrop = styled.div`
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
  overflow: auto;

  &.show {
    opacity: 1;
    pointer-events: all;
  }

  .row {
    display: flex;

    &.align-center {
      align-items: center;
    }

    &.justify-end {
      justify-content: flex-end;
    }

    &.justify-space-between {
      justify-content: space-between;
    }
  }
`;

export default Backdrop;
