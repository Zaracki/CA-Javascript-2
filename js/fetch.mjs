import { getFromLocalStorage } from "./utils.mjs/localStorage.mjs";

/**
 * Makes an HTTP request to a specified URL using the Fetch API.
 * Allows customization of request options and can optionally include authorization headers.
 *
 * @async
 * @function makeRequest
 * @param {string} url - The URL to which the request is sent.
 * @param {Object} [options={ method: "POST" }] - Optional settings for the request, like method, body, etc.
 * @param {boolean} [shouldUseAuth=false] - Indicates whether to include an authorization header with an access token.
 * @returns {Promise<Response>} A promise that resolves with the response of the fetch request.
 * @throws {Error} Propagates any errors that occur during the request.
 */

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
    throw error;
  }
}

