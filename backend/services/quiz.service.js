const Quiz = require("../models/quiz.model");
const Announcement = require("../models/announcement.model");

function formatDateTime(date) {
  return new Date(date).toLocaleString("en-US", {
    weekday: "short", // e.g., "Mon"
    year: "numeric",
    month: "short", // e.g., "Aug"
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

async function createAnnouncementForQuiz(message, quiz) {
  const announcement = new Announcement({
    message,
    instructorId: quiz.instructorId,
    instructorName: quiz.instructorName,
    courseCode: quiz.courseCode,
    createdAt: new Date(),
  });
  await announcement.save();
}
// Create
async function createQuiz(data) {
  const quiz = new Quiz(data);
  const savedQuiz = await quiz.save();

  const formattedTime = formatDateTime(savedQuiz.quizTime);

  await createAnnouncementForQuiz(
    `New quiz "${savedQuiz.title}" for course ${savedQuiz.courseCode} scheduled at ${formattedTime}`,
    savedQuiz
  );

  return savedQuiz;
}

// Read all
async function getAllQuizzes() {
  return Quiz.find();
}

// Read by ID
async function getQuizById(id) {
  return Quiz.findById(id);
}

// Read by instructorId
async function getQuizzesByInstructorId(instructorId) {
  return Quiz.find({ instructorId });
}

// Update
async function updateQuiz(id, data) {
  const updatedQuiz = await Quiz.findByIdAndUpdate(id, data, { new: true });
  if (updatedQuiz) {
    const formattedTime = formatDateTime(updatedQuiz.quizTime);
    await createAnnouncementForQuiz(
      `Quiz "${updatedQuiz.title}" scheduled at ${formattedTime} has been updated.`,
      updatedQuiz
    );
  }
  return updatedQuiz;
}

// Delete
async function deleteQuiz(id) {
  const quiz = await Quiz.findById(id);
  if (!quiz) return false;

  await Quiz.findByIdAndDelete(id);

  await createAnnouncementForQuiz(
    `Quiz "${quiz.title}" for course "${quiz.courseCode}" has been cancelled.`,
    quiz
  );

  return true;
}

module.exports = {
  createQuiz,
  getAllQuizzes,
  getQuizById,
  getQuizzesByInstructorId,
  updateQuiz,
  deleteQuiz,
};
