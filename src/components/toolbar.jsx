import React from "react";
import "../App.css";
import { colors, menus } from "../const";
import { useDispatch, useSelector } from "react-redux";
import { changeBrushSize, changeColor } from "../slice/toolboxslice";
import { socket } from "../socket";

const Toolbar = () => {
  const dispatch = useDispatch();
  const activeMenuitems = useSelector((state) => state.menu.activemenuitems);
  const show_toolbox = activeMenuitems === menus.PENCIL;
  const show_brush = activeMenuitems === menus.PENCIL || activeMenuitems === menus.ERASER;
  const {color, size} = useSelector((state)=>state.toolbox[activeMenuitems])

  const handlebrush = (e) => {
    dispatch(changeBrushSize({ item: activeMenuitems, size: e.target.value }));
    socket.emit("changeConfig", {color , size:e.target.value})
  };


  const updateColor = (newcolor) => {
    dispatch(changeColor({ item: activeMenuitems, color: newcolor }));
    socket.emit("changeConfig", {color:newcolor , size})

  };

  // const {color, size} = useSelector((state) => state.toolbox[])
  return (
  <div className="toolboxWrapper">
    <div className="tool_wrapper">
      {show_toolbox && (
        <div className="stroke">
          <div className="stroke_name">
            <h3>Stroke</h3>
          </div>
          <div className="color_box">
            <div
              className="color"
              style={{ backgroundColor: colors.BLACK }}
              onClick={() => updateColor(colors.BLACK)}
            />
            <div
              className="color"
              style={{ backgroundColor: colors.BLUE }}
              onClick={() => updateColor(colors.BLUE)}
            />
            <div
              className="color"
              style={{ backgroundColor: colors.GREEN }}
              onClick={() => updateColor(colors.GREEN)}
            />
            <div
              className="color"
              style={{ backgroundColor: colors.RED }}
              onClick={() => updateColor(colors.RED)}
            />
            <div
              className="color"
              style={{ backgroundColor: colors.YELLOW }}
              onClick={() => updateColor(colors.YELLOW)}
            />
            <div
              className="color"
              style={{ backgroundColor: colors.ORANGE }}
              onClick={() => updateColor(colors.ORANGE)}
            />
          </div>
        </div>
        
      )}

      {show_brush && (
        <div className="brush">
          <h3 className="brush_name">Brush Size </h3>
          <div className="brush_size" >
            <input
              type="range"
              name="volume"
              min={1}
              max={10}
              step={1}
              onChange={handlebrush}
              style={{ cursor: 'pointer' }}
              value={size}
              
            />
          </div>
        </div>
      )}
    </div>
  </div>
  );
};

export default Toolbar;
