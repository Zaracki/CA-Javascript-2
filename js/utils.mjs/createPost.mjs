import { makeRequest } from "../fetch.mjs";
import { POSTS_API_URL } from "../constants.mjs";
import { refreshFeed } from "../home-feed.mjs";
import { displayErrorMessage } from "./displayError.mjs";

/**
 * Handles the post submission event.
 * Processes the input data and sends a POST request to the server.
 * Refreshes the feed upon successful post creation or displays an error message otherwise.
 * 
 * @async
 * @function handlePostSubmit
 * @param {Event} event - The event object associated with the form submission.
 * @returns {Promise<void>} A promise that resolves when the post is successfully submitted or an error occurs.
 */

export async function handlePostSubmit(event) {
  event.preventDefault(); 

  const titleElement = document.getElementById('postTitle');
  const contentElement = document.getElementById('postContent');

  const title = titleElement.value;
  const content = contentElement.value; 

  const postData = {
    title: title,
    body: content

  };

  try {
    const myData = await makeRequest(POSTS_API_URL, {
      method: 'POST',
      body: JSON.stringify(postData)
    }, true);

    if (myData.ok) {
      titleElement.value = '';
      contentElement.value = '';

      refreshFeed();      
    } else {
      displayErrorMessage("Something went wrong creating the post")
    }
  } catch {
    displayErrorMessage("Error creating post");
  }
}

/**
 * Attaches a submit event listener to the post creation form.
 * The listener is attached once the DOM content is fully loaded.
 * 
 * @function attachPostSubmitListener
 */

export function attachPostSubmitListener() {
  document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('createPostForm');
    if (form) {
      form.addEventListener('submit', handlePostSubmit);
    }
  });
};