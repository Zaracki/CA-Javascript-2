import { POSTS_API_URL } from "./constants.mjs";
import { makeRequest } from "./fetch.mjs";

function getIdFromUrl() {
  const searchParams = new URLSearchParams(window.location.search);
  const id = searchParams.get("id");
  if (id) {
    return id;
  }
  return null;
}

function generateSinglePostHtml(post) {
  
}

async function getSinglePost(id) {
  const data = await makeRequest(`${POSTS_API_URL}/${id}?_author=true`, {method: "GET"}, true);
  console.log(data)
}

async function generateSinglePost() {
  const postId = getIdFromUrl();
  if (postId) {
   const post = await getSinglePost(postId); 
   generateSinglePostHtml(post);
  }
}

function main() {
  generateSinglePost();
}

main();