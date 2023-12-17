import { deletePost } from "./deletePost.mjs";

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