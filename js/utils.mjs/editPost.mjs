import { makeRequest } from "../fetch.mjs";
import { POSTS_API_URL } from "../constants.mjs";

const title = document.getElementById('postTitle');
const body = document.getElementById('postContent');
const PostForm = document.querySelector("#createPostForm");

function getPostId() {
  const currentPostId = new URLSearchParams(window.location.search).get('id');
  return currentPostId;
}

export async function submitEditpost() {
  const postData = {
    title: title.value,
    body: body.value,
  };
  const id = getPostId();
  makeRequest(
    `${POSTS_API_URL}/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(postData),
    },
    true,
  );
}

PostForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  submitEditpost();
})

async function getSinglePost(id) {
  const apiUrl = `${POSTS_API_URL}/${id}`;
  const currentPost = await makeRequest(apiUrl, {method: "GET"}, true);
  return currentPost
}

function populateFormWithPostData(post) {
  title.value = post.title;
  body.value = post.body;
}

async function main () {
  const postId = getPostId();
  const post = await getSinglePost(postId);
  populateFormWithPostData(post);
}

main();