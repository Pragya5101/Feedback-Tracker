/**
 * Formats an ISO date string into a readable format
 * @param {string} isoString - The ISO date string
 * @returns {string} Formatted date string (e.g., "Nov 20, 2023, 10:00 AM")
 */
export const formatDate = (isoString) => {
  if (!isoString) return '';
  const date = new Date(isoString);
  
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
};
