import { makeRequest } from "../fetch.mjs";
import { LOGIN_API_URL, POSTS_API_URL } from "../constants.mjs";
import { addToLocalStorage } from "../utils.mjs/localStorage.mjs";
import { displayPosts } from "../utils.mjs/displayPost.mjs";
import { displayErrorMessage } from "../utils.mjs/displayError.mjs";

const form = document.querySelector("#loginForm");

/*
if (isUserLoggedIn()) {
  window.location.href = '/feed'; // Redirect to feed page
}

function isUserLoggedIn() {
  return !!localStorage.getItem('accessToken');
}
*/

async function loginUser(user) {
  try{
    const postBody = JSON.stringify(user);
    const myData = await makeRequest(LOGIN_API_URL, { 
      method: "POST",
      body: postBody,
    },
    false
    );
    if (myData !== undefined) {
    const token = myData.accessToken;
    const username = myData.name;
    addToLocalStorage("accessToken", token);
    addToLocalStorage("username", username);
    window.location.href = "/feed";      
    } else {
      displayErrorMessage("Login failed")
    }

  } catch (error) {
    displayErrorMessage("Login failed")
  }
};

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const userLoginDetails = Object.fromEntries(formData.entries())

  await loginUser(userLoginDetails);
  });