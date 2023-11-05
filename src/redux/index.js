
import { configureStore, createSlice } from "@reduxjs/toolkit";
import  campusesReducer from '../slices/campusesSlice';

const mainReducer = createSlice(
  {
    name: "main",
    initialState: {
      data: ["no data yet"]
    }
  }
);

const redux = configureStore({
  reducer: {
    main: mainReducer.reducer,
    campuses: campusesReducer,
  }
});

export default redux;