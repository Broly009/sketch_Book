import { createSlice } from "@reduxjs/toolkit";
import { menus } from "../const";

const initialState = {
  activemenuitems: menus.PENCIL,
  actionitems: null,
};

export const menuslice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    menuItemClick: (state, action) => {
      state.activemenuitems = action.payload;
    },
    actionitemClick: (state, action) => {
      state.actionitems = action.payload;
    },
  },
});

export const{menuItemClick,actionitemClick} = menuslice.actions;
export default menuslice.reducer
