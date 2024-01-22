import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { rutinasService } from "./rutinasService";

const initialState = {
  rutinas: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const getRutines = createAsyncThunk(
  "getRutines",
  async (data, thunkAPI) => {
    try {
      const user = JSON.parse(localStorage.getItem("User"));
      const { token } = user;
      return await rutinasService.getRutines(data, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateRutine = createAsyncThunk(
  "updateRutine",
  async (data, thunkAPI) => {
    try {
      return await rutinasService.updateRutine(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateRutineConfiguration = createAsyncThunk(
  "updateRutineConfiguration",
  async (data, thunkAPI) => {
    try {
      return await rutinasService.updateRutineConfiguration(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getAllRutines = createAsyncThunk(
  "getAllRutines",
  async (data, thunkAPI) => {
    try {
      return await rutinasService.getAllRutines(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createRutine = createAsyncThunk(
  "createRutine",
  async (data, thunkAPI) => {
    try {
      const user = JSON.parse(localStorage.getItem("User"));
      const { token } = user;
      return await rutinasService.createRutine(data, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const resetRutines = createAction("reset-rutines");

export const rutinasSlice = createSlice({
  name: "rutinas",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get rutines de id
      .addCase(getRutines.pending, (state) => {
        state.isLoading = true;
        state.message = "Getting rutines";
      })
      .addCase(getRutines.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;

        state.message = action.payload.msg;
        state.rutinas = action.payload;
      })
      .addCase(getRutines.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload.msg;
        state.rutinas = null;
      })
      // get all rutines
      .addCase(getAllRutines.pending, (state) => {
        state.isLoading = true;
        state.message = "Getting all rutines";
      })
      .addCase(getAllRutines.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.msg;
        state.rutinas = action.payload.data;
      })
      .addCase(getAllRutines.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload.msg;
        state.rutinas = null;
      })
      // create rutines
      .addCase(createRutine.pending, (state) => {
        state.isLoading = true;
        state.message = "Creating rutines";
      })
      .addCase(createRutine.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.message;
      })
      .addCase(createRutine.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload.msg;
      })

      // update rutines
      .addCase(updateRutine.pending, (state) => {
        state.isLoading = true;
        state.message = "Updating rutines";
      })
      .addCase(updateRutine.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.message;
        state.rutinas = action.payload.data;
      })
      .addCase(updateRutine.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload.message;
        state.rutinas = null;
      })
      // update rutines configuration
      .addCase(updateRutineConfiguration.pending, (state) => {
        state.isLoading = true;
        state.message = "Updating rutines";
      })
      .addCase(updateRutineConfiguration.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.message;
      })
      .addCase(updateRutineConfiguration.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload.message;
        state.rutinas = null;
      })

      //reset rutines
      .addCase(resetRutines, (state) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
        state.rutinas = null;
      });
  },
});
