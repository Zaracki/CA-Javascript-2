/**
 * Displays an error message to the user.
 * This function assumes that there is an HTML element with the ID 'errorMessage'
 * in which the error message will be displayed.
 *
 * @function displayErrorMessage
 * @param {string} message - The error message to be displayed.
 */
function displayErrorMessage(message) {
  // Retrieves the HTML element intended for displaying error messages.
  const errorMessageDiv = document.getElementById('errorMessage');
  errorMessageDiv.textContent = message;
  errorMessageDiv.style.display = 'block';
}

export { displayErrorMessage };