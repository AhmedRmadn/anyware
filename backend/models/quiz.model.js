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

// Convert _id to id when sending JSON
quizSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    ret.id = ret._id.toString();
    delete ret._id;
  },
});

module.exports = mongoose.model("Quiz", quizSchema);
