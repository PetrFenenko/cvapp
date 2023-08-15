import { configureStore } from "@reduxjs/toolkit";
import documentReducer from "../components/mydocument/documentSlice";

const store = configureStore({
  reducer: {
    document: documentReducer,
  },
});

export default store;
