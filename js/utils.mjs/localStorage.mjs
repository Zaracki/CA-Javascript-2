export function addToLocalStorage(key, value) {
  localStorage.setItem(key, value);
}
/* NB! Add logic */
export function getFromLocalStorage(key) {
  return localStorage.getItem(key);
};