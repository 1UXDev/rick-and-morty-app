import { createCharacterCard } from "./components/card/card.js";
const cardContainer = document.querySelector('[data-js="card-container"]');
const button_prev = document.querySelector('[data-js="button_prev"]');
const button_next = document.querySelector('[data-js="button_next"]');

const searchBarContainer = document.querySelector('[data-js="search-bar-container"]');
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');



let _navigate_number = Math.floor(Math.random() * 1000) + 1 ;
let page = 1;
const searchQuery = "";
const maxPage = 20;

createCharacterCard(_navigate_number,page);
button_prev.addEventListener("click",(event)=> {
    page =page-1;
    pagination.innerHTML = page + "/20" ;
    _navigate_number =_navigate_number -1 ;
    createCharacterCard(_navigate_number);
    
    if(page ===1)
    {
    //button_prev.setAttribute('class', 'button disabled');
    document.getElementById("button_prev").disabled = true;
    _navigate_number =_navigate_number +1 ; 
    }

    
});
createCharacterCard(_navigate_number);
button_next.addEventListener("click",(event)=> {

   

    pagination.innerHTML = page + "/20" ;
    _navigate_number =_navigate_number +1 ;
    createCharacterCard(_navigate_number);
    page =page+1;
    if(maxPage === 20)
    {
    button_prev.setAttribute('class', 'button disabled');
    _navigate_number =_navigate_number -1 ;
    document.getElementById("button_prev").disabled = true;  
    }
});
// States



fetchCharacters ()
{
   const response = await fetch("https://rickandmortyapi.com/api/character/");
   
   const jsonData =  await response.json();
 
}
