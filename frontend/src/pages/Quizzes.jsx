import { useSelector } from "react-redux";
import {
  fetchQuizzes,
  addQuiz,
  editQuiz,
  removeQuiz,
} from "../store/slices/quizSlice";
import ResourcePage from "../components/ResourcePage";
import QuizForm from "../components/QuizForm";

export default function Quizzes() {
  const now = new Date();
  const filterActive = (q) => new Date(q.quizTime) >= now;

  return (
    <ResourcePage
      title="Quizzes"
      resourceState={useSelector((s) => s.quizzes)}
      fetchAction={fetchQuizzes}
      createAction={addQuiz}
      editAction={editQuiz}
      removeAction={removeQuiz}
      FormComponent={QuizForm}
      filterActive={filterActive}
      renderExtra={(q) =>
        `${q.duration} min • ${new Date(q.quizTime).toLocaleString()}`
      }
    />
  );
}
