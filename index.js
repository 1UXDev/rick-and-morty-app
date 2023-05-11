import { createCharacterCard} from "./components/card/card.js";
// import {SearchBar,SearchQuery} from "./components/search-bar/search-bar.js"
const cardContainer = document.querySelector('[data-js="card-container"]');
const button_prev = document.querySelector('[data-js="button_prev"]');
const search_bar__button = document.querySelector('[data-js="search_bar__button"]');
const button_next = document.querySelector('[data-js="button_next"]');
const searchBarContainer = document.querySelector('[data-js="search-bar-container"]');
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');


SearchBar();
let _navigate_number = Math.floor(Math.random() *100) + 1 ;
let page = 1;const maxPage = 20;


     button_prev.addEventListener("click",(event)=> {
    document.getElementById("button_prev").disabled = true;
    if(page !==1)
    {
        page =page-1;
        pagination.innerHTML =  page + "/20" ;
        _navigate_number =_navigate_number -1 ;
        createCharacterCard(_navigate_number,SearchQuery);
        document.getElementById("button_prev").disabled = false;
       
    }
    else
    {
        button_prev.setAttribute('class', 'button disabled');
        document.getElementById("button_prev").disabled = true;
    }

    
});
createCharacterCard(_navigate_number,SearchQuery);
button_next.addEventListener("click",(event)=> {
    document.getElementById("button_prev").disabled = false;

    
    if(page !==20)
    {
        page =page+1;
        pagination.innerHTML =  page + "/20" ;
        _navigate_number =_navigate_number + 1 ;
        createCharacterCard(_navigate_number,SearchQuery);
        document.getElementById("button_prev").disabled = false;
       
    }
    else
    {
        button_prev.setAttribute('class', 'button disabled');
        
    }

});


search_bar__button.addEventListener("submit",(event)=> {
  
  console.log("sam");
});


