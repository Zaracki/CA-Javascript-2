import { makeRequest } from "../fetch.mjs";
import { POSTS_API_URL } from "../constants.mjs";
import { refreshFeed } from "../home-feed.mjs";

async function deletePost(id) {
  // Display a confirmation dialog
  const isConfirmed = window.confirm("Are you sure you want to delete this post?");

  if (isConfirmed) {
    try {
      await makeRequest(`${POSTS_API_URL}/${id}`, { method: "DELETE" }, true);
      refreshFeed();
    } catch (error) {
      console.error("Failed to delete post", error);
      // Handle the error appropriately
    }
  } 
}

export { deletePost };