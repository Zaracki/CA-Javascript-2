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

const resultsContainer = document.querySelector("#postContainer");

function generateSinglePostHtml(post) {
  const {title, body, media} = post;

  const postCard = document.createElement("div");
  postCard.className = "card mt-3";

  const postContain = document.createElement("div");
  postContain.className = "col d-flex justify-left mb-1";

  const postTitle = document.createElement("h2")
  postTitle.className = "mb-1 text-break";
  postTitle.textContent = title;

  const postBody = document.createElement("p")
  postBody.className = "mt-0 mb-1 text-break";
  postBody.textContent = body;

  postContain.appendChild(postTitle);
  postContain.appendChild(postBody);
  
  const image = document.createElement("img")
  if (media) {
    image.src = media;
    image.className = "user-post-img";
    postContain.appendChild(image);
  }

  postCard.appendChild(postContain);

  return postCard;
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