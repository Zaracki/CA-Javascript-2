/**
 * Stores a value in the local storage under a specified key.
 * 
 * @function addToLocalStorage
 * @param {string} key - The key under which the value will be stored.
 * @param {string} value - The value to be stored.
 */

export function addToLocalStorage(key, value) {
  localStorage.setItem(key, value);
}

/**
 * Retrieves a value from the local storage by its key.
 * Returns null if the key does not exist.
 * 
 * @function getFromLocalStorage
 * @param {string} key - The key of the value to be retrieved.
 * @returns {string|null} The value from local storage if it exists, or null if it doesn't.
 */

export function getFromLocalStorage(key) {
  return localStorage.getItem(key);
};