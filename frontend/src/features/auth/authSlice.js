import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authService } from "./authService";
import { userService } from "../user/userService";

const initialState = {
  user: {},
  token: "",
  userId: "",
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const loginUser = createAsyncThunk(
  "loginUser",
  async (data, thunkAPI) => {
    try {
      const userCredentials = await authService.login(data);
      if (userCredentials.message === "User not found") {
        return thunkAPI.rejectWithValue(userCredentials);
      }
      const user = await userService.getUser(
        userCredentials.session.token,
        userCredentials.session.userId
      );
      return { ...userCredentials, ...user };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const logout = createAsyncThunk("logout", async (data, thunkAPI) => {
  try {
    const userString = localStorage.getItem("User");
    const user = JSON.parse(userString);
    const token = user.token;
    return await authService.logout(token);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const register = createAsyncThunk("register", async (data, thunkAPI) => {
  try {
    return await authService.register(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const updateUserr = createAction("updateUserr");

export const clearAuthMessages = createAction("clearAuthMessages");
export const clearUserMessage = createAction("clearUserMessage");

export const authSlice = createSlice({
  name: "auths",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // LOGIN USER
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.message = "Logging in user";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.message;
        state.token = action.payload.session.token;
        state.userId = action.payload.session.userId;
        state.user = { ...action.payload.user };
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = "Email Incorrect";
        state.user = null;
      })

      // REGISTER
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.message = "Creating user";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.message;
        state.user = action.payload.user;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload.message;
        state.user = null;
      })

      // LOGOUT
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "User logged out";
        state.user = null;
      })
      .addCase(logout.rejected, (state) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = "User delete error";
      })

      // ACTIONS
      .addCase(updateUserr, (state, action) => {
        state.user = action.payload;
      })
      .addCase(clearAuthMessages, (state) => {
        state.message = "";
      })
      .addCase(clearUserMessage, (state) => {
        state.message = "";
      });
  },
});
