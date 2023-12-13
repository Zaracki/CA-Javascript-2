/**
 * Checks if the user is logged in.
 * 
 * Checks if a user is logged in by looking for an 'accessToken' in localStorage. 
 * The '!!' converts the token's existence into a true (logged in) or false (not logged in).
 * 
 * @returns {boolean} True if the user is logged in (accessToken exists), false otherwise.
 */

function checkUserLoggedIn() {
  return !!localStorage.getItem("accessToken"); // Convert accessToken existence to boolean
}

export {  checkUserLoggedIn  };

/*
function checkUserLoggedIn() {
  const token = localStorage.getItem("accessToken");
  if (token) {
    return true;
  } else {
    return false;
  }
}
*/