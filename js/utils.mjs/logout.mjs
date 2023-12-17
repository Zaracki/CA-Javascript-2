/**
 * Handles user logout.
 * Removes user-specific data such as access token and username from local storage.
 *
 * @function logout
 */

function logout() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('username');
}

const logoutButton = document.getElementById('logoutButton');
logoutButton.addEventListener('click', logout);