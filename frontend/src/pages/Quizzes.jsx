import React, { useState } from "react";
import Slider from "react-slick";
import { useSelector, useDispatch } from "react-redux";
import { addQuiz, editQuiz, removeQuiz } from "../store/slices/quizSlice";
import ResourceCard from "../components/ResourceCard";
import QuizForm from "../components/QuizForm";

export default function Quizzes() {
  const { role, instructorData, userName } = useSelector((s) => s.auth);
  const { list: quizzes } = useSelector((s) => s.quizzes);
  const dispatch = useDispatch();

  const now = new Date();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  // Separate active/past quizzes
  const activeQuizzes = [...quizzes]
    .filter((q) => new Date(q.quizTime) >= now)
    .sort((a, b) => new Date(a.quizTime) - new Date(b.quizTime));

  const pastQuizzes = [...quizzes]
    .filter((q) => new Date(q.quizTime) < now)
    .sort((a, b) => new Date(b.quizTime) - new Date(a.quizTime));

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: Math.min(pastQuizzes.length, 3),
    slidesToScroll: 1,
  };

  const handleAdd = (formData) => {
    dispatch(
      addQuiz({
        ...formData,
        instructorId: instructorData.id,
        instructorName: userName,
      })
    );
    setShowForm(false);
  };

  const handleEdit = (formData) => {
    dispatch(
      editQuiz({
        id: editing.id,
        payload: {
          ...formData,
          instructorId: instructorData.id,
          instructorName: userName,
        },
      })
    );
    setEditing(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      dispatch(removeQuiz(id));
    }
  };

  return (
    <div>
      {/* Header & create button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Active Quizzes</h2>
        {role === "instructor" && !showForm && !editing && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            + Create Quiz
          </button>
        )}
      </div>

      {/* Create form */}
      {role === "instructor" && showForm && (
        <QuizForm
          courses={instructorData.courses}
          onSubmit={handleAdd}
          onCancel={() => setShowForm(false)}
        />
      )}

      {/* Edit form */}
      {role === "instructor" && editing && (
        <QuizForm
          courses={instructorData.courses}
          initialData={editing}
          onSubmit={handleEdit}
          onCancel={() => setEditing(null)}
        />
      )}

      {/* Active quizzes */}
      {activeQuizzes.length > 0 ? (
        activeQuizzes.map((q) => (
          <ResourceCard
            key={q.id}
            title={q.title}
            subtitle={`${q.courseCode} - ${q.instructorName}`}
            extra={`${q.duration} min • ${new Date(
              q.quizTime
            ).toLocaleString()}`}
            actions={
              role === "instructor" && q.instructorId === instructorData?.id
                ? [
                    {
                      label: "Edit",
                      onClick: () => setEditing(q),
                      className: "bg-blue-500 text-white",
                    },
                    {
                      label: "Delete",
                      onClick: () => handleDelete(q.id),
                      className: "bg-red-500 text-white",
                    },
                  ]
                : null
            }
          />
        ))
      ) : (
        <p>No active quizzes</p>
      )}

      {/* Past quizzes slider */}
      {pastQuizzes.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-3">Past Quizzes</h3>
          <Slider {...sliderSettings}>
            {pastQuizzes.map((q) => (
              <div key={q.id} className="p-2">
                <ResourceCard
                  title={q.title}
                  subtitle={`${q.courseCode} - ${q.instructorName}`}
                  extra={`${q.duration} min • ${new Date(
                    q.quizTime
                  ).toLocaleString()}`}
                  actions={
                    role === "instructor" &&
                    q.instructorId === instructorData?.id
                      ? [
                          {
                            label: "Edit",
                            onClick: () => setEditing(q),
                            className: "bg-blue-500 text-white",
                          },
                          {
                            label: "Delete",
                            onClick: () => handleDelete(q.id),
                            className: "bg-red-500 text-white",
                          },
                        ]
                      : null
                  }
                />
              </div>
            ))}
          </Slider>
        </div>
      )}
    </div>
  );
}
