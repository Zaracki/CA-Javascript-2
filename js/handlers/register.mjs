import { makeRequest } from "../fetch.mjs";
import { REGISTER_API_URL } from "../constants.mjs";

const form = document.querySelector("#registerForm");

async function registerUser(user) {
  try {
    const postBody = JSON.stringify(user);
    const myData = await makeRequest(REGISTER_API_URL, { 
      method: "POST",
      body: postBody,
    });
    window.location.href = "../index.html";
  } catch (error) {
    // Handle the error here
    console.error("Error registering user:", error);
  }
}
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form)
  const userRegistrationDetails = Object.fromEntries(formData.entries())

  registerUser(userRegistrationDetails)

  })