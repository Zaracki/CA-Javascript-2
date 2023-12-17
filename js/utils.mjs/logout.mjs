function logout() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('username');
}

const logoutButton = document.getElementById('logoutButton');
logoutButton.addEventListener('click', logout);