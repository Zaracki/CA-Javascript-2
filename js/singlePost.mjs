import { POSTS_API_URL } from "./constants.mjs";
import { makeRequest } from "./fetch.mjs";
import { generateSinglePostHtml } from "./utils.mjs/generateSinglePost.mjs";

const resultsContainer = document.querySelector("#postContainer");

function getIdFromUrl() {
  const searchParams = new URLSearchParams(window.location.search);
  const id = searchParams.get("id");
  if (id) {
    return id;
  }
  return null;
}

async function getSinglePost(id) {
  const data = await makeRequest(`${POSTS_API_URL}/${id}?_author=true`, {method: "GET"}, true);
  console.log(data)
  return data;
}

async function generateSinglePost() {
  const postId = getIdFromUrl();
  if (postId) {
   const post = await getSinglePost(postId); 
   const currentSinglePost = generateSinglePostHtml(post);
   resultsContainer.appendChild(currentSinglePost); 
  }
}

function main() {
  generateSinglePost();
}

main();