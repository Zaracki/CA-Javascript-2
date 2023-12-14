

function checkUserLoggedIn() {
  return !!localStorage.getItem("accessToken"); // Convert accessToken existence to boolean
}

export {  checkUserLoggedIn  };
