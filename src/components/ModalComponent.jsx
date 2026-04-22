import React from "react";
import { FiAlertTriangle } from "react-icons/fi";

/**
 * ModalComponent
 * It displays a customizable modal dialog for confirmations like deleting feedback
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - It controls the modal visibility
 * @param {Function} props.onClose - It callback to close the modal
 * @param {Function} props.onConfirm - It callback to execute on confirmation
 * @param {string} props.title - It contains modal title text
 * @param {string} props.message - It contains modal message text
 */
const ModalComponent = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message
}) => {
  if (!isOpen) return null;

  /**
   * For handling the confirmation action
   * It executes the confirm callback and closes the modal
   */
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">
      <div className="bg-white p-5 rounded-lg w-full max-w-sm shadow">
        {/* header */}
        <div className="flex items-center gap-2 mb-3">
          <FiAlertTriangle className="text-red-500" />
          <h3 className="font-semibold">{title}</h3>
        </div>

        {/* message */}
        <p className="text-sm text-gray-600 mb-4">
          {message}
        </p>

        {/* actions */}
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3 py-1 border rounded text-sm"
          >
            Cancel
          </button>

          <button
            onClick={handleConfirm}
            className="px-3 py-1 bg-red-600 text-white rounded text-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalComponent;