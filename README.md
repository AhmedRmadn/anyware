# Anywhere Company – Student Quizzes & Announcements Dashboard

This is a **full-stack web application** built as part of the Anywhere Company technical task.  
The application presents **student quizzes** and **announcements** for the current semester, with both frontend and backend implementations.

---


## 📌 Overview

The system consists of:
- **Frontend**: React + Redux with Material UI for UI components.
- **Backend**: Express.js (Node.js) with MongoDB for persistent storage.
- **Authentication Simulation**: Simple login/logout button (no username/password).
- **HOC Authentication Protection**: Only logged-in users can view the dashboard.
- **Responsive Layout**: Fits all screen sizes.
- **i18n Ready**: Prepared for future translations.

---

## 🛠 Tech Stack

**Frontend**
- React 
- Redux Toolkit
- Material UI (MUI)
- React Router
- i18next (for internationalization)

**Backend**
- Node.js
- Express.js
- MongoDB + Mongoose
- CORS

---

## ✨ Features

### Frontend
- **Login/Logout Simulation** — No credentials required.
- **Protected Dashboard** — Implemented via a `requireAuth` Higher Order Component.
- **Responsive Design** — Works on mobile, tablet, and desktop.
- **Material UI Styling** — Consistent look and feel.
- **i18n Ready** — Prepared for multi-language support.

### Backend
- **Announcements API**
  - CRUD: Create, Read, Update, Delete announcements.
- **Quizzes API**
  - CRUD: Create, Read, Update, Delete quizzes.
- **RESTful Endpoints** — Following industry standards.

---

## 🔐 Authentication & Roles

The application uses a simple **role-based authentication simulation** (no passwords) with two roles:

1. **Student**
   - On the Home page, select **Student**.
   - Enter your **name**.
   - Access the dashboard in **read-only mode** (can only view quizzes & announcements).

2. **Instructor**
   - On the Home page, select **Instructor**.
   - Enter your **Instructor ID**.
   - The ID must match one from the backend’s hardcoded list:
     ```js
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
     ```
   - Instructors can:
     - Create quizzes and announcements for **their own courses**.
     - Update or delete only their own content.

The **`requireAuth` Higher Order Component (HOC)** ensures:
- Users who are not logged in (student name or instructor ID not set) are redirected to the Home page.
- Students cannot access instructor-only CRUD features.

---
## 📂 Project Structure
```
/client
├── src
│ ├── components
│ ├── pages
│ ├── services
│ ├── store
│ ├── Apo.jsx
│ ├── main.jsx
│ └── index.css

```
```
/server
│ ├── controllers
│ ├── models
│ ├── routes
│ ├── services
│ ├── utils
| └── server.js
```

---

## ⚙ Installation

### 1️⃣ Clone Repository
```bash
git clone https://github.com/AhmedRmadn/anywhere.git
cd anywhere
cd server
npm install
cd client
npm install
```

create .env file add 
```
MONGO_URI=mongodb://localhost:27017/anywhere_db or online cluster 
PORT=8080
```

to run
```
cd server
npm start
cd client
npm run dev
```
👤 Author

Ahmed Ramadan
Software Engineer
📧 Email: ahmed.ramadanhassan9@gmail.com
💼 LinkedIn: [linkedin.com/in/yourprofile](https://www.linkedin.com/in/ahmed-ramadan-248280199/)
📂 GitHub: [github.com/yourusername](https://github.com/AhmedRmadn)


