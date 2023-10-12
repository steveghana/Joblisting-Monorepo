import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./services/userService"; // Import your user service
import customizationReducer from "./customizationReducer";
const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    customization: customizationReducer,
    // Add other reducers if needed
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
