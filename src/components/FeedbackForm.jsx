import React, { useState } from "react";
import { FiSend } from "react-icons/fi";

/**
 * FeedbackForm Components
 * To handle user input data {name and email}, validate their format and submission of feedback data
 *
 * @param {Function} onAddFeedback - The callback function that sends feedback data to the parent component
 */
const FeedbackForm = ({ onAddFeedback }) => {
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  // To validate the errors state
  const [errors, setErrors] = useState({});

  /**
   * To handle the changes in the input fields
   * @param {Object} event - it handles input change event
   */
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // To allow only alphabets and spaces in the name field
    if (name === "name" && !/^[a-zA-Z\s]*$/.test(value)) {
      return;
    }

    // it updates the form state
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));

    //For clearing the error of the field when user starts typing
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: null
      }));
    }
  };

  /**
   * It validates the form data
   * @returns {Object} it returns validation errors
   */
  const validateForm = () => {
    const validationErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      validationErrors.name = "Please enter your name";
    }

    // Email validation
    if (!formData.email.trim()) {
      validationErrors.email = "Email is required";
    } else {
      const emailPattern =
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if (!emailPattern.test(formData.email.trim())) {
        validationErrors.email = "Enter a valid email";
      }
    }

    // Message validation
    if (!formData.message.trim()) {
      validationErrors.message = "Message can't be empty";
    }

    return validationErrors;
  };

  /**
   * For handling the form submission
   * @param {Object} event - It handles the form submit event
   */
  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = validateForm();

    // If validation fails, it will show the errors
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // It sends the cleaned data to the parent component
    onAddFeedback({
      ...formData,
      email: formData.email.trim()
    });

    // Itresets the form after submission
    setFormData({
      name: "",
      email: "",
      message: ""
    });

    setErrors({});
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow border h-fit">
      <h2 className="text-xl font-semibold mb-1">Feedback Form</h2>
      <p className="text-sm text-gray-500 mb-4">
        Share your thoughts with us.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Input Name */}
        <div>
          <input
            type="text"
            name="name"
            placeholder="Your name"
            value={formData.name}
            onChange={handleInputChange}
            className={`w-full p-3 border rounded-lg ${
              errors.name ? "border-red-400" : "border-gray-300"
            }`}
          />
          {errors.name && (
            <p className="text-sm text-red-500 mt-1">{errors.name}</p>
          )}
        </div>

        {/* Input Email */}
        <div>
          <input
            type="email"
            name="email"
            placeholder="Your email"
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full p-3 border rounded-lg ${
              errors.email ? "border-red-400" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">{errors.email}</p>
          )}
        </div>

        {/* Input Message */}
        <div>
          <textarea
            name="message"
            rows="4"
            placeholder="Your message..."
            value={formData.message}
            onChange={handleInputChange}
            className={`w-full p-3 border rounded-lg resize-none ${
              errors.message ? "border-red-400" : "border-gray-300"
            }`}
          />
          {errors.message && (
            <p className="text-sm text-red-500 mt-1">
              {errors.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700"
        >
          <FiSend />
          Submit
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;