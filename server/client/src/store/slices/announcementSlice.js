import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllAnnouncements,
  getAnnouncementsByInstructor,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
} from "../../services/announcementService";

export const fetchAnnouncements = createAsyncThunk(
  "announcements/fetch",
  async ({ role, instructorId }) => {
    if (role === "instructor") {
      return (await getAnnouncementsByInstructor(instructorId)).data;
    }
    return (await getAllAnnouncements()).data;
  }
);

export const addAnnouncement = createAsyncThunk(
  "announcements/add",
  async (payload) => {
    return (await createAnnouncement(payload)).data;
  }
);

export const editAnnouncement = createAsyncThunk(
  "announcements/edit",
  async ({ id, payload }) => {
    return (await updateAnnouncement(id, payload)).data;
  }
);

export const removeAnnouncement = createAsyncThunk(
  "announcements/remove",
  async (id) => {
    await deleteAnnouncement(id);
    return id;
  }
);

const announcementSlice = createSlice({
  name: "announcements",
  initialState: { list: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnnouncements.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAnnouncements.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(addAnnouncement.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(editAnnouncement.fulfilled, (state, action) => {
        const index = state.list.findIndex((a) => a.id === action.payload.id);
        if (index !== -1) state.list[index] = action.payload;
      })
      .addCase(removeAnnouncement.fulfilled, (state, action) => {
        state.list = state.list.filter((a) => a.id !== action.payload);
      });
  },
});

export default announcementSlice.reducer;
