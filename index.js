let userSearched = false;
const ul = document.querySelector('[data-js="card-container"]');
const navigation = document.querySelector('[data-js="navigation"]');

// Nav Buttons
let page = 1;
const pagination = document.querySelector('[data-js="pagination"]');

// Generating Cards ------------------------------------------------------------------
export async function generateCards() {
  ul.innerHTML = "";
  const response = await fetch(
    `https://rickandmortyapi.com/api/character/?page=${page}`
  );
  const jsonData = await response.json();
  // creating the cards from each of the objects holding the characters
  for (let object of jsonData.results) {
    let li = document.createElement("li");
    li.classList.add("card");
    li.classList.add("animate");
    li.innerHTML = `
    <div class="card__image-container" data-js="card__image-container">
  <img
    class="card__image"
    src="${object.image}"
    alt="Picture of ${object.name}"
    data-js="card__image"
  />
  <div class="card__image-gradient"></div>
</div>
<div class="card__content">
  <h2 class="card__title" data-js="card__title">${object.name}</h2>
  <dl class="card__info" data-js="card__info">
    <dt class="card__info-title" >Status</dt>
    <dd class="card__info-description" data-js="card__info_status">${object.status}</dd>
    <dt class="card__info-title">Type</dt>
    <dd class="card__info-description" data-js="card__info_type">${object.type}</dd>
    <dt class="card__info-title">Occurrences</dt>
    <dd class="card__info-description" data-js="card__info_Occurrences">${object.episode.length}</dd>
  </dl>
</div>
    `;
    ul.append(li);
  }
}
generateCards();

// Navigation Buttons -----------------------------------------------------
let button_prev = document.getElementById("button_prev");
let button_next = document.getElementById("button_next");

async function buttonListenerGenerator() {
  if (userSearched == false) {
    // NEXT BUTTON
    button_next.addEventListener("click", (event) => {
      document.getElementById("button_prev").disabled = false;
      if (page !== 42) {
        page = page + 1;
        pagination.innerHTML = page + " / " + 42;
        document.getElementById("button_next").disabled = false;
      } else {
        button_prev.setAttribute("class", "button disabled");
        document.getElementById("button_next").disabled = true;
      }
      generateCards();
    });

    // PREV BUTTON
    button_prev.addEventListener("click", (e) => {
      document.getElementById("button_prev").disabled = true;
      e.preventDefault();
      if (page !== 1) {
        page = page - 1;
        pagination.innerHTML = page + " / " + 42;
        document.getElementById("button_prev").disabled = false;
      } else {
        button_prev.setAttribute("class", "button disabled");
        document.getElementById("button_prev").disabled = true;
      }
      generateCards();
    });
  } else {
    navigation.innerHTML = `
    <button
        class="button button--prev"
        data-js="button_prev"
        id="button_prev"
        pagination
        value="1"
      >
        previous
      </button>
      
      <span class="navigation__pagination" data-js="pagination">${page} / ${Math.ceil(
      ul.childNodes.length / 20
    )}</span>
      <button
        class="button button--next"
        data-js="button_next"
        id="button_next"
      >
        next
      </button>
      `;
    button_next = document.getElementById("button_next");
    button_prev = document.getElementById("button_prev");
    // Buttons WHEN USER SEARCHED SOMETHING
    // Next Button when user searched
    button_next.addEventListener("click", () => {
      console.log("im working");
      //    document.getElementById("button_prev").disabled = false;
      if (page >= ul.childNodes.length / 20) {
        button_next.disabled = true;
        button_next.classList.add("disabled");
      } else {
        page = page + 1;
        pagination.innerHTML =
          page + " / " + Math.ceil(ul.childNodes.length / 20);
        hideGeneratedCards();
      }
    });

    // Prev Button when user searched
    button_prev.addEventListener("click", () => {
      if (page > 1) {
        page = page - 1;
        pagination.innerHTML =
          page + " / " + Math.ceil(ul.childNodes.length / 20);
        hideGeneratedCards();
      } else {
        button_prev.setAttribute("class", "button disabled");
        document.getElementById("button_prev").disabled = true;
      }
    });
  }
}
buttonListenerGenerator();

// Search Bar -------------------------------------------------------------
let SearchQuery = "";

