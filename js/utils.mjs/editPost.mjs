import { makeRequest } from "../fetch.mjs";
import { POSTS_API_URL } from "../constants.mjs";
import { displayErrorMessage } from "./displayError.mjs";

const title = document.getElementById('postTitle');
const body = document.getElementById('postContent');
const PostForm = document.querySelector("#createPostForm");

/**
 * Retrieves the post ID from the URL query parameters.
 * @function getPostId
 * @returns {string|null} The current post ID, or null if not found.
 */

function getPostId() {
  const currentPostId = new URLSearchParams(window.location.search).get('id');
  return currentPostId;
}

/**
 * Submits the edited post data to the server.
 * Redirects to a specific page on successful edit or displays an error message.
 * @async
 * @function submitEditpost
 * @throws {Error} Throws an error if editing the post fails.
 */

export async function submitEditpost() {
  try {
    const postData = {
      title: title.value,
      body: body.value,
    };
    const id = getPostId();
    const myData = await makeRequest(
      `${POSTS_API_URL}/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(postData),
      },
      true,
    );
    if (myData.ok) {
      window.location.href = "../index.html";      
    } else {
      displayErrorMessage("Error editing post");
    }
  } catch {
    displayErrorMessage("Error editing post")
  }
}

PostForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  submitEditpost();
})

/**
 * Retrieves a single post data from the server using its ID.
 * @async
 * @function getSinglePost
 * @param {string} id - The ID of the post to retrieve.
 * @returns {Promise<Object|null>} The post data as an object, or null if not found or on error.
 * @throws {Error} Throws an error if fetching the post fails.
 */

async function getSinglePost(id) {
  try {
    const apiUrl = `${POSTS_API_URL}/${id}`;
    const currentPost = await makeRequest(apiUrl, { method: "GET" }, true);
    if (currentPost.ok) {
      const json = await currentPost.json();
      return json;
    } else {
      displayErrorMessage("Error displaying post")
    }
  } catch {
    displayErrorMessage("Error displaying post")
  }
}

/**
 * Populates the edit form with post data.
 * @function populateFormWithPostData
 * @param {Object} post - The post object containing title and body.
 */

function populateFormWithPostData(post) {
  title.value = post.title;
  body.value = post.body;
}

/**
 * Main function to execute on page load.
 * Retrieves the current post ID and populates the form with its data.
 * @async
 * @function main
 * @throws {Error} Throws an error if any part of the process fails.
 */

async function main() {
  try {
    const postId = getPostId();
    const post = await getSinglePost(postId);
    if (post) {
      populateFormWithPostData(post);
    } else {
      displayErrorMessage("Error editing post")
    }
  } catch {
    displayErrorMessage("Error editing post");
  }
}

main();