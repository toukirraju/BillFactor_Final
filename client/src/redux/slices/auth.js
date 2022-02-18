import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import AuthService from "../services/auth.service";

export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      const response = await AuthService.register(user);
      thunkAPI.dispatch(setMessage(response.data.message));
      return response.data;
    } catch (error) {
      const message =
        (error.response && error.response.data.message) ||
        error.response.data ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    const data = await AuthService.login(user);
    return { user: data };
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue();
  }
});

export const setUser = createAsyncThunk("auth/setUser", async (thunkAPI) => {
  try {
    const data = await AuthService.setUserData();
    return { user: data };
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue();
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
  await AuthService.logout();
});

const user = JSON.parse(localStorage.getItem("auth_token"));
// let user;
// const decode = jwtDecode(user.token);
// console.log(decode);
const initialState = user
  ? { isLoggedIn: true, user: AuthService.setUserData() }
  : { isLoggedIn: false, user: null };

// const token = JSON.parse(localStorage.getItem("auth_token"));
// // let user;
// const initialState = token
//   ? { isLoggedIn: true, user: AuthService.setUserData() }
//   : { isLoggedIn: false, user: null };

// const initialState = {
//   isLoggedIn: false,
//   user: {},
// };

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
    },
    [register.rejected]: (state, action) => {
      state.isLoggedIn = false;
    },
    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
    },
    [login.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    // [setUser.fulfilled]: (state, action) => {
    //   state.isLoggedIn = true;
    //   state.user = action.payload.user;
    // },
    // [setUser.rejected]: (state, action) => {
    //   state.isLoggedIn = false;
    //   state.user = null;
    // },
    [logout.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
      // state.user = {};
    },
  },
});

const { reducer } = authSlice;
export default reducer;
