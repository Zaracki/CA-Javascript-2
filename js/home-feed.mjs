import { POSTS_API_URL } from "./constants.mjs";
import { makeRequest } from "./fetch.mjs";
import { displayLogin } from "./utils.mjs/displayLogin.mjs";
import { displayPosts } from "./utils.mjs/displayPost.mjs";
import { checkUserLoggedIn } from "./utils.mjs/isLoggedIn.mjs";

async function main() {
  const isLoggedIn = checkUserLoggedIn();
  if (isLoggedIn) {
    const posts = await makeRequest(POSTS_API_URL, { method: "GET" }, true);
    displayPosts(posts);
  } else {
    displayLogin();
  }
}

main();