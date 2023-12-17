/**
 * Checks if the user is logged in by verifying the presence of an access token in localStorage.
 * Returns a boolean value indicating the login status.
 *
 * @function checkUserLoggedIn
 * @returns {boolean} True if the user is logged in (access token exists), false otherwise.
 */

function checkUserLoggedIn() {
  return !!localStorage.getItem("accessToken");
}

export {  checkUserLoggedIn  };
