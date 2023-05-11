export async function createCharacterCard(_navigate_number = 22) {
    const cardContainer = document.querySelector('[data-js="card-container"]');
    const card__image = document.querySelector('[data-js="card__image"]');
    const card__title = document.querySelector('[data-js="card__title"]');
    const card__info_status = document.querySelector('[data-js="card__info_status"]');
    const card__info_type = document.querySelector('[data-js="card__info_type"]');
    const card__info_Occurrences = document.querySelector('[data-js="card__info_Occurrences"]');

   const response = await fetch("https://rickandmortyapi.com/api/character/"+ _navigate_number);
   const jsonData =  await response.json();
 
   card__title.innerHTML = jsonData.name
   card__info_status.innerHTML = jsonData.status
   card__info_type.innerHTML = jsonData.type
   card__info_Occurrences.innerHTML = jsonData.species


    card__image.setAttribute('src', 'https://rickandmortyapi.com/api/character/avatar/'+_navigate_number+'.jpeg');
    card__image.setAttribute('alt', 'Rick Sffsanchez');
    card__image.setAttribute('data-js', 'card__image');
    card__image.setAttribute('class', 'card__image');

}
