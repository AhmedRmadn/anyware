const service = require("../services/quiz.service");
const ApiResponse = require("../utils/apiResponse");

exports.create = async (req, res) => {
  const quiz = await service.createQuiz(req.body);
  res.json(new ApiResponse(true, quiz, "Quiz created successfully"));
};

exports.getAll = async (req, res) => {
  const list = await service.getAllQuizzes();
  res.json(new ApiResponse(true, list, "Fetched all quizzes"));
};

exports.getById = async (req, res) => {
  const q = await service.getQuizById(req.params.id);
  if (q) res.json(new ApiResponse(true, q, "Fetched quiz successfully"));
  else res.status(404).json(new ApiResponse(false, null, "Quiz not found"));
};

exports.getByInstructorId = async (req, res) => {
  const list = await service.getQuizzesByInstructorId(req.params.instructorId);
  console.log(list);
  res.json(new ApiResponse(true, list, "Fetched quizzes for instructor"));
};

exports.update = async (req, res) => {
  const q = await service.updateQuiz(req.params.id, req.body);
  if (q) res.json(new ApiResponse(true, q, "Quiz updated successfully"));
  else res.status(404).json(new ApiResponse(false, null, "Quiz not found"));
};

exports.delete = async (req, res) => {
  console.log(req);
  const deleted = await service.deleteQuiz(req.params.id);
  if (deleted)
    res.json(new ApiResponse(true, null, "Quiz deleted successfully"));
  else res.status(404).json(new ApiResponse(false, null, "Quiz not found"));
};
