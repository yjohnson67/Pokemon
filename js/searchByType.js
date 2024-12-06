async function fetchPokemonByType(typeId) {
   const url = `https://pokeapi.co/api/v2/type/${typeId}/`;

   try {
       // Fetch the type data from the API
       const response = await fetch(url);
       if (!response.ok) {
           throw new Error('Failed to fetch data');
       }
       const data = await response.json();

       // Extract Pokémon names from the data
       const pokemonNames = data.pokemon.map((entry) => entry.pokemon.name);

       // Display the Pokémon names in a flex container
       const pokemonListDiv = document.getElementById('cards');
       pokemonListDiv.innerHTML = `<h2>Pokémon of type ${data.name}:</h2>
           <div id="pokemonNames" style="display: flex; flex-wrap: wrap; gap: 10px;"></div>`;

       const pokemonNamesDiv = document.getElementById('pokemonNames');
       pokemonNames.forEach((name) => {
           const nameElement = document.createElement('p');
           nameElement.textContent = name;
           nameElement.style.margin = "5px";
           pokemonNamesDiv.appendChild(nameElement);
       });
   } catch (error) {
       console.error('Error fetching Pokémon:', error);
       const pokemonListDiv = document.getElementById('cards');
       pokemonListDiv.innerHTML = '<p>Failed to load Pokémon data. Please try again later.</p>';
   }
}