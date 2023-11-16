import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./services/userAuthService"; // Import your user service
import customizationReducer from "./customizationReducer";
import { clientApi } from "./services/ClientServce";
import { devApi } from "./services/DevsService";
import { roleApi } from "./services/roleService";
const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [clientApi.reducerPath]: clientApi.reducer,
    [devApi.reducerPath]: devApi.reducer,
    [roleApi.reducerPath]: roleApi.reducer,
    customization: customizationReducer,
    // Add other reducers if needed
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
