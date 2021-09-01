import styled from "styled-components";
import PropTypes from "prop-types";

const Box = styled.div`
  display: flex;
  align-items: center;
  padding: 0 2.4rem;
  min-width: 34.2rem;
  height: 5.6rem;
  border-radius: 1.2rem;
  box-shadow: 0px 16px 40px 0px #9aaaac33;
  background-color: var(--white);
  position: fixed;
  top: -6rem;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  pointer-events: none;
  transition: all 250ms ease-in;
  z-index: 10;

  &.show {
    top: 4.8rem;
    opacity: 1;
  }

  &.success {
    border-left: 8px solid var(--success);
  }

  &.danger {
    border-left: 8px solid var(--danger);
  }

  .text {
    color: va(--text);
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 27px;
    letter-spacing: 0px;
    text-align: left;
  }
`;

const AlertBox = ({ className, text, type }) => {
  return (
    <Box className={`${className}${type ? ` ${type}` : ""}`}>
      <span className="text">{text}</span>
    </Box>
  );
};

AlertBox.propTypes = {
  className: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default AlertBox;
