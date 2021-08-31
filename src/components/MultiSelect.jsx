import PropTypes from "prop-types";
import styled from "styled-components";
import chevron_down from "assets/chevron_down.svg";
import removeIcon from "assets/closeWhite.svg";

const DropdownWrapper = styled.div`
  width: 100%;
  position: relative;

  .selectInput {
    display: none;
  }

  .selectedWrapper {
    width: 40rem;
    overflow-x: auto;
    display: flex;
    grid-gap: 0.4rem;

    &::-webkit-scrollbar {
      display: none;
    }
  
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .selected {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
    background-color: var(--sup_text);
    color: var(--white);
    border-radius: 1rem;
    padding: 0.2rem 0.8rem;
    width: max-content;
    font-size: 1rem;
    text-transform: capitalize;

    .icon {
      height: 1.2rem;
      margin-left: 1.2rem;
    }
  }

  .header {
    position: relative;
    width: 100%;
    height: 4.8rem;
    border 1px solid var(--border_color);
    border-radius: 0.4rem;
    padding: 0 1.6rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: var(--sup_text);
    background-color: var(--white);
    cursor: pointer;
  }

  .toggleIcon {
    position: absolute;
    right: 1.6rem;
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

    &:hover {
      background-color: var(--background);
    }
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

  label {
    display: block;
    color: var(--sup_text);
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 16px;
    letter-spacing: 0em;
    text-align: left;
  }

  @media screen and (min-width: 768px) {
    .list {
      max-height: 20vh;
    }
  }
`;

const MultiSelect = ({
  className,
  name,
  inputType,
  placeholder,
  value,
  setValue,
  // defaultValue,
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
    const temp = JSON.parse(value);
    temp.push(l);
    setValue(JSON.stringify(temp));
    toggleList(false);
  };

  const handleRemove = (e, index) => {
    e.stopPropagation();

    const temp = JSON.parse(value);
    temp.splice(index, 1);
    setValue(JSON.stringify(temp));
  };

  return (
    <DropdownWrapper id={name} className={`dWrapper ${className ?? ""}`}>
      <div
        className="header"
        onClick={() =>
          document.querySelector(`#${name}`).classList.toggle("isOpen")
        }
      >
        {!!value?.length && <label htmlFor={name}>{placeholder}</label>}
        <input
          type={inputType || "text"}
          name={name}
          value={value}
          className="selectInput"
          placeholder={placeholder}
          // defaultValue={defaultValue}
          readOnly
        />
        <div className="selectedWrapper">
          {!!value?.length &&
            JSON.parse(value).map((item, index) => (
              <div key={item} className="selected">
                <span className="small">{item}</span>
                <img
                  src={removeIcon}
                  alt="remove"
                  className="icon"
                  onClick={(e) => handleRemove(e, index)}
                />
              </div>
            ))}
        </div>
        <img src={chevron_down} alt="down" className="toggleIcon" />
      </div>
      <div className="list">
        {!!list?.length &&
          list
            .filter((item) => !value?.includes(item))
            .map((item) => (
              <button
                key={item}
                className="listItem sup"
                onClick={(e) => handleSelect(e, item.toString())}
              >
                {item}
              </button>
            ))}
      </div>
    </DropdownWrapper>
  );
};

MultiSelect.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  // defaultValue: PropTypes.string,
  inputType: PropTypes.string,
  list: PropTypes.array,
  hasIcon: PropTypes.bool,
  icon: PropTypes.any,
  readOnly: PropTypes.bool,
};

export default MultiSelect;
