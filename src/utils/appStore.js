import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";
import feedReducer from "./feedSlice.js";
import connectionReducer from "./connectionSlice.jsx";
import requestReducer from "./requestsSlice.jsx";
const appStore = configureStore({
  reducer: { 
    user: userReducer,
    feed: feedReducer,
    connections : connectionReducer,
    requests : requestReducer,
  },
});

export default appStore;
