import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDarkMode: false,
  isSidebarCollapsed: false,
  isLoading: false,
  notification: {},
};
export const showSuccessNotification = (message, description) => (dispatch) => {
  dispatch(
    layoutSlice.actions.setNotification({
      type: "success",
      message,
      description,
    })
  );
};

export const showErrorNotification = (message, description) => (dispatch) => {
  dispatch(
    layoutSlice.actions.setNotification({
      type: "error",
      message,
      description,
    })
  );
};

export const showInfoNotification = (message, description) => (dispatch) => {
  dispatch(
    layoutSlice.actions.setNotification({
      type: "info",
      message,
      description,
    })
  );
};

export const showWarningNotification = (message, description) => (dispatch) => {
  dispatch(
    layoutSlice.actions.setNotification({
      type: "warning",
      message,
      description,
    })
  );
};

// Action para hacer toggle del sidebar
export const toggleSidebar = () => (dispatch) => {
  dispatch(layoutSlice.actions.toggleSidebar());
};

//Action para hacer toggle del modo oscuro
export const toggleDarkMode = () => (dispatch) => {
  dispatch(layoutSlice.actions.toggleDarkMode());
};

export const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
    toggleSidebar: (state) => {
      state.isSidebarCollapsed = !state.isSidebarCollapsed;
    },
    setNotification: (state, action) => {
      state.notification = action.payload;
    },
  },
});
