import { deletePost } from "./deletePost.mjs";

function generatePostHtml(post, isAuthor = false) {
  const {id, title, body, media, author} = post;
  
  const postCard = document.createElement("div");
  postCard.className = "card mt-3";

  const postContain = document.createElement("div");
  postContain.className = "col d-flex justify-left mb-1";

  const postTitle = document.createElement("h2")
  postTitle.className = "mb-1 text-break";
  postTitle.textContent = title;

  const postBody = document.createElement("p")
  postBody.className = "mt-0 mb-1 text-break";
  postBody.textContent = body;

  postContain.appendChild(postTitle);
  postContain.appendChild(postBody);

  if (isAuthor === true) {

    const editButton = document.createElement("a")
    editButton.textContent = "Edit";
    editButton.addEventListener("click", () => {
      window.location.href = `edit/?id=${post.id}`;
    });

    const deleteButton = document.createElement("a")
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      deletePost(id);
    });

    postContain.appendChild(editButton); 
    postContain.appendChild(deleteButton); 
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