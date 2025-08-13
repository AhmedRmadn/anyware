const Quiz = require("../models/quiz.model");

async function createQuiz(data) {
  const quiz = new Quiz(data);
  return quiz.save();
}

async function getAllQuizzes() {
  return Quiz.find();
}

async function getQuizById(id) {
  return Quiz.findById(id);
}

async function getQuizzesByInstructorId(instructorId) {
  return Quiz.find({ instructorId });
}

async function updateQuiz(id, data) {
  return Quiz.findByIdAndUpdate(id, data, { new: true });
}

async function deleteQuiz(id) {
  const result = await Quiz.findByIdAndDelete(id);
  return !!result;
}

module.exports = {
  createQuiz,
  getAllQuizzes,
  getQuizById,
  getQuizzesByInstructorId,
  updateQuiz,
  deleteQuiz,
};
