const service = require("../services/announcement.service");
const ApiResponse = require("../utils/apiResponse");

exports.create = async (req, res) => {
  const announcement = await service.createAnnouncement(req.body);
  res.json(
    new ApiResponse(true, announcement, "Announcement created successfully")
  );
};

exports.getAll = async (req, res) => {
  const list = await service.getAllAnnouncements();
  res.json(new ApiResponse(true, list, "Fetched all announcements"));
};

exports.getById = async (req, res) => {
  const a = await service.getAnnouncementById(req.params.id);
  if (a)
    res.json(new ApiResponse(true, a, "Fetched announcement successfully"));
  else
    res
      .status(404)
      .json(new ApiResponse(false, null, "Announcement not found"));
};

exports.getByInstructorId = async (req, res) => {
  const list = await service.getAnnouncementsByInstructorId(
    req.params.instructorId
  );
  res.json(new ApiResponse(true, list, "Fetched announcements for instructor"));
};

exports.update = async (req, res) => {
  const a = await service.updateAnnouncement(req.params.id, req.body);
  if (a)
    res.json(new ApiResponse(true, a, "Announcement updated successfully"));
  else
    res
      .status(404)
      .json(new ApiResponse(false, null, "Announcement not found"));
};

exports.delete = async (req, res) => {
  const deleted = await service.deleteAnnouncement(req.params.id);
  if (deleted)
    res.json(new ApiResponse(true, null, "Announcement deleted successfully"));
  else
    res
      .status(404)
      .json(new ApiResponse(false, null, "Announcement not found"));
};
