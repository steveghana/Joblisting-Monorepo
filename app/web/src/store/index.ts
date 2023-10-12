import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./services/userService"; // Import your user service

const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    // Add other reducers if needed
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});

export default store;
