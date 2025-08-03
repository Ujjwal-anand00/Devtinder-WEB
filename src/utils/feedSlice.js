import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: "feed",
    initialState: null,
    reducers: {
        addFeed: (state, action) => {
            console.log("Feed added:", action.payload);
            return action.payload;
        },
        removeFeed: (state, action) => {
            return null;
        },
        removeUserFromFeed: (state , action) => {
            const newFeed = state.filter(user => user._id !== action.payload);
            return newFeed;
        }
    }
})

export const { addFeed , removeUserFromFeed , removeFeed} = feedSlice.actions;
export default feedSlice.reducer;