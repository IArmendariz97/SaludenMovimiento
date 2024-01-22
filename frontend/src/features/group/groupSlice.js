import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { groupService } from "./groupService";

const initialState = {
  group: null,
  rutinaGrupal: [],
  groups: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const createGroup = createAsyncThunk(
  "createGroup",
  async (data, thunkAPI) => {
    try {
      return await groupService.createGroup(data.token, data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const addClientToGroup = createAsyncThunk(
  "addClientToGroup",
  async (data, thunkAPI) => {
    try {
      return await groupService.addClientToGroup(data.token, data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getGroupRutines = createAsyncThunk(
  "getGroupRutines",
  async (data, thunkAPI) => {
    try {
      console.log(data, "data");
      return await groupService.getGroupRutines(data.token, data.idGroup);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getGroup = createAsyncThunk("getGroup", async (data, thunkAPI) => {
  try {
    return await groupService.getGroup(data.token, data.idGroup);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const deleteGroup = createAsyncThunk(
  "deleteGroup",
  async (data, thunkAPI) => {
    try {
      return await groupService.deleteGroup(data.token, data.idGroup);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getGroups = createAsyncThunk(
  "getGroups",
  async (token, thunkAPI) => {
    try {
      return await groupService.getGroups(token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const setRoutineGroup = createAsyncThunk(
  "setRoutineGroup",
  async (data, thunkAPI) => {
    console.log(data);
    try {
      return await groupService.setRoutineGroup(data.token, data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteClientFromGroup = createAsyncThunk(
  "deleteClientFromGroup",
  async (data, thunkAPI) => {
    try {
      return await groupService.deleteClientFromGroup(data.token, data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const resetGroups = createAction("reset-groups");
export const clearGroupMessage = createAction("clear-group-message");

export const groupSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // CREATE GROUP
      .addCase(createGroup.pending, (state) => {
        state.isLoading = true;
        state.message = "Creating group";
      })
      .addCase(createGroup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "Grupo creado con exito";
        state.group = action.payload.group;
      })
      .addCase(createGroup.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload.message;
        state.group = null;
      })
      // GET GROUP RUTINES
      .addCase(getGroupRutines.pending, (state) => {
        state.isLoading = true;
        state.message = "Getting group rutines";
      })
      .addCase(getGroupRutines.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;

        state.rutinaGrupal = action.payload;
      })
      .addCase(getGroupRutines.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.rutinaGrupal = null;
      })

      // GET GROUP
      .addCase(getGroup.pending, (state) => {
        state.isLoading = true;
        state.message = "Getting group";
      })
      .addCase(getGroup.fulfilled, (state, action) => {
        state.group = action.payload.group;
        state.isSuccess = true;
        state.isError = false;
        state.isLoading = false;
      })
      .addCase(getGroup.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload.message;
        state.group = null;
      })

      // DELETE GROUP
      .addCase(deleteGroup.pending, (state) => {
        state.isLoading = true;
        state.message = "Deletting group";
      })
      .addCase(deleteGroup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "Grupo eliminado con exito";
      })
      .addCase(deleteGroup.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = "No se ha podido eliminar el grupo";
        state.group = null;
      })

      // GET GROUPS
      .addCase(getGroups.pending, (state) => {
        state.isLoading = true;
        state.message = "Getting groups";
      })
      .addCase(getGroups.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.groups = action.payload.groups;
      })
      .addCase(getGroups.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload.message;
        state.groups = null;
      })

      // SET ROUTINE TO GROUP
      .addCase(setRoutineGroup.pending, (state) => {
        state.isLoading = true;
        state.message = "Setting routine to group";
      })
      .addCase(setRoutineGroup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.message;
      })
      .addCase(setRoutineGroup.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload.message;
        state.group = null;
      })
      // DELETE CLIENT FROM GROUP
      .addCase(deleteClientFromGroup.pending, (state) => {
        state.isLoading = true;
        state.message = "Deleting client from group";
      })
      .addCase(deleteClientFromGroup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.group = action.payload.group;
        state.message = action.payload.message;
      })
      .addCase(deleteClientFromGroup.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.group = null;
        state.message = action.payload.message;
      })

      // ADD CLIENT TO GROUP
      .addCase(addClientToGroup.pending, (state) => {
        state.isLoading = true;
        state.message = "Adding client to group";
      })
      .addCase(addClientToGroup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.group = action.payload.group;
        state.message = action.payload.message;
      })
      .addCase(addClientToGroup.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.group = null;
        state.message = action.payload.message;
      })

      // CLEAR ACTIONS
      .addCase(clearGroupMessage, (state) => {
        state.message = "";
      })
      .addCase(resetGroups, (state) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
        state.group = null;
      });
  },
});
