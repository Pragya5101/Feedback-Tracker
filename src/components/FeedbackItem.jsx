import React from "react";
import { FiTrash2, FiUser, FiClock } from "react-icons/fi";
import { formatDate } from "../utils/date-formatter";

/**
 * FeedbackItem Components
 * It displays a single feedback entry with user informations, messages and dates
 *
 * @param {Object} props
 * @param {Object} props.feedback - It contains feedback data
 * @param {Function} props.onDelete - It handles the feedback deletion
 */
const FeedbackItem = ({ feedback, onDelete }) => {
  
  /**
   * Handles delete button click functionality
   * It calls parent function with the feedback ID
   */
  const handleDeleteClick = () => {
    onDelete(feedback.id);
  };

  return (
    <div className="bg-white p-4 rounded-lg border shadow-sm">
      
      {/* It displays the user's informations and delete button */}
      <div className="flex justify-between items-start">
        
        {/* It displays the user's informations */}
        <div className="flex gap-2 items-center">
          <FiUser className="text-gray-500" />
          <div>
            <p className="font-medium">{feedback.name}</p>
            <p className="text-sm text-gray-500">{feedback.email}</p>
          </div>
        </div>

        {/* It displays the delete button */}
        <button
          onClick={handleDeleteClick}
          className="text-gray-400 hover:text-red-500"
          aria-label="Delete feedback"
        >
          <FiTrash2 />
        </button>
      </div>

      {/* It displays the feedback messages */}
      <p className="mt-3 text-gray-700 text-sm">
        {feedback.message}
      </p>

      {/* It displays the dates */}
      <div className="flex items-center gap-1 text-xs text-gray-400 mt-3">
        <FiClock />
        <span>{formatDate(feedback.date)}</span>
      </div>
    </div>
  );
};

export default FeedbackItem;