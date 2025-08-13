const service = require("../services/instructor.service");
const ApiResponse = require("../utils/apiResponse");

exports.getById = (req, res) => {
  const instructor = service.getInstructorById(req.params.id);
  if (instructor)
    res.json(new ApiResponse(true, instructor, "Instructor found"));
  else
    res.status(404).json(new ApiResponse(false, null, "Instructor not found"));
};
