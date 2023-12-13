import { makeRequest } from "../fetch.mjs";
import { POSTS_API_URL } from "../constants.mjs";


export async function handlePostSubmit(event) {
  event.preventDefault(); 

  const title = document.getElementById('postTitle').value;
  const content = document.getElementById('postContent').value;

  const postData = {
    title: title,
    body: content

  };

  try {
    const response = await makeRequest(POSTS_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    }, true);

    console.log(response); 
  } catch (error) {
    console.error('Error creating post:', error);
 
  }
}

export function attachPostSubmitListener() {
  document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('createPostForm');
    if (form) {
      form.addEventListener('submit', handlePostSubmit);
    }
  });
};