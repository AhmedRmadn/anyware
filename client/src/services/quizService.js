const API_BASE = "http://localhost:8080/quiz";

export const getAllQuizzes = async () => {
  const res = await fetch(API_BASE);
  return res.json();
};

export const getQuizzesByInstructor = async (instructorId) => {
  const res = await fetch(`${API_BASE}/instructor/${instructorId}`);
  return res.json();
};

export const createQuiz = async (payload) => {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  console.log(payload);
  return res.json();
};

export const updateQuiz = async (id, payload) => {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
};

export const deleteQuiz = async (id) => {
  console.log("Deleting quiz with id:", id); // debug log
  const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
  return res.json();
};
