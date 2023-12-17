import { displayErrorMessage } from "./displayError.mjs";
import { generatePostHtml } from "./generatePost.mjs";
import { getFromLocalStorage } from "./localStorage.mjs";

const postsContainer = document.querySelector("#posts-display");

/**
 * Displays a list of posts in the specified container.
 * Each post is processed to generate HTML content, which is then appended to the container.
 * If the user is the author of a post, additional options is applied.
 * 
 * @async
 * @function displayPosts
 * @param {Array} posts - An array of post objects to be displayed.
 * @throws {Error} Throws an error if there is a problem in displaying posts.
 */

async function displayPosts(posts) {
  try {
    if (postsContainer) {
      postsContainer.textContent = "";
      const username = getFromLocalStorage("username");
      posts.forEach(post => {
        const isAuthor = username === post.author.name;
        const currentPost = generatePostHtml(post, isAuthor);
        postsContainer.appendChild(currentPost);
      });
    }
  } catch {
    displayErrorMessage("Error displaying post")
  }
}

export {displayPosts};