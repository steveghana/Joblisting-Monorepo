import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { devApi } from "../services/dev.service";
import axios from "axios";
import _api_url from "../../api/_api_url";
import { IDev } from "../../types/devs";

// Define an initial state for your slice
type initialStatetype = {
  devs: IDev[];
  isloading: boolean;
  isFetching: boolean;
  isError: boolean;
  error: any;
};
const initialState: initialStatetype = {
  devs: [],
  isloading: false,
  isFetching: false,
  isError: false,
  error: null,
};

// Create an async thunk for fetching devs
export const fetchDevs = createAsyncThunk(
  "devs/fetchDevs",
  async (_, { dispatch }) => {
    try {
      // Dispatch an action before starting the API call
      dispatch(startFetching());

      const url = `${_api_url.getApiUrl()}/developers`;
      const { data } = await axios.get(url);

      // Dispatch an action after a successful API call
      dispatch(fetchingSuccess(data));

      return data;
    } catch (error) {
      // Dispatch an action after an unsuccessful API call
      dispatch(fetchingError(error));
      throw error;
    }
  }
);

// Create the dev slice
const devSlice = createSlice({
  name: "devs",
  initialState,
  reducers: {
    // Adding your custom action creators here
    startFetching: (state) => {
      state.isloading = true;
      state.isFetching = true;
    },
    fetchingSuccess: (state, action) => {
      state.isloading = false;
      state.isFetching = false;
      state.devs = action.payload;
    },
    fetchingError: (state, action) => {
      state.isloading = false;
      state.isFetching = false;
      state.isError = true;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Handle the async thunk lifecycle
    builder.addCase(fetchDevs.pending, (state) => {
      state.isloading = true;
      state.isFetching = true;
    });
    builder.addCase(fetchDevs.fulfilled, (state, action) => {
      state.isloading = false;
      state.isFetching = false;
      state.devs = action.payload;
    });
    builder.addCase(fetchDevs.rejected, (state, action) => {
      state.isloading = false;
      state.isFetching = false;
      state.isError = true;
      state.error = action.error.message;
    });
  },
});

export const { startFetching, fetchingSuccess, fetchingError } =
  devSlice.actions;
export default devSlice.reducer;
