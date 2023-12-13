import { makeRequest } from "../fetch.mjs";
import { REGISTER_API_URL } from "../constants.mjs";

const form = document.querySelector("#registerForm");

async function registerUser(user) {
  const postBody = JSON.stringify(user);
  const myData = await makeRequest(REGISTER_API_URL, { 
    method: "POST",
    body: postBody,
});
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form)
  const userRegistrationDetails = Object.fromEntries(formData.entries())

  registerUser(userRegistrationDetails)

  })