import { deletePost } from "./deletePost.mjs";

/**
 * Generates HTML content for a given post.
 * Creates a card-like element containing the post's title, body, and media (if available).
 * If the user is the author of the post, edit and delete buttons are added.
 *
 * @function generatePostHtml
 * @param {Object} post - The post object containing details like id, title, body, and media.
 * @param {boolean} [isAuthor=false] - Flag indicating whether the current user is the author of the post.
 * @returns {HTMLElement} The DOM element representing the post.
 */

function generatePostHtml(post, isAuthor = false) {
  const {id, title, body, media} = post;

  const postCard = document.createElement("div");
  postCard.className = "card mt-3";

  const postContain = document.createElement("div");
  postContain.className = "col d-flex justify-left mb-1";

  const postLink = document.createElement("a");
  postLink.href = `post/?id=${post.id}`;

  const postTitle = document.createElement("h2")
  postTitle.className = "mb-1 text-break";
  postTitle.textContent = title;

  const postBody = document.createElement("p")
  postBody.className = "mt-0 mb-2 text-break";
  postBody.textContent = body;

  postLink.appendChild(postTitle);
  postContain.appendChild(postLink);
  postContain.appendChild(postBody);

  if (isAuthor === true) {

    const buttonDiv = document.createElement("div");

    const editButton = document.createElement("a")
    editButton.textContent = "Edit";
    editButton.className = "edit-post mr-1"
    editButton.addEventListener("click", () => {
      window.location.href = `edit/?id=${post.id}`;
    });

    const deleteButton = document.createElement("a")
    deleteButton.className = "delete-post"
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      deletePost(id);
    });

    buttonDiv.appendChild(editButton); 
    buttonDiv.appendChild(deleteButton);
    postContain.appendChild(buttonDiv);
  }
  

  const image = document.createElement("img")
  if (media) {
    image.src = media;
    image.className = "user-post-img";
    postContain.appendChild(image);
  }

  postCard.appendChild(postContain);

  return postCard;
};

export {generatePostHtml};