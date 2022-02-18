import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import Mod_manCommonService from "../services/mod_manCommon.service";

export const createBill = createAsyncThunk(
  "common/createBill",
  async (bill, thunkAPI) => {
    try {
      await Mod_manCommonService.createBill(bill);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const getAllTransactions = createAsyncThunk(
  "common/getAllTransactions",
  async (arg, thunkAPI) => {
    try {
      const data = await Mod_manCommonService.getAllBill();

      return data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const getMonthlyTransactions = createAsyncThunk(
  "common/getMonthlyTrans",
  async ({ month, year }, thunkAPI) => {
    try {
      const data = await Mod_manCommonService.getMonthlyBill({ month, year });

      return data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const getTempBill = createAsyncThunk(
  "common/getTempBill",
  async (renterId, thunkAPI) => {
    try {
      const data = await Mod_manCommonService.getTempBill(renterId);

      return data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

// let temp;
const initialState = {
  isSuccess: false,
  isAdded: false,
  temp: null,
  transactions: {},
};

const transactiionSlice = createSlice({
  name: "common",
  initialState,
  extraReducers: {
    [createBill.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isAdded = true;
    },
    [createBill.rejected]: (state, action) => {
      state.isSuccess = false;
      state.isAdded = false;
    },

    [getMonthlyTransactions.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isAdded = true;
      state.transactions = action.payload;
    },
    [getMonthlyTransactions.rejected]: (state, action) => {
      state.isSuccess = false;
    },

    [getAllTransactions.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isAdded = true;
      state.transactions = action.payload;
    },
    [getAllTransactions.rejected]: (state, action) => {
      state.isSuccess = false;
    },
    [getTempBill.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isAdded = true;
      state.temp = action.payload;
    },
    [getTempBill.rejected]: (state, action) => {
      state.isSuccess = false;
    },
  },
});

const { reducer } = transactiionSlice;
export default reducer;
