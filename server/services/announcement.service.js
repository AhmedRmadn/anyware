const Announcement = require("../models/announcement.model");

async function createAnnouncement(data) {
  const announcement = new Announcement(data);
  return announcement.save();
}

async function getAllAnnouncements() {
  return Announcement.find();
}

async function getAnnouncementById(id) {
  return Announcement.findById(id);
}

async function updateAnnouncement(id, data) {
  return Announcement.findByIdAndUpdate(id, data, { new: true });
}

async function deleteAnnouncement(id) {
  const result = await Announcement.findByIdAndDelete(id);
  return !!result;
}

async function getAnnouncementsByInstructorId(instructorId) {
  return Announcement.find({ instructorId });
}

module.exports = {
  createAnnouncement,
  getAllAnnouncements,
  getAnnouncementById,
  updateAnnouncement,
  deleteAnnouncement,
  getAnnouncementsByInstructorId,
};
