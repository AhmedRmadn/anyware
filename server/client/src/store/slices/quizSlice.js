import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllQuizzes,
  getQuizzesByInstructor,
  createQuiz,
  updateQuiz,
  deleteQuiz,
} from "../../services/quizService";

export const fetchQuizzes = createAsyncThunk(
  "quizzes/fetch",
  async ({ role, instructorId }) => {
    if (role === "instructor") {
      return (await getQuizzesByInstructor(instructorId)).data;
    }
    return (await getAllQuizzes()).data;
  }
);

export const addQuiz = createAsyncThunk("quizzes/add", async (payload) => {
  return (await createQuiz(payload)).data;
});

export const editQuiz = createAsyncThunk(
  "quizzes/edit",
  async ({ id, payload }) => {
    return (await updateQuiz(id, payload)).data;
  }
);

export const removeQuiz = createAsyncThunk("quizzes/remove", async (id) => {
  await deleteQuiz(id);
  return id;
});

const quizSlice = createSlice({
  name: "quizzes",
  initialState: { list: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuizzes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchQuizzes.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(addQuiz.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(editQuiz.fulfilled, (state, action) => {
        const index = state.list.findIndex((q) => q.id === action.payload.id);
        if (index !== -1) state.list[index] = action.payload;
      })
      .addCase(removeQuiz.fulfilled, (state, action) => {
        state.list = state.list.filter((q) => q.id !== action.payload);
      });
  },
});

export default quizSlice.reducer;
