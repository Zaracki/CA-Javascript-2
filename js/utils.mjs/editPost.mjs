import { makeRequest } from "../fetch.mjs";
import { POSTS_API_URL } from "../constants.mjs";
import { displayErrorMessage } from "./displayError.mjs";

const title = document.getElementById('postTitle');
const body = document.getElementById('postContent');
const PostForm = document.querySelector("#createPostForm");

function getPostId() {
  const currentPostId = new URLSearchParams(window.location.search).get('id');
  return currentPostId;
}

export async function submitEditpost() {
  try {
    const postData = {
      title: title.value,
      body: body.value,
    };
    const id = getPostId();
    await makeRequest(
      `${POSTS_API_URL}/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(postData),
      },
      true,
    );
    window.location.href = "../index.html";
  } catch {
    displayErrorMessage("Error editing post")
  }
}

PostForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  submitEditpost();
})

async function getSinglePost(id) {
  try {
    const apiUrl = `${POSTS_API_URL}/${id}`;
    const currentPost = await makeRequest(apiUrl, { method: "GET" }, true);
    return currentPost;
  } catch {
    displayErrorMessage("Error fetching post")
  }
}

function populateFormWithPostData(post) {
  title.value = post.title;
  body.value = post.body;
}

async function main() {
  try {
    const postId = getPostId();
    const post = await getSinglePost(postId);
    if (post) {
      populateFormWithPostData(post);
    } else {
      // Handle the case where post is undefined or null
    }
  } catch {
    displayErrorMessage("Error editing post");
  }
}

main();