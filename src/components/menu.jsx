import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { FaPencilAlt, FaEraser, FaUndo, FaRedo } from "react-icons/fa";
import { MdSimCardDownload } from "react-icons/md";
import "../App.css";
import { menus } from "../const";
import { menuItemClick , actionitemClick } from "../slice/menuslice";

const Menu = () => {
  const [activeItem , setActiveitem] = useState(null);
  const dispatch = useDispatch();
  const handleClick = (items) => {
    dispatch(menuItemClick(items));
    setActiveitem(items);
  };
  
  const handleActionItemClick = (items) => {
    dispatch(actionitemClick(items));
    setActiveitem(items);
  };

  return (
    <div className="menu-wrapper">
      <div className="menu">
        <div
          className={`menuItems ${activeItem === menus.PENCIL ? "active" : ""}`}
          onClick={() => handleClick(menus.PENCIL)}
        >
          <FaPencilAlt />
        </div>
        <div
          className={`menuItems ${activeItem === menus.ERASER ? "active" : ""}`}
          onClick={() => handleClick(menus.ERASER)}
        >
          <FaEraser />
        </div>
        <div
          className={`menuItems ${activeItem === menus.UNDO ? "active" : ""}`}
          onClick={() => handleActionItemClick(menus.UNDO)}
        >
          <FaUndo />
        </div>
        <div
          className={`menuItems ${activeItem === menus.REDO ? "active" : ""}`}
          onClick={() => handleActionItemClick(menus.REDO)}
        >
          <FaRedo />
        </div>
        <div
          className={`menuItems ${activeItem === menus.DOWNLOAD ? "active" : ""}`}
          onClick={() => handleActionItemClick(menus.DOWNLOAD)}
        >
          <MdSimCardDownload />
        </div>
      </div>
    </div>
  );
};

export default Menu;
