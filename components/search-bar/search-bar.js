/* import { myFunction } from "../card/card.js";
console.log("running");
export let SearchQuery = "";

export function SearchBar() {
  const searchBarContainer = document.querySelector(
    '[data-js="search-bar-container"]'
  );
  const searchBarForm = document.querySelector(`[data-js="search-bar"]`);

  searchBarForm.addEventListener("submit", (e) => {
    e.preventDefault();
    SearchQuery = searchBarForm.firstChild.nextElementSibling.value;
    return;
  });

  searchBarForm.addEventListener("input", (e) => {
    e.preventDefault();
    SearchQuery = searchBarForm.firstChild.nextElementSibling.value;
    myFunction(SearchQuery);
    return;
  });
}
 */
