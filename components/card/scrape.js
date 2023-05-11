async function myFunction() {
    let dataBase = [];
  
    for (i = 1; i <= 1000; i++) {
      console.log([i]);
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/${[i]}`
      );
      const jsonData = await response.json();
  
      dataBase.push(i, jsonData.name);
    }
  
   // console.log(dataBase);
  }
  
  myFunction();