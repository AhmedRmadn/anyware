const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema(
  {
    title: String,
    instructorId: String,
    instructorName: String,
    courseCode: String,
    duration: Number,
    quizTime: Date,
  },
  { collection: "quizzes" }
);

module.exports = mongoose.model("Quiz", quizSchema);
