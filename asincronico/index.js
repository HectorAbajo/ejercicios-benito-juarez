
async function cardsDeApi() {
  try {
    // Realizar el fetch a la API
    const response = await fetch('https://rickandmortyapi.com/api/character');
    
    const data = await response.json();
    // console.log(data)

    const divContenedorCards = document.createElement('div');
    divContenedorCards.classList.add('divContenedorCards')
    document.body.appendChild(divContenedorCards);
    // Iterar sobre los resultados
    for (const result of data.results) {
      
    // Creo los nodos
      const divCard = document.createElement('div');

      const divImgCard = document.createElement('div');
      const imgElement = document.createElement('img');

      const divTituloCard = document.createElement('div');
      const tituloCard = document.createElement('h1');

      const divParrafoCard = document.createElement('div')
      const parrafoCard = document.createElement('p');
      
      //le asigno clases a los diferentes divs
      divCard.classList.add('divCard');
      divTituloCard.classList.add('divTituloCrad');
      divImgCard.classList.add('divImgCard');
      divParrafoCard.classList.add('divParrafoCard');
      tituloCard.classList.add('tituloCard');
      parrafoCard.classList.add('parrafo');
      divContenedorCards.appendChild(divCard);

      // le asigno el .name al h1
      const nombre = result.name;
      tituloCard.innerText = nombre;

      // le asigno el .species al p
      const especie = result.species;
      parrafoCard.innerText = especie;

      // Crear un nuevo elemento de imagen
      const imageUrl = result.image; 
      imgElement.src = imageUrl;
      
      // Agregar la imagen el nombre y la especie al contenedor div
      divCard.appendChild(divTituloCard);
      divTituloCard.appendChild(tituloCard);
      divCard.appendChild(divImgCard);
      divImgCard.append(imgElement);
      divCard.appendChild(divParrafoCard);
      divParrafoCard.appendChild(parrafoCard);
    }
  } catch (error) {
    console.error(error, "no se pudo resolver la peticion");
  }
}

cardsDeApi()