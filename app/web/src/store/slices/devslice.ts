import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { devApi } from "../services/DevsService";
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
export const fetchDevs = createAsyncThunk("devs/fetchDevs", async () => {
  try {
    // Use the generated hook directly
    const response = await devApi.useGetDevsQuery();

    const url = `${_api_url.getApiUrl()}/developers`;
    const { data } = await axios.get(url);
    console.log(data);
    return data;
  } catch (error) {
    // Handle error
    throw error;
  }
});

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
