import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import announcementReducer from "./slices/announcementSlice";
import quizReducer from "./slices/quizSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    announcements: announcementReducer, // ✅ must match useSelector((s) => s.announcements)
    quizzes: quizReducer,
  },
});

export default store;
