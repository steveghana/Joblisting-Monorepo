import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
  name: "data",
  initialState: {
    message: "",
    // other state properties...
  },
  reducers: {
    messageCreated: (state, action) => {
      state.message = action.payload;
    },
    // other reducers...
  },
});

export const { messageCreated } = dataSlice.actions;
export default dataSlice.reducer;
