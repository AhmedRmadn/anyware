import { createSlice } from "@reduxjs/toolkit";

const AUTH_KEY = "mock_auth";
const USERNAME_KEY = "mock_username";

const initialState = {
  isAuthenticated: localStorage.getItem(AUTH_KEY) === "true",
  userName: localStorage.getItem(USERNAME_KEY) || "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.userName = action.payload; // username
      localStorage.setItem(AUTH_KEY, "true");
      localStorage.setItem(USERNAME_KEY, action.payload);
    },
    logout(state) {
      state.isAuthenticated = false;
      state.userName = "";
      localStorage.removeItem(AUTH_KEY);
      localStorage.removeItem(USERNAME_KEY);
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
