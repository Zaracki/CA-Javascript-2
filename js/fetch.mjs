import { getFromLocalStorage } from "./utils.mjs/localStorage.mjs";

export async function makeRequest(
  url, 
  options = {method: "POST"},
  shouldUseAuth = false,
  ) {
  try {
    let fetchOptions = {
      ...options, 
      headers: {  'Content-Type': 'application/json' },
    };

    if (shouldUseAuth) {
      const accessToken = getFromLocalStorage("accessToken");
      fetchOptions.headers = {
        ...fetchOptions.headers,
        Authorization: `Bearer ${accessToken}`, 
        };
      }

    return await fetch(url, fetchOptions);
  } catch (error) {
    console.error("Something went wrong..")
  }
}

