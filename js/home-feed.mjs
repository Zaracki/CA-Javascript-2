import { POSTS_API_URL } from "./constants.mjs";
import { attachPostSubmitListener } from "./utils.mjs/createPost.mjs";
import { makeRequest } from "./fetch.mjs";
import { debounce } from "./utils.mjs/debounce.mjs";
import { displayLogin } from "./utils.mjs/displayLogin.mjs";
import { displayPosts } from "./utils.mjs/displayPost.mjs";
import { checkUserLoggedIn } from "./utils.mjs/isLoggedIn.mjs";
import { displayErrorMessage } from "./utils.mjs/displayError.mjs";


let postsArray = [];

export async function refreshFeed() {
  try {
    const isLoggedIn = checkUserLoggedIn();
    if (isLoggedIn) {
      const posts = await makeRequest(POSTS_API_URL + "?_author=true", { method: "GET" }, true);
      
      postsArray = posts;
      displayPosts(postsArray);
    } else {
      displayLogin();
    }
  } catch (error) {
    displayErrorMessage("An error has occured");
  }
}

//Sorting


const mySelectElement = document.getElementById('mySelect');
if (mySelectElement) {
    mySelectElement.addEventListener('change', function() {
    onSelected(this);
  });
};

function onSelected(selection) {
  let value = selection.value;
  if (value === 'Newest') {
    sortByNewest();
  } else if (value === 'Oldest') {
    sortByOldest();
  }
}

function sortByNewest() {
  postsArray.sort((a, b) => new Date(b.created) - new Date(a.created));
  displayPosts(postsArray);
}

function sortByOldest() {
  postsArray.sort((a, b) => new Date(a.created) - new Date(b.created));
  displayPosts(postsArray);
}


//Search
const searchInputElement = document.getElementById('searchInput');
if (searchInputElement) {
    searchInputElement.addEventListener('input', debounce(searchPosts, 1000));
}

function searchPosts() {
  const searchText = document.getElementById('searchInput').value.toLowerCase();
  const filteredPosts = postsArray.filter(post => post.title.toLowerCase().includes(searchText));
  displayPosts(filteredPosts);
}


attachPostSubmitListener();
refreshFeed();