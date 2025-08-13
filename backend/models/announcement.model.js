const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema(
  {
    message: String,
    instructorId: String,
    instructorName: String,
    courseCode: String,
    createdAt: { type: Date, default: Date.now },
  },
  { collection: "announcements" }
);

module.exports = mongoose.model("Announcement", announcementSchema);
