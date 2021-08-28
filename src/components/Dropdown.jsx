import PropTypes from "prop-types";
import styled from "styled-components";
import chevron_down from "assets/chevron_down.svg";

const DropdownWrapper = styled.div`
  width: 100%;
  position: relative;

  .selectInput {
    display: block;
    color: var(--text);
    width: 80%;
    background-color: transparent;
    border: none;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px;
    letter-spacing: 0px;
    color: var(--sup_text);
    pointer-events: none;

    &::placeholder {
      color: ${(props) =>
        props.disabled ? "var(--border_color)" : "var(--sup_text)"};
    }
  }

  .header {
    width: 100%;
    height: 4.8rem;
    border 1px solid var(--border_color);
    border-radius: 0.4rem;
    padding: 0 1.6rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--sup_text);
    background-color: var(--white);
    cursor: pointer;
  }

  .toggleIcon {
    height: 2rem;
    transition: transform .2s ease-out;
    cursor: pointer;
  }

  .list {
    width: 100%;
    max-height: 30vh;
    overflow: auto;
    position: absolute;
    top: 3rem;
    left: 0;
    // padding: 2.4rem 0;
    background-color: var(--white);
    border-radius: 1rem;
    box-shadow: 0px 0px 5px var(--background);
    opacity: 0;
    pointer-events: none;
    transition: all .2s ease-out;
    z-index: 5;
  }

  .listItem {
    width: 100%;
    height: 4.8rem;
    padding: 0 1.6rem;
    display: flex;
    align-items: center;
    color: var(--sup_text);
  }

  &.isOpen {
    .toggleIcon {
      transform: rotateZ(180deg);
    }

    .list {
      top: 6rem;
      opacity: 1;
      pointer-events: all;
    }
  }

  &.hasIcon {
    .header {
      justify-content: flex-start;
      
      .title {
        margin-left: 0.8rem;
      }
    }
  }

  .iconLeft {
    margin-right: 0.8rem;
  }

  @media screen and (min-width: 768px) {
    .list {
      max-height: 20vh;
    }
  }
`;

const Dropdown = ({
  className,
  name,
  placeholder,
  value,
  setValue,
  list,
  readOnly,
}) => {
  const toggleList = (open) => {
    if (readOnly) return;

    open
      ? document.querySelector(`#${name}`).classList.add("isOpen")
      : document.querySelector(`#${name}`).classList.remove("isOpen");
  };

  const handleSelect = (e, l) => {
    e.preventDefault();
    e.stopPropagation();
    setValue(l);
    toggleList(false);
  };

  return (
    <DropdownWrapper id={name} className={`dWrapper ${className ?? ""}`}>
      <div
        className="header"
        onClick={() =>
          document.querySelector(`#${name}`).classList.toggle("isOpen")
        }
      >
        {/* <p className="sup title">{value}</p> */}
        <input
          type="text"
          name={name}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="selectInput"
          placeholder={placeholder}
          onFocus={() => toggleList(true)}
          readOnly={readOnly}
        />
        <img src={chevron_down} alt="down" className="toggleIcon" />
      </div>
      <div className="list">
        {!!list?.length &&
          list.map((item) => (
            <button
              key={item}
              className="listItem sup"
              onClick={(e) => handleSelect(e, item)}
            >
              {item}
            </button>
          ))}
      </div>
    </DropdownWrapper>
  );
};

Dropdown.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  list: PropTypes.array,
  hasIcon: PropTypes.bool,
  icon: PropTypes.any,
  readOnly: PropTypes.bool,
};

export default Dropdown;