export function SearchBar() {
  const searchBarContainer = document.querySelector(
    '[data-js="search-bar-container"]'
  );
  const searchBarForm = document.querySelector(`[data-js="search-bar"]`);

  searchBarForm.addEventListener("submit", (e) => {
    e.preventDefault();
    SearchQuery = searchBarForm.firstChild.nextElementSibling.value;
    /* if (SearchQuery === "") {
      searchBarForm.classList.add("shake");
    } else { 
      searchBarForm.classList.remove("shake");*/
    generateSearchResults(SearchQuery);
    searchBarForm.firstChild.nextElementSibling.value = "";
    page = 1;
    userSearched = true;
    ul.focus();
  });

  // Code for Typeahead Nav
  /*   searchBarForm.addEventListener("input", (e) => {
    e.preventDefault();
    SearchQuery = searchBarForm.firstChild.nextElementSibling.value;
    return;
  }); */
}

SearchBar();

// Generating Search Results from the API by Looping through the pages -----------------
export async function generateSearchResults(value) {
  ul.innerHTML = "";
  searchResultCardCounter = 1;
  // looping through the 20 pages of the API
  for (let i = 1; i <= 20; i++) {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/?page=${i}`
    );
    const jsonData = await response.json();

    jsonData.results.forEach((object) => {
      if (object.name.toLowerCase().includes(value.toLowerCase())) {
        //console.log(object.name);
        generateSearchResultsCards(object);
      }
    });
  }
  countLiElements();
  hideGeneratedCards();
}

// Generate the Cards from the SearchResult -------------------------------------------
let searchResultCardCounter = 1;

function generateSearchResultsCards(card) {
  let li = document.createElement("li");
  li.classList.add("card");
  li.classList.add("animate");
  li.setAttribute("id", searchResultCardCounter);
  li.innerHTML = `
    <div class="card__image-container" data-js="card__image-container">
  <img
    class="card__image"
    src="${card.image}"
    alt="Picture of ${card.name}"
    data-js="card__image"
  />
  <div class="card__image-gradient"></div>
</div>
<div class="card__content">
  <h2 class="card__title" data-js="card__title">${card.name}</h2>
  <dl class="card__info" data-js="card__info">
    <dt class="card__info-title" >Status</dt>
    <dd class="card__info-description" data-js="card__info_status">${card.status}</dd>
    <dt class="card__info-title">Type</dt>
    <dd class="card__info-description" data-js="card__info_type">${card.type}</dd>
    <dt class="card__info-title">Occurrences</dt>
    <dd class="card__info-description" data-js="card__info_Occurrences">${card.episode.length}</dd>
  </dl>
</div>
    `;
  searchResultCardCounter++;
  ul.append(li);
}

//Hide all Cards that are more than 20 ------------------------------------------------
async function hideGeneratedCards() {
  let allGeneratedCards = document.getElementsByClassName("card");
  buttonListenerGenerator();

  if (page === 1) {
    for (let genCards of allGeneratedCards) {
      genCards.classList.remove("hidden");
      if (genCards.id > 20) {
        genCards.classList.add("hidden");
      }
    }
  } else if (page === 2) {
    console.log(page);
    for (let genCards of allGeneratedCards) {
      genCards.classList.remove("hidden");
      if (genCards.id >= 41 || genCards.id <= 20) {
        genCards.classList.add("hidden");
      }
    }
  } else if (page === 3) {
    console.log(page);
    for (let genCards of allGeneratedCards) {
      genCards.classList.remove("hidden");
      if (genCards.id >= 61 || genCards.id <= 40) {
        genCards.classList.add("hidden");
      }
    }
  }
}

// Get the number of LI Elements in the current document
async function countLiElements() {
  pagination.innerHTML = page + " / " + Math.ceil(ul.childNodes.length / 20);
  if (ul.childNodes.length <= 0) {
    ul.innerHTML = `
    <li class="card">
    <div class="card__content">
    <h2 class="card__title" data-js="card__title">404 - We did not find anything</h2>
    <p>Please reload  </p>
    <img src="https://staticdelivery.nexusmods.com/mods/1151/images/528-0-1447526230.png" width="250px">
    </div>
    </li>
    `;
  }
}
