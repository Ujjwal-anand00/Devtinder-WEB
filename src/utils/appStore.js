import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";
import feedReducer from "./feedSlice.js";
import connectionReducer from "./connectionSlice.jsx";
const appStore = configureStore({
  reducer: { 
    user: userReducer,
    feed: feedReducer,
    connections : connectionReducer,
  },
});

export default appStore;
