import { createSlice } from "@reduxjs/toolkit";
import { menus,colors } from "../const";

const initialState = {
    [menus.PENCIL]:{
        color:colors.BLACK,
        size:3
    },
    [menus.ERASER]:{
        color:colors.WHITE,
        size:3
    },
    [menus.UNDO]:{},
    [menus.REDO]:{},
    [menus.DOWNLOAD]:{}

}

export const toolboxslice = createSlice({
    name:"toolbox",
    initialState,
    reducers:{
        changeColor:(state,action)=>{
            state[action.payload.item].color = action.payload.color
        },
        changeBrushSize:(state,action)=>{
            state[action.payload.item].size = action.payload.size
        }
    }

})
export const {changeBrushSize,changeColor} = toolboxslice.actions
export default toolboxslice.reducer
