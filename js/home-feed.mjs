import { POSTS_API_URL } from "./constants.mjs";
import { attachPostSubmitListener } from "./utils.mjs/createPost.mjs";
import { makeRequest } from "./fetch.mjs";
import { debounce } from "./utils.mjs/debounce.mjs";
import { displayLogin } from "./utils.mjs/displayLogin.mjs";
import { displayPosts } from "./utils.mjs/displayPost.mjs";
import { checkUserLoggedIn } from "./utils.mjs/isLoggedIn.mjs";
import { displayErrorMessage } from "./utils.mjs/displayError.mjs";


let postsArray = [];

/**
 * Refreshes the feed by loading posts if the user is logged in.
 * Displays login screen otherwise.
 * @async
 * @function
 * @returns {Promise<void>} A promise that resolves when the feed is refreshed.
 * @throws {Error} Throws an error if the request fails or if an error occurs in displaying posts.
 */

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

/**
 * Handles the selection change event on sorting dropdown.
 * @param {HTMLSelectElement} selection The dropdown select element.
 */

function onSelected(selection) {
  let value = selection.value;
  if (value === 'Newest') {
    sortByNewest();
  } else if (value === 'Oldest') {
    sortByOldest();
  }
}

/**
 * Sorts the posts array by the newest posts.
 */

function sortByNewest() {
  postsArray.sort((a, b) => new Date(b.created) - new Date(a.created));
  displayPosts(postsArray);
}

/**
 * Sorts the posts array by the oldest posts.
 */

function sortByOldest() {
  postsArray.sort((a, b) => new Date(a.created) - new Date(b.created));
  displayPosts(postsArray);
}


//Search
const searchInputElement = document.getElementById('searchInput');
if (searchInputElement) {
    searchInputElement.addEventListener('input', debounce(searchPosts, 1000));
}

/**
 * Filters posts based on the search input.
 */

function searchPosts() {
  try {
    const searchText = document.getElementById('searchInput').value.toLowerCase();
    const filteredPosts = postsArray.filter(post => post.title.toLowerCase().includes(searchText));
    displayPosts(filteredPosts);
  } catch (error) {
    displayErrorMessage("Error occurred during search.");
  }
}

attachPostSubmitListener();
refreshFeed();