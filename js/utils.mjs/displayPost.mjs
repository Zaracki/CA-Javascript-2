import { generatePostHtml } from "./generatePost.mjs";

const postsContainer = document.querySelector("#posts-display");



async function displayPosts(posts) {
  console.log(posts);
  postsContainer.textContent = "";
  posts.forEach(post => {
    const currentPost = generatePostHtml(post);
    postsContainer.appendChild(currentPost); 
  });

}

export {displayPosts};