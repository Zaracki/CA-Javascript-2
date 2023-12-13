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

    const respons = await fetch(url, fetchOptions);

      if (!respons.ok) {
        throw new Error("API call unsuccessful");
      }

    const json = await respons.json();
    return json;
  } catch (error) {
    console.error("Something went wrong..")
  }
}

