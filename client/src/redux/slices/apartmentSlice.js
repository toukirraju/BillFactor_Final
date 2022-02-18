import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import ModeratorService from "../services/moderator.service";

export const createFloors = createAsyncThunk(
  "mod/createFloors",
  async (floors, thunkAPI) => {
    try {
      await ModeratorService.createFloors(floors);
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
      // return { apartments: data };
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

export const allApartments = createAsyncThunk(
  "mod/getApartments",
  async (args, thunkAPI) => {
    try {
      const data = await ModeratorService.getApartments();

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
  "mod/updateApartment",
  async (updatedData, thunkAPI) => {
    try {
      await ModeratorService.updateApartment(updatedData);
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

export const removeLevels = createAsyncThunk(
  "mod/removeLevels",
  async (apartmentId, thunkAPI) => {
    try {
      await ModeratorService.removeApartment(apartmentId);
      // return { apartments: data };
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

// export const logout = createAsyncThunk("auth/logout", async () => {
//   await ModeratorService.logout();
// });
let apartments;
const initialState = apartments
  ? { isSuccess: true, apartments }
  : { isSuccess: false, isAdded: false, apartments: null };

const moderatorSlice = createSlice({
  name: "mod",
  initialState,
  extraReducers: {
    [createFloors.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isAdded = true;
      //   state.floors = action.payload.floors;
    },
    [createFloors.rejected]: (state, action) => {
      state.isSuccess = false;
      state.apartments = null;
    },

    [addNewApartment.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isAdded = true;
      // state.apartments = action.payload;
    },
    [addNewApartment.rejected]: (state, action) => {
      state.isSuccess = false;
      // state.apartments = null;
    },

    [update.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isAdded = true;
      // state.apartments = action.payload;
    },
    [update.rejected]: (state, action) => {
      state.isSuccess = false;
      // state.apartments = null;
    },

    [allApartments.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isAdded = false;
      state.apartments = action.payload;
    },
    [allApartments.rejected]: (state, action) => {
      state.isSuccess = false;
      state.apartments = null;
    },
    [removeLevels.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isAdded = true;
    },
    [removeLevels.rejected]: (state, action) => {
      state.isSuccess = false;
    },
  },
});

const { reducer } = moderatorSlice;
export default reducer;
