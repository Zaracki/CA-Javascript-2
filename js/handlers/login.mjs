import { makeRequest } from "../fetch.mjs";
import { LOGIN_API_URL, POSTS_API_URL } from "../constants.mjs";
import { addToLocalStorage } from "../utils.mjs/localStorage.mjs";

const form = document.querySelector("#loginForm");


async function displayPosts() {
  const posts = await makeRequest(POSTS_API_URL, {method: "GET"}, true);
  console.log(posts);
}


async function loginUser(user) {
  const postBody = JSON.stringify(user);
  const myData = await makeRequest(LOGIN_API_URL, { 
    method: "POST",
    body: postBody,
  },
  false
  );
  const token = myData.accessToken;
  addToLocalStorage("accessToken", token);
};

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form)
  const userLoginDetails = Object.fromEntries(formData.entries())

  await loginUser(userLoginDetails)
  displayPosts();
  });