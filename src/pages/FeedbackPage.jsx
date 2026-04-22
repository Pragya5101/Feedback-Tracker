import React, { useState, useEffect } from "react";
import FeedbackForm from "../components/FeedbackForm";
import FeedbackList from "../components/FeedbackList";
import ModalComponent from "../components/ModalComponent";
import {
  getFeedback,
  addFeedback,
  deleteFeedback
} from "../services/feedback-service";

/**
 * FeedbackPage Component
 * This is the main container that manages feedback state, API calls,
 * filtering, and deletion workflow
 */
const FeedbackPage = () => {
  // State: feedback data
  const [feedbacks, setFeedbacks] = useState([]);

  // State: filters
  const [keyword, setKeyword] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  // State: modal control
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFeedbackId, setSelectedFeedbackId] = useState(null);

  /**
   * It fetches feedback data based on filters
   */
  const fetchFeedbacks = async () => {
    try {
      const data = await getFeedback(keyword, dateFilter);
      setFeedbacks(data);
    } catch (error) {
      console.error("Failed to fetch feedback:", error);
    }
  };

  /**
   * For loading feedbacks when filters change
   */
  useEffect(() => {
    fetchFeedbacks();
  }, [keyword, dateFilter]);

  /**
   * It handles adding new feedback
   * @param {Object} formData - Feedback form data
   */
  const handleAddFeedback = async (formData) => {
    try {
      await addFeedback(formData);
      fetchFeedbacks();
    } catch (error) {
      console.error("Failed to add feedback:", error);
    }
  };

  /**
   * It opens delete confirmation modal
   * @param {string|number} id - Feedback ID
   */
  const handleDeleteClick = (id) => {
    setSelectedFeedbackId(id);
    setIsModalOpen(true);
  };

  /**
   * It handles the delete action, confirms and deletes the selected feedback
   */
  const handleConfirmDelete = async () => {
    if (!selectedFeedbackId) return;

    try {
      await deleteFeedback(selectedFeedbackId);
      setIsModalOpen(false);
      setSelectedFeedbackId(null);
      fetchFeedbacks();
    } catch (error) {
      console.error("Failed to delete feedback:", error);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      
      {/* Page Title */}
      <h1 className="text-4xl font-bold text-blue-600 mb-6">
        The Feedback Space
      </h1>

      {/* Main Layout */}
      <div className="grid md:grid-cols-2 gap-6">
        
        {/* Feedback Form */}
        <FeedbackForm onAddFeedback={handleAddFeedback} />

        {/* Feedback List */}
        <FeedbackList
          feedbackList={feedbacks}
          keyword={keyword}
          setKeyword={setKeyword}
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
          onDelete={handleDeleteClick}
        />
      </div>

      {/* It displays the confirmation modal */}
      <ModalComponent
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Feedback"
        message="Are you sure you want to delete this feedback?"
      />
    </div>
  );
};

export default FeedbackPage;