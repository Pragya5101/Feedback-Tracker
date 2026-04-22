const API_URL = '/api/feedback';

/**
 * It fetches feedback entries from the server
 * @param {string} [keyword=''] - It contains the keyword to filter feedback by
 * @param {string} [dateFilter=''] - It contains the date to filter feedback by
 * @returns {Promise<Array>} It contains the filtered list of feedback entries
 */
export const getFeedback = async (keyword = '', dateFilter = '') => {
  try {
    const url = new URL(API_URL, window.location.origin);
    if (keyword) url.searchParams.append('keyword', keyword);
    if (dateFilter) url.searchParams.append('dateFilter', dateFilter);

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch feedback');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching feedback:', error);
    throw error;
  }
};

/**
 * It adds a new feedback entry to the server
 * @param {Object} formData - It contains the feedback form data containing name, email, and message
 * @returns {Promise<Object>} It contains the added feedback entry
 */
export const addFeedback = async (formData) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      throw new Error('Failed to add feedback');
    }
    return await response.json();
  } catch (error) {
    console.error('Error adding feedback:', error);
    throw error;
  }
};

/**
 * It deletes a feedback entry from the server
 * @param {string} id - It contains the ID of the feedback entry to be deleted
 * @returns {Promise<Object>} It contains the Response message from the server
 */
export const deleteFeedback = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete feedback');
    }
    return await response.json();
  } catch (error) {
    console.error('Error deleting feedback:', error);
    throw error;
  }
};
