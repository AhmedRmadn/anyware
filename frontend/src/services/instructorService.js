export async function fetchInstructorById(id) {
  const res = await fetch(`http://localhost:8080/instructor/${id}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch instructor (status: ${res.status})`);
  }
  const data = await res.json();
  return data; // { success: true, data: {...}, message: "Instructor found" }
}
