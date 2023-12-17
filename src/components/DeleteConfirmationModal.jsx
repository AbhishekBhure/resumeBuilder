import React from "react";

const DeleteConfirmationModal = ({ isOpen, onCancel, onConfirm }) => {
  return (
    isOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-4 rounded-lg">
          <p>Are you sure you want to delete this resume?</p>
          <div className="flex gap-4 mt-4">
            <button
              className="bg-red-500 text-white p-2 rounded"
              onClick={onConfirm}
            >
              Yes, delete
            </button>
            <button
              className="bg-gray-500 text-white p-2 rounded"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default DeleteConfirmationModal;
