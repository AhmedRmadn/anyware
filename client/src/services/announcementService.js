const API_BASE = "http://localhost:8080/announcement";

export const getAllAnnouncements = async () => {
  const res = await fetch(API_BASE);
  return res.json();
};

export const getAnnouncementsByInstructor = async (instructorId) => {
  const res = await fetch(`${API_BASE}/instructor/${instructorId}`);
  return res.json();
};

export const createAnnouncement = async (payload) => {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
};

export const updateAnnouncement = async (id, payload) => {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
};

export const deleteAnnouncement = async (id) => {
  const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
  return res.json();
};
