export function addToLocalStorage(key, value) {
  localStorage.setItem(key, value);
}
/* NB! Add logic if you do not get data back */
export function getFromLocalStorage(key) {
  return localStorage.getItem(key);
};