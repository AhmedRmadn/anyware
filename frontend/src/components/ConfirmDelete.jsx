export default function ConfirmDelete({ onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Transparent overlay */}
      <div
        className="absolute inset-0 bg-gray-200 opacity-30"
        onClick={onCancel}
      ></div>

      {/* Modal content */}
      <div className="relative bg-white rounded-lg shadow-md w-80 p-5 text-center transition-transform transform hover:scale-105">
        <h3 className="text-lg font-semibold mb-3">Confirm Delete</h3>
        <p className="mb-5">Are you sure you want to delete</p>
        <div className="flex justify-center gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100 hover:scale-105 transition duration-200 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 hover:scale-105 transition duration-200 cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
