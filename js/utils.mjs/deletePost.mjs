import { makeRequest } from "../fetch.mjs";
import { POSTS_API_URL } from "../constants.mjs";
import { refreshFeed } from "../home-feed.mjs";

async function deletePost (id) {
  await makeRequest(`${POSTS_API_URL}/${id}`, { method: "DELETE"
}, true)
  refreshFeed();
}

export { deletePost };