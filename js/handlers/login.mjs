import { apiCall } from "../fetch.mjs";
import { LOGIN_API_URL } from "../constants.mjs";

const form = document.querySelector("#loginForm");

async function loginUser(user) {
  const postBody = JSON.stringify(user);
  const myData = await apiCall(LOGIN_API_URL, { 
    method: "POST",
    body: postBody,
  }); 
  console.log(myData);
  console.log(postBody);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form)
  const userLoginDetails = Object.fromEntries(formData.entries())

  loginUser(userLoginDetails)

  })