import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import ModeratorService from "../services/moderator.service";

export const assign = createAsyncThunk(
  "mod/assignRenter",
  async (assignedData, thunkAPI) => {
    try {
      await ModeratorService.assignRenter(assignedData);
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

export const unAssign = createAsyncThunk(
  "mod/unAssignRenter",
  async (unAssignedData, thunkAPI) => {
    try {
      await ModeratorService.unAssignRenter(unAssignedData);
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

const initialState = { isSuccess: false, isAdded: false };

const assignRenterSlice = createSlice({
  name: "mod",
  initialState,
  extraReducers: {
    [assign.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isAdded = true;
    },
    [assign.rejected]: (state, action) => {
      state.isSuccess = false;
    },
    [unAssign.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isAdded = true;
    },
    [unAssign.rejected]: (state, action) => {
      state.isSuccess = false;
    },
  },
});

const { reducer } = assignRenterSlice;
export default reducer;
