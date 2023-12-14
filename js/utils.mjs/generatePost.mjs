function generatePostHtml(post, isAuthor = false) {
  const {title, body, media} = post;
  
  const postCard = document.createElement("div");
  postCard.className = "card mt-3";

  const postContain = document.createElement("div");
  postContain.className = "col d-flex justify-left mb-1";

  const postTitle = document.createElement("h2")
  postTitle.className = "mb-1";
  postTitle.textContent = title;

  const postBody = document.createElement("p")
  postBody.className = "mt-0 mb-1";
  postBody.textContent = body;

  const editButton = document.createElement("a")
  editButton.textContent = "Edit";
  editButton.addEventListener("click", () => {
    window.location.href = `edit/?id=${post.id}`;
  });

  postContain.appendChild(postTitle);
  postContain.appendChild(postBody);

  // if (isAuthor === true) {
    postContain.appendChild(editButton); 
  // }
  

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