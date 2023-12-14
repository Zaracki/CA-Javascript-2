import { makeRequest } from "../fetch.mjs";
import { POSTS_API_URL } from "../constants.mjs";


export async function handlePostSubmit(event) {
  event.preventDefault(); 

  const titleElement = document.getElementById('postTitle');
  const contentElement = document.getElementById('postContent');

  const title = titleElement.value;
  const content = contentElement.value; 

  const postData = {
    title: title,
    body: content

  };

  try {
    const response = await makeRequest(POSTS_API_URL, {
      method: 'POST',
      body: JSON.stringify(postData)
    }, true);

    console.log(response); 

    titleElement.value = '';
    contentElement.value = '';


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