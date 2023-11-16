import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { USER_API_KEY, userApi } from "./services/userAuthService";
import customizationReducer from "./customizationReducer";
import { Reducer } from "redux";
import { CLIENT_API_KEY, clientApi } from "./services/ClientServce";
import { DEV_API_KEY, devApi } from "./services/DevsService";
import { ROLE_API_KEY, roleApi } from "./services/roleService";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import { RESET_STATE_ACTION_TYPE } from "./actions";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { unauthenticatedMiddleware } from "./middleware/unauthenticatedMiddleware";

const reducers = {
  [USER_API_KEY]: userApi.reducer,
  [CLIENT_API_KEY]: clientApi.reducer,
  [DEV_API_KEY]: devApi.reducer,
  [ROLE_API_KEY]: roleApi.reducer,
  customization: customizationReducer,
};

const combinedReducer = combineReducers<typeof reducers>(reducers);

// Create a custom rootReducer that resets state on a specific action type
export const reducer: Reducer<RootState> = (state, action) => {
  if (action.type === RESET_STATE_ACTION_TYPE) {
    state = {} as RootState; // Just reset state to an empty object
  }

  return combinedReducer(state, action);
};

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([
      unauthenticatedMiddleware,
      userApi.middleware,
      clientApi.middleware,
      roleApi.middleware,
      devApi.middleware,
    ]),
});

// Create a Redux Persist store to persist the state in the lifeCycle of the app
export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof combinedReducer>; // Type for the root state
export const useTypedDispatch = () => useDispatch<AppDispatch>(); // Type inference for dispatch
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector; // Type inference for useSelector

export default store;
