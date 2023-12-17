import { POSTS_API_URL } from "./constants.mjs";
import { makeRequest } from "./fetch.mjs";
import { displayErrorMessage } from "./utils.mjs/displayError.mjs";
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
  try {
    const data = await makeRequest(`${POSTS_API_URL}/${id}?_author=true`, { method: "GET" }, true);
    if (data.ok){
      return await data.json();     
    } else {
      displayErrorMessage("Error fetching single post")
    }
  } catch {
    displayErrorMessage("Error fetching single post")
    return null;
  }
}

async function generateSinglePost() {
  try {
    const postId = getIdFromUrl();
    if (postId) {
      const post = await getSinglePost(postId);
      if (post) {
        const currentSinglePost = generateSinglePostHtml(post);
        resultsContainer.appendChild(currentSinglePost);
      } else {
        displayErrorMessage("Error retriving post")
      }
    }
  } catch {
    displayErrorMessage("Error retriving post")
  }
}

function main() {
  generateSinglePost();
}

main();