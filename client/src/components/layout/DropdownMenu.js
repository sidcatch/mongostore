import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";

import DropdownItem from "./DropdownItem";

import cx from "classnames";
import dropDownMenuStyles from "./DropdownMenu.module.css";
import globalStyles from "../../Global.module.css";
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
    setDropdownState((prevState) => ({
      ...prevState,
      showDropdown: !prevState.showDropdown,
    }));
  };

  return (
    <div
      className={dropDownMenuStyles.dropdownMenu}
      onMouseEnter={() => onMouseEnter()}
      onMouseLeave={() => onMouseLeave()}
      onClick={() => onClick()}
    >
      <span className={dropDownMenuStyles.dropdownMenuTitle}>{menuTitle}</span>
      <img
        className={cx(
          dropDownMenuStyles.dropdownCloseOpenIcon,
          globalStyles.smallIcon
        )}
        src={showDropdown ? dropdownOpenImg : dropdownCloseImg}
        alt="down-arrow"
      />

      <CSSTransition
        mountOnEnter
        unmountOnExit
        in={showDropdown}
        timeout={200}
        //classNames="dropdown"
        classNames={{
          enter: dropDownMenuStyles["dropdown-enter"],
          enterActive: dropDownMenuStyles["dropdown-enter-active"],
          exit: dropDownMenuStyles["dropdown-exit"],
          exitActive: dropDownMenuStyles["dropdown-exit-active"],
        }}
      >
        <ul className={dropDownMenuStyles["dropdown"]}>
          <div className={dropDownMenuStyles.dropdownArrowContainer}>
            <img
              className={globalStyles.smallIcon}
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
