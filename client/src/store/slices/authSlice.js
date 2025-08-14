import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchInstructorById } from "../../services/instructorService";

const AUTH_KEY = "mock_auth";
const ROLE_KEY = "mock_role";
const NAME_KEY = "mock_name";
const INSTRUCTOR_DATA_KEY = "mock_instructor_data";

export const loginInstructorAsync = createAsyncThunk(
  "auth/loginInstructorAsync",
  async (id, { rejectWithValue }) => {
    try {
      const data = await fetchInstructorById(id);
      if (!data.success) {
        return rejectWithValue(data.message || "Instructor not found");
      }
      return data.data; // instructor object
    } catch (err) {
      return rejectWithValue(err.message || "Failed to connect to server");
    }
  }
);

const initialState = {
  isAuthenticated: localStorage.getItem(AUTH_KEY) === "true",
  role: localStorage.getItem(ROLE_KEY) || "",
  userName: localStorage.getItem(NAME_KEY) || "",
  instructorData: JSON.parse(
    localStorage.getItem(INSTRUCTOR_DATA_KEY) || "null"
  ),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStudent(state, action) {
      state.isAuthenticated = true;
      state.role = "student";
      state.userName = action.payload;
      state.instructorData = null;
      state.error = null;

      localStorage.setItem(AUTH_KEY, "true");
      localStorage.setItem(ROLE_KEY, "student");
      localStorage.setItem(NAME_KEY, action.payload);
      localStorage.removeItem(INSTRUCTOR_DATA_KEY);
    },
    logout(state) {
      state.isAuthenticated = false;
      state.role = "";
      state.userName = "";
      state.instructorData = null;
      state.error = null;

      localStorage.removeItem(AUTH_KEY);
      localStorage.removeItem(ROLE_KEY);
      localStorage.removeItem(NAME_KEY);
      localStorage.removeItem(INSTRUCTOR_DATA_KEY);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginInstructorAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginInstructorAsync.fulfilled, (state, action) => {
        const instructor = action.payload;
        state.loading = false;
        state.isAuthenticated = true;
        state.role = "instructor";
        state.userName = instructor.name;
        state.instructorData = instructor;
        state.error = null;

        localStorage.setItem(AUTH_KEY, "true");
        localStorage.setItem(ROLE_KEY, "instructor");
        localStorage.setItem(NAME_KEY, instructor.name);
        localStorage.setItem(INSTRUCTOR_DATA_KEY, JSON.stringify(instructor));
      })
      .addCase(loginInstructorAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      });
  },
});

export const { loginStudent, logout } = authSlice.actions;
export default authSlice.reducer;
