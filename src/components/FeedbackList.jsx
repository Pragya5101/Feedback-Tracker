import React from "react";
import FeedbackItem from "./FeedbackItem";
import { FiSearch } from "react-icons/fi";

/**
 * It displays the list of feedbacks and updates them with search and filters
 *
 * @param {Object} props
 * @param {Array} props.feedbackList - It contains the feedback items
 * @param {string} props.keyword - It contains the search keyword
 * @param {Function} props.setKeyword - It updates the keyword
 * @param {string} props.dateFilter - It contains the selected date filter
 * @param {Function} props.setDateFilter - It updates the date filter
 * @param {Function} props.onDelete - It handles the deletion of feedback items
 */
const FeedbackList = ({
  feedbackList,
  keyword,
  setKeyword,
  dateFilter,
  setDateFilter,
  onDelete
}) => {
  /**
   * It handles the changes in the input fields
   * @param {Object} event - It handles the input change event
   */
  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
  };

  /**
   * It handles the date filter change
   * @param {Object} event - It handles the date change event
   */
  const handleDateChange = (event) => {
    setDateFilter(event.target.value);
  };

  return (
    <div className="bg-white p-5 rounded-lg border shadow-sm">
      
      {/* The header Section */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-lg">Feedbacks</h2>
        <span className="text-sm text-gray-500">
          {feedbackList.length} items
        </span>
      </div>

      {/* The filters Section */}
      <div className="flex gap-2 mb-4">
        
        {/* The Date Filter */}
        <input
          type="date"
          value={dateFilter}
          onChange={handleDateChange}
          className="border p-2 rounded text-sm"
        />

        {/* The Keyword Search */}
        <div className="flex items-center border rounded px-2 w-full max-w-xs">
          <FiSearch className="text-gray-400 mr-1" />
          <input
            type="text"
            placeholder="Search..."
            value={keyword}
            onChange={handleKeywordChange}
            className="p-2 outline-none text-sm w-full"
          />
        </div>
      </div>

      {/* The Feedback List Section */}
      <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
        {feedbackList.length === 0 ? (
          
          // The Empty State Message
          <p className="text-sm text-gray-500 text-center mt-6">
            {keyword ? "No matching results" : "No feedback yet"}
          </p>
        ) : (
          
          // The feedbackItem list
          feedbackList.map((feedbackItem) => (
            <FeedbackItem
              key={feedbackItem.id}
              feedback={feedbackItem}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default FeedbackList;