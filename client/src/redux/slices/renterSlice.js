import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import ModeratorService from "../services/moderator.service";

export const create = createAsyncThunk(
  "mod/createRenter",
  async (renter, thunkAPI) => {
    try {
      const data = await ModeratorService.createRenter(renter);
      // return  data
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

export const addNewApartment = createAsyncThunk(
  "mod/addNewApartment",
  async (apartData, thunkAPI) => {
    try {
      await ModeratorService.addApartment(apartData);
      // return { renters: data };
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

export const allrenters = createAsyncThunk(
  "mod/getRenters",
  async (args, thunkAPI) => {
    try {
      const data = await ModeratorService.getAllRenter();

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

export const update = createAsyncThunk(
  "mod/updateRenter",
  async (updatedData, thunkAPI) => {
    try {
      await ModeratorService.updateRenter(updatedData);
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

export const removeRenter = createAsyncThunk(
  "mod/removeRenter",
  async (renterId, thunkAPI) => {
    try {
      await ModeratorService.removeRenter(renterId);
      // return { renters: data };
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

let data;
const initialState = data
  ? { isSuccess: true, data }
  : { isSuccess: false, isAdded: false, data: null };

const moderatorSlice = createSlice({
  name: "mod",
  initialState,
  extraReducers: {
    [create.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isAdded = true;
      //   state.floors = action.payload.floors;
    },
    [create.rejected]: (state, action) => {
      state.isSuccess = false;
      // state.data = null;
    },

    [addNewApartment.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isAdded = true;
      // state.data = action.payload;
    },
    [addNewApartment.rejected]: (state, action) => {
      state.isSuccess = false;
      // state.data = null;
    },

    [update.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isAdded = true;
      // state.data = action.payload;
    },
    [update.rejected]: (state, action) => {
      state.isSuccess = false;
      // state.data = null;
    },

    [allrenters.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isAdded = false;
      state.data = action.payload;
    },
    [allrenters.rejected]: (state, action) => {
      state.isSuccess = false;
      state.data = null;
    },
    [removeRenter.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isAdded = true;
    },
    [removeRenter.rejected]: (state, action) => {
      state.isSuccess = false;
    },
  },
});

const { reducer } = moderatorSlice;
export default reducer;
