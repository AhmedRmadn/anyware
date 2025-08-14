const instructors = [
  {
    id: "1",
    name: "Alice Johnson",
    courses: [
      "CS101 - Intro to Programming",
      "CS201 - Data Structures",
      "CS301 - Algorithms",
    ],
    imageUrl: "/images/Alice Johnson.jpg",
  },
  {
    id: "2",
    name: "Bob Smith",
    courses: [
      "CS201 - Data Structures",
      "CS310 - Machine Learning",
      "CS320 - Artificial Intelligence",
    ],
    imageUrl: "/images/Bob Smith.jpg",
  },
  {
    id: "3",
    name: "Charlie Brown",
    courses: [
      "CS210 - Databases",
      "CS410 - Advanced Databases",
      "CS101 - Intro to Programming",
    ],
    imageUrl: "/images/Charlie Brown.jpg",
  },
];

function getInstructorById(id) {
  return instructors.find((i) => i.id === id) || null;
}

module.exports = { getInstructorById };
