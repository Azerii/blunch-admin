import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Wrapper = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
  height: 4.8rem;
  width: ${(props) =>
    props.fullWidth ? "100%" : props.width ?? "max-content"};
  padding: 0 2.4rem;
  background-color: ${(props) =>
    props.disabled ? "var(--grey_1)" : "var(--primary)"};
  color: var(--white);
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0.75px;
  text-align: center;
  transition: background 250ms ease-in;

  .icon {
    height: 1.6rem;
    margin-left: 1.2rem;
  }

  &:hover {
    background-color: ${(props) =>
      props.disabled ? "var(--grey_1)" : "var(--primary_dark)"};
  }

  &.bordered {
    background-color: transparent;
    border: 2px solid
      ${(props) => (props.disabled ? "var(--grey_1)" : "var(--primary)")};
    color: ${(props) => (props.disabled ? "var(--grey_1)" : "var(--primary)")};

    &:hover {
      background-color: transparent;
      border: 2px solid
        ${(props) => (props.disabled ? "var(--grey_1)" : "var(--primary_dark)")};
      color: ${(props) =>
        props.disabled ? "var(--grey_1)" : "var(--primary_dark)"};
    }
  }

  &.plain {
    background-color: transparent;
    border: none;
    color: ${(props) => (props.disabled ? "var(--grey_1)" : "var(--primary)")};

    &:hover {
      background-color: transparent;
      border: none;
      color: ${(props) =>
        props.disabled ? "var(--grey_1)" : "var(--primary_dark)"};
    }
  }

  &.textDark {
    color: var(--text);
  }
`;

const Button = ({
  className,
  type,
  fullWidth,
  width,
  text,
  disabled,
  color,
  as,
  href,
  target,
  rel,
  onClick,
  loading,
  icon,
}) => {
  const styleProps = {
    className,
    type,
    fullWidth,
    width,
    text,
    disabled,
    color,
    as,
    href,
    target,
    rel,
    onClick,
  };
  return (
    <Wrapper {...styleProps}>
      <span>{loading ? "..." : text}</span>
      {icon && <img src={icon} alt="icon" className="icon" />}
    </Wrapper>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
  className: PropTypes.string,
  href: PropTypes.string,
  target: PropTypes.string,
  rel: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  width: PropTypes.string,
  loading: PropTypes.bool,
  icon: PropTypes.string,
};

export default Button;
