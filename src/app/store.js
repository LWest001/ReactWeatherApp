import { configureStore } from "@reduxjs/toolkit";
import appSliceReducer from "./appSlice";

const store = configureStore({
  reducer: {
    app: appSliceReducer,
  },
});

export default store;
