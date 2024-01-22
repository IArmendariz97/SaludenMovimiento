import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userService } from "./userService";

const initialState = {
  user: {},
  users: null,
  clients: null,
  coaches: null,
  trainingLogs: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

const userString = localStorage.getItem("User");
const user = JSON.parse(userString);
export const addUserToClients = createAsyncThunk(
  "addUserToClients",
  async (userId, token, thunkAPI) => {
    try {
      if (!token) {
        const token = user.token;
        const response = await userService.addUserToClients(token, userId);
        return response;
      } else {
        const response = await userService.addUserToClients(token, userId);
        return response;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getCoaches = createAsyncThunk(
  "getCoaches",
  async (token, thunkAPI) => {
    try {
      if (!token) {
        const token = user.token;
        const response = await userService.getCoaches(token);
        return response;
      } else {
        const response = await userService.getCoaches(token);
        return response;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateUser = createAsyncThunk(
  "updateUser",
  async (newUser, thunkAPI) => {
    try {
      return await userService.updateUser(newUser);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getClients = createAsyncThunk(
  "getClients",
  async (token, thunkAPI) => {
    try {
      if (!token) {
        const token = user.token;
        return await userService.getClients(token);
      } else {
        return await userService.getClients(token);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getUser = createAsyncThunk("getUser", async (data, thunkAPI) => {
  try {
    if (!data.token) {
      const token = user.token;
      return await userService.getUser(token, data.userId);
    } else {
      console.log(data.token, "hay token");
      return await userService.getUser(data.token, data.userId);
    }
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const getUsers = createAsyncThunk(
  "getUsers",
  async (token, thunkAPI) => {
    try {
      if (!token) {
        console.log("no hay token");
        const token = user.token;
        return await userService.getUsers(token);
      } else {
        console.log(token, "hay token");
        return await userService.getUsers(token);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const markDayAsTrained = createAsyncThunk(
  "markDayAsTrained",
  async ({ clientId, date, idRoutine }, thunkAPI) => {
    try {
      const response = await userService.markDayAsTrained(
        clientId,
        date,
        idRoutine
      );
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const markDayAsUntrained = createAsyncThunk(
  "markDayAsUntrained",
  async ({ clientId, date, idRoutine }, thunkAPI) => {
    try {
      const response = await userService.markDayAsUntrained(
        clientId,
        date,
        idRoutine
      );
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getTrainingLogs = createAsyncThunk(
  "getTrainingLogs",
  async ({ token, clientId, idRoutine }, thunkAPI) => {
    try {
      const response = await userService.getTrainingLogs(
        token,
        clientId,
        idRoutine
      );
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "deleteUser",
  async (_, thunkAPI) => {
    try {
      const token = user.token;

      return await userService.deleteUser(token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const clearUserMessage = createAction("create-user-message");

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // GET USERS
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
        state.message = "Getting users";
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log("cargando usuarios", action.payload.users);
        state.message = action.payload.message;
        state.users = action.payload.users;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload.message;
        state.users = null;
      })
      // GET CLIENTS
      .addCase(getClients.pending, (state) => {
        state.isLoading = true;
        state.message = "Getting clients";
      })
      .addCase(getClients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.message;
        state.clients = action.payload.clients;
      })
      .addCase(getClients.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload.error;
        state.cliens = null;
      })
      // GET COACHES
      .addCase(getCoaches.pending, (state) => {
        state.isLoading = true;
        state.message = "Getting coaches";
      })
      .addCase(getCoaches.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.message;
        state.coaches = action.payload.coach;
      })
      .addCase(getCoaches.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload.error;
        state.coaches = null;
      })

      // GET USER
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
        state.message = "Getting user";
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.user = action.payload.user;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload.message;
        state.user = null;
      })
      // ADD USER TO CLIENTS
      .addCase(addUserToClients.pending, (state) => {
        state.isLoading = true;
        state.message = "Adding user to clients";
      })
      .addCase(addUserToClients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "User added to clients successfully";
        // Actualiza el estado según sea necesario, por ejemplo, actualizar la lista de usuarios o clientes
        // state.users = [...state.users, action.payload.user];
      })
      .addCase(addUserToClients.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = "Failed to add user to clients";
      })
      // UPDATE USER
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.message = "Updating user";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;

        state.message = action.payload.message;
        state.user = action.payload.data ? action.payload.data : state.user;
      })
      .addCase(updateUser.rejected, (state) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = "User update error";
        state.user = null;
      })
      // mark day as trained
      .addCase(markDayAsTrained.pending, (state) => {
        state.isLoading = true;
        state.message = "Marking day as trained";
      })
      .addCase(markDayAsTrained.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;

        state.message = action.payload.message;
      })
      .addCase(markDayAsTrained.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;

        state.message = action.payload.message;
      })
      // mark day as untrained
      .addCase(markDayAsUntrained.pending, (state) => {
        state.isLoading = true;
        state.message = "Marking day as untrained";
      })
      .addCase(markDayAsUntrained.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;

        state.message = action.payload.message;
      })
      .addCase(markDayAsUntrained.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;

        state.message = action.payload.message;
      })

      // get training logs
      .addCase(getTrainingLogs.pending, (state) => {
        state.isLoading = true;
        state.message = "Getting training logs";
      })
      .addCase(getTrainingLogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;

        state.message = action.payload.message;
        state.trainingLogs = action.payload.trainingLogs;
      })
      .addCase(getTrainingLogs.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;

        state.message = action.payload.message;
        state.trainingLogs = null;
      })

      // ACTIONS
      .addCase(clearUserMessage, (state) => {
        state.message = "";
      });
  },
});
