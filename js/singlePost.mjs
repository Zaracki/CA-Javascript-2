import { POSTS_API_URL } from "./constants.mjs";
import { makeRequest } from "./fetch.mjs";
import { displayErrorMessage } from "./utils.mjs/displayError.mjs";
import { generateSinglePostHtml } from "./utils.mjs/generateSinglePost.mjs";

const resultsContainer = document.querySelector("#postContainer");

/**
 * Extracts the post ID from the current URL's query parameters.
 *
 * @function getIdFromUrl
 * @returns {string|null} The post ID if present in the URL, otherwise null.
 */

function getIdFromUrl() {
  const searchParams = new URLSearchParams(window.location.search);
  const id = searchParams.get("id");
  if (id) {
    return id;
  }
  return null;
}

/**
 * Fetches a single post's data from the server using its ID.
 *
 * @async
 * @function getSinglePost
 * @param {string} id - The ID of the post to fetch.
 * @returns {Promise<Object|null>} The post data as an object if successful, null otherwise.
 * @throws {Error} Displays an error message if fetching the post fails.
 */

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

/**
 * Generates and displays the HTML for a single post.
 * Retrieves the post data based on the ID obtained from the URL and uses it to generate the HTML.
 *
 * @async
 * @function generateSinglePost
 * @throws {Error} Displays an error message if there are issues in retrieving or displaying the post.
 */

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

/**
 * Main function to be executed when the script loads.
 * Initiates the process of fetching and displaying a single post.
 *
 * @function main
 */

function main() {
  generateSinglePost();
}

main();