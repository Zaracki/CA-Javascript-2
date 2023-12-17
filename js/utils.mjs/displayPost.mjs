import { displayErrorMessage } from "./displayError.mjs";
import { generatePostHtml } from "./generatePost.mjs";
import { getFromLocalStorage } from "./localStorage.mjs";

const postsContainer = document.querySelector("#posts-display");

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