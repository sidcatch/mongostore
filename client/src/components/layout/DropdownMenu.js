import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";

import DropdownItem from "./DropdownItem";

import "../../App.css";
import dropdownCloseImg from "../../icons/dropdown-close.svg";
import dropdownOpenImg from "../../icons/dropdown-open.svg";
import dropdownArrowImg from "../../icons/dropdown-arrow.svg";

const DropdownMenu = ({ menuTitle, dropDownItems }) => {
  const [dropdownState, setDropdownState] = useState({ showDropdown: false });
  const { showDropdown } = dropdownState;

  const onMouseEnter = () => {
    setDropdownState({ ...dropdownState, showDropdown: true });
  };

  const onMouseLeave = () => {
    setDropdownState({ ...dropdownState, showDropdown: false });
  };
  const onClick = () => {
    setDropdownState(prevState => ({
      ...prevState,
      showDropdown: !prevState.showDropdown
    }));
  };

  return (
    <div
      className="dropdown-menu"
      onMouseEnter={() => onMouseEnter()}
      onMouseLeave={() => onMouseLeave()}
      onClick={() => onClick()}
    >
      <span className="dropdown-menu-title">{menuTitle}</span>
      <img
        className="small-icon dropdown-close-open-icon"
        src={showDropdown ? dropdownOpenImg : dropdownCloseImg}
        alt="down-arrow"
      />

      <CSSTransition
        mountOnEnter
        unmountOnExit
        in={showDropdown}
        timeout={200}
        classNames="dropdown"
      >
        <ul className="dropdown">
          <div className="dropdown-arrow-container">
            <img
              className="dropdown-arrow small-icon"
              src={dropdownArrowImg}
              alt="arrow"
            />
          </div>
          {dropDownItems.map(({ title, icon, click, link }, index) => (
            <DropdownItem
              title={title}
              icon={icon}
              click={click}
              link={link}
              key={index}
            />
          ))}
        </ul>
      </CSSTransition>
    </div>
  );
};

export default DropdownMenu;
