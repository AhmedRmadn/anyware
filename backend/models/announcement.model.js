const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema(
  {
    message: String,
    instructorId: String,
    instructorName: String,
    courseCode: String,
    createdAt: { type: Date, default: Date.now },
  },
  {
    collection: "announcements",
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (_, ret) => {
        ret.id = ret._id.toString(); // add id as string
        delete ret._id; // remove original _id
      },
    },
  }
);

module.exports = mongoose.model("Announcement", announcementSchema);
