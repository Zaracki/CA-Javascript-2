import { makeRequest } from "../fetch.mjs";
import { LOGIN_API_URL, POSTS_API_URL } from "../constants.mjs";
import { addToLocalStorage } from "../utils.mjs/localStorage.mjs";
import { displayErrorMessage } from "../utils.mjs/displayError.mjs";

const form = document.querySelector("#loginForm");

async function loginUser(user) {
  try{
    const postBody = JSON.stringify(user);
    const myData = await makeRequest(LOGIN_API_URL, { 
      method: "POST",
      body: postBody,
    },
    false
    );
    if (myData.ok) {
      const json = await myData.json();
      const token = json.accessToken;
      const username = json.name;
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