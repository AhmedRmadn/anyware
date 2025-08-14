import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ResourceCard from "./ResourceCard";
import ConfirmDelete from "./ConfirmDelete";

export default function ResourcePage({
  title,
  resourceState, // { list, loading, error }
  fetchAction,
  createAction,
  editAction,
  removeAction,
  filterActive, // optional function to split active/past
  renderExtra,
  FormComponent,
}) {
  const {
    role: userRole,
    instructorData,
    userName,
  } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const { list, loading, error } = resourceState;
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const handleDeleteClick = (item) => {
    setDeleteTarget(item);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    dispatch(removeAction(deleteTarget.id));
    setConfirmOpen(false);
    setDeleteTarget(null);
  };

  useEffect(() => {
    dispatch(fetchAction({ role: userRole, instructorId: instructorData?.id }));
  }, [dispatch, userRole, instructorData, fetchAction]);

  const handleAdd = (data) => {
    dispatch(
      createAction({
        ...data,
        instructorId: instructorData?.id,
        instructorName: userName,
      })
    );
    setShowForm(false);
  };

  const handleEdit = (data) => {
    dispatch(
      editAction({
        id: editing.id,
        payload: {
          ...data,
          instructorId: instructorData?.id,
          instructorName: userName,
        },
      })
    );
    setEditing(null);
  };

  // Optional filtering for active/past
  const activeItems = filterActive ? list.filter(filterActive) : list;
  const pastItems = filterActive ? list.filter((i) => !filterActive(i)) : [];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        {userRole === "instructor" && !showForm && !editing && (
          <button onClick={() => setShowForm(true)} className="create-btn mb-4">
            + Create
          </button>
        )}
      </div>

      {userRole === "instructor" && showForm && (
        <FormComponent
          courses={instructorData.courses}
          onSubmit={handleAdd}
          onCancel={() => setShowForm(false)}
        />
      )}
      {userRole === "instructor" && editing && (
        <FormComponent
          courses={instructorData.courses}
          initialData={editing}
          onSubmit={handleEdit}
          onCancel={() => setEditing(null)}
        />
      )}

      {activeItems.length > 0 ? (
        activeItems.map((item) => (
          <ResourceCard
            key={item.id}
            title={item.title || item.message}
            subtitle={`${item.courseCode} - ${item.instructorName}`}
            extra={renderExtra ? renderExtra(item) : ""}
            actions={
              userRole === "instructor" &&
              item.instructorId === instructorData?.id
                ? [
                    {
                      label: "Edit",
                      onClick: () => setEditing(item),
                      className: "bg-blue-500 text-white",
                    },
                    {
                      label: "Delete",
                      onClick: () => handleDeleteClick(item),
                      className: "bg-red-500 text-white",
                    },
                  ]
                : null
            }
          />
        ))
      ) : (
        <p>No {title.toLowerCase()}</p>
      )}
      {confirmOpen ? (
        <ConfirmDelete
          open={confirmOpen}
          onConfirm={handleConfirmDelete}
          onCancel={() => setConfirmOpen(false)}
        />
      ) : null}

      {/* Optional past items */}
      {pastItems.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-3">Past {title}</h3>
          {pastItems.map((item) => (
            <ResourceCard
              key={item.id}
              title={item.title || item.message}
              subtitle={`${item.courseCode} - ${item.instructorName}`}
              extra={renderExtra ? renderExtra(item) : ""}
            />
          ))}
        </div>
      )}

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
