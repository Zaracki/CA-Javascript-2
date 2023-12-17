import { makeRequest } from "../fetch.mjs";
import { POSTS_API_URL } from "../constants.mjs";
import { refreshFeed } from "../home-feed.mjs";
import { displayErrorMessage } from "./displayError.mjs";

/**
 * Deletes a post by its ID and refreshes the feed.
 * If an error occurs during the deletion process, an error message is displayed.
 *
 * @async
 * @function deletePost
 * @param {string} id - The ID of the post to be deleted.
 * @returns {Promise<void>} A promise that resolves when the operation is complete.
 */
async function deletePost(id) {
  try {
    // Attempts to make a DELETE request to the server for the specified post ID.
    await makeRequest(`${POSTS_API_URL}/${id}`, { method: "DELETE" }, true);
    
    // Refreshes the feed to reflect the deletion.
    refreshFeed();
  } catch (error) {
    displayErrorMessage("Error when deleting your post");
  }
}

export { deletePost };