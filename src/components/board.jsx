import React, { useEffect,useLayoutEffect,useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { menus } from "../const";

import {  actionitemClick } from '../slice/menuslice';
import { socket } from "../socket";

const Board = () => {
  const dispatch = useDispatch()
  const canvasRef = useRef(null);
  const shouldDraw = useRef(false);
  const drawHistory = useRef([])
  const historyPointer = useRef(0)
  const activeMenuitems = useSelector((state) => state.menu.activemenuitems);
  const actionMenuItems = useSelector((state) => state.menu.actionitems);
  const { color, size } = useSelector((state) => state.toolbox[activeMenuitems]) 
  
  useEffect(() => {

    if(!canvasRef.current) return;
    const canvas = canvasRef.current
    const context = canvas.getContext("2d")

    const handleActionItems = () => {
      if (actionMenuItems === menus.DOWNLOAD) {
          const URL = canvas.toDataURL();
          const anchor = document.createElement("a");
          anchor.href = URL;
          anchor.download = "sketch.jpg";
          anchor.click();
          console.log(URL);
      } else if (actionMenuItems === menus.UNDO || actionMenuItems === menus.REDO) {
          const step = actionMenuItems === menus.UNDO ? -1 : 1;
          const newPointer = historyPointer.current + step;
          if (newPointer >= 0 && newPointer < drawHistory.current.length) {
              historyPointer.current = newPointer;
              const imageData = drawHistory.current[historyPointer.current];
              context.putImageData(imageData, 0, 0);
          }
      }
      dispatch(actionitemClick(null));
  };

  handleActionItems();

  },[actionMenuItems,dispatch])


  useEffect(()=>{
    if(!canvasRef.current) return
    const canvas = canvasRef.current
    const context = canvas.getContext("2d")

    const changeConfig = (color,size)=>{
      // if (!color || !size) return;
      context.strokeStyle = color
      context.lineWidth = size
    }
    const hadleChangeConfig = (config)=>{
      console.log(config,"config")
      changeConfig(config.color,config.size)
    }

    changeConfig(color,size)
    socket.on("changeConfig",hadleChangeConfig);
    return ()=>{
      socket.off("changeConfig",hadleChangeConfig)
    }
  },[color,size])

  useLayoutEffect (()=>{
    if(!canvasRef.current) return
    const canvas = canvasRef.current
    const context = canvas.getContext("2d")

    canvas.width= window.innerWidth
    canvas.height = window.innerHeight


    const beginPath=(x,y)=>{
      context.beginPath()
      context.moveTo(x,y)
    }

    const drawLine=(x,y)=>{
      context.lineTo(x , y)
      context.stroke()
    }

    const handleMouseDown =(e)=>{
      shouldDraw.current = true
      beginPath(e.clientX || e.touches[0].clientX, e.clientY || e.touches[0].clientY)
      socket.emit('beginPath', {x: e.clientX || e.touches[0].clientX, y: e.clientY || e.touches[0].clientY})
    }

    const handleMouseUp =(e)=>{
      shouldDraw.current = false;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      drawHistory.current = drawHistory.current.slice(0, historyPointer.current + 1);
      drawHistory.current.push(imageData);
      historyPointer.current = drawHistory.current.length - 1;
    }

    const handleMouseMove =(e)=>{
      if(!shouldDraw.current) return
      drawLine(e.clientX || e.touches[0].clientX, e.clientY || e.touches[0].clientY)
      socket.emit('drawLine', {x: e.clientX || e.touches[0].clientX, y: e.clientY || e.touches[0].clientY})
      
    }

   const handleBeginPath = (path)=>{
    beginPath(path.x,path.y)
   }

   const handleDrawLine = (path)=>{
    drawLine(path.x,path.y)
   }

    canvas.addEventListener("mousedown",handleMouseDown)
    canvas.addEventListener("mouseup",handleMouseUp)
    canvas.addEventListener("mousemove",handleMouseMove)

    canvas.addEventListener('touchstart', handleMouseDown)
    canvas.addEventListener('touchmove', handleMouseMove)
    canvas.addEventListener('touchend', handleMouseUp)

    socket.on("beginPath", handleBeginPath)
    socket.on("drawLine", handleDrawLine)


    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("mousemove", handleMouseMove);

      canvas.removeEventListener('touchstart', handleMouseDown)
      canvas.removeEventListener('touchmove', handleMouseMove)
      canvas.removeEventListener('touchend', handleMouseUp)

      socket.off("beginPath", handleBeginPath);
      socket.off("drawLine", handleDrawLine);
  };
  

  },[])

  return (
    <div className="canvas-container">
      <canvas ref = {canvasRef} className="canvas"></canvas>
    </div>
  );
};

export default Board;
