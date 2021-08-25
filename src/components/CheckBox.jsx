import styled from "styled-components";
import PropTypes from "prop-types";
import doneIconWhite from "assets/doneIconWhite.svg";

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  height: 1.8rem;
  width: 1.8rem;
  border: 2px solid
    ${(props) => (props.checked ? "var(--text)" : "var(--sup_text)")};
  border-radius: ${(props) => (props.circle ? "100%" : "2px")};
  background-color: ${(props) =>
    props.checked ? "var(--text)" : "var(--white)"};
  cursor: pointer;

  input {
    display: none;
  }

  .checkedIcon {
    height: 0.8rem;
    pointer-events: none;
  }
`;

const CheckBox = ({ className, name, circle, required, checked, onClick }) => {
  return (
    <Box
      circle={circle}
      checked={checked}
      className={className}
      onClick={onClick}
    >
      <input
        type="checkbox"
        name={name}
        id={`checkbox_${name}}`}
        data-name={name}
        checked={checked}
        readOnly
        required={required}
      />
      <img src={doneIconWhite} alt="check" className="checkedIcon" />
    </Box>
  );
};

CheckBox.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  grey: PropTypes.bool,
  circle: PropTypes.bool,
  required: PropTypes.bool,
};

export default CheckBox;
