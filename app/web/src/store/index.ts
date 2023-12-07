import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { USER_API_KEY, userApi } from "./services/userAuth.service";
import customizationReducer from "./customizationReducer";
import { Reducer } from "redux";
import { CLIENT_API_KEY, clientApi } from "./services/client.service";
import { DEV_API_KEY, devApi } from "./services/dev.service";
import { ROLE_API_KEY, roleApi } from "./services/role.service";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import { RESET_STATE_ACTION_TYPE } from "./actions";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { unauthenticatedMiddleware } from "./middleware/unauthenticatedMiddleware";
import { rtkQueryErrorLogger } from "./middleware/err";

import {
  APPLICATION_API_KEY,
  applicantApi,
} from "./services/application.service";
import storage from "redux-persist/lib/storage";
import devReducer from "./slices/dev.slice";
import { INTERVEW_API_KEY, interviewApi } from "./services/interview.service";

const reducers = {
  devs: devReducer,
  [USER_API_KEY]: userApi.reducer,
  [CLIENT_API_KEY]: clientApi.reducer,
  [INTERVEW_API_KEY]: interviewApi.reducer,
  [DEV_API_KEY]: devApi.reducer,
  [ROLE_API_KEY]: roleApi.reducer,
  [APPLICATION_API_KEY]: applicantApi.reducer,
  customization: customizationReducer,
};

const combinedReducer = combineReducers<typeof reducers>(reducers);

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, combinedReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([
      unauthenticatedMiddleware,
      rtkQueryErrorLogger,
      userApi.middleware,
      clientApi.middleware,
      interviewApi.middleware,
      roleApi.middleware,
      devApi.middleware,
      applicantApi.middleware,
    ]),
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof combinedReducer>;
export const useTypedDispatch = () => useDispatch<AppDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
