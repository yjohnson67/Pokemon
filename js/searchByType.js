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

  // Create a clickable link for each Pokémon name
  const link = document.createElement('a');
  link.href = `details.html?name=${name}`;  // Redirect to the details page
  link.textContent = name;
  link.classList.add('pokemon-name');  // Add class to style as text
  link.style.margin = "5px";
  link.style.cursor = "pointer";  // Change cursor to pointer to indicate it's clickable

  // Check if this Pokémon has been viewed before
  if (localStorage.getItem(name)) {
      link.classList.add('viewed');  // Add the 'viewed' class if it has been clicked before
  }

  // Add click event listener to mark as viewed
  link.addEventListener('click', () => {
      localStorage.setItem(name, 'viewed');  // Store in localStorage when clicked
      link.classList.add('viewed');  // Add 'viewed' class immediately
  });

  // Append the link to the nameElement and then to the list
  nameElement.appendChild(link);
  pokemonNamesDiv.appendChild(nameElement);
});

} catch (error) {
console.error('Error fetching Pokémon:', error);
const pokemonListDiv = document.getElementById('cards');
pokemonListDiv.innerHTML = '<p>Failed to load Pokémon data. Please try again later.</p>';
}
}
