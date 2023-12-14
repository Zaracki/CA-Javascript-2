import { makeRequest } from "../fetch.mjs";
import { LOGIN_API_URL, POSTS_API_URL } from "../constants.mjs";
import { addToLocalStorage } from "../utils.mjs/localStorage.mjs";
import { displayPosts } from "../utils.mjs/displayPost.mjs";

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
    const token = myData.accessToken;
    addToLocalStorage("accessToken", token);
    window.location.href = "/feed";
  } catch (error) {
    console.log("Failed Login");
  }
};

/* async function loginUser(user) {
  try {
    const postBody = JSON.stringify(user);
    const response = await makeRequest(LOGIN_API_URL, { 
      method: "POST",
      body: postBody,
    });

    if (response.accessToken) {
      addToLocalStorage("accessToken", response.accessToken);
    } else {
      console.error("Access token not received");
    }
  } catch (error) {
    console.error("Login failed:", error);
  }
}
*/ 

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const userLoginDetails = Object.fromEntries(formData.entries())

  await loginUser(userLoginDetails);
  });