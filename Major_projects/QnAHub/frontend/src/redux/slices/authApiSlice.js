import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || null,
  userId: localStorage.getItem("userId") || null,
  roles: [],
  user: {
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    mobileNumber: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Set auth data after login or registration
    setAuthData(state, action) {
      const { token, user } = action.payload;

      // Store in Redux state
      state.token = token;
      state.userId = user._id;
      state.user = {
        firstName: user.startName,
        lastName: user.lastName,
        email: user.email,
        mobileNumber: user.mobileNumber,
      };

      // Store in Local Storage (Persistent Storage)
      localStorage.setItem("token", token);
      localStorage.setItem("userId", user._id);
      localStorage.setItem("user", JSON.stringify(state.user));
    },

    // Set userId in Redux and LocalStorage
    setUserId(state, action) {
      state.userId = action.payload;
      localStorage.setItem("userId", action.payload);
    },

    // Clear auth data upon logout
    clearAuthData(state) {
      state.token = null;
      state.userId = null;
      state.roles = [];
      state.user = {
        firstName: "",
        lastName: "",
        gender: "",
        email: "",
        mobileNumber: "",
      };

      // Remove from Local Storage
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("user");
    },
  },
});

export const { setAuthData, setUserId, clearAuthData } = authSlice.actions;

export default authSlice.reducer;
