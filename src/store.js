import { configureStore } from "@reduxjs/toolkit";
import menuslice from "./slice/menuslice";
import toolboxslice from "./slice/toolboxslice";

export const store=configureStore({
    reducer:{
        menu:menuslice,
        toolbox:toolboxslice
    }
})
