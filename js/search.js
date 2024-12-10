// Redirects to the homepage
document.getElementById("siteTitle").addEventListener("click", function() {
    window.location.href = "index.html";
});
 
//Display Search Results  
 async function fetchPokemonDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const pokemonName = urlParams.get('name');  // Get the name from the query parameter
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
 
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Pokémon not found. Please check the spelling.');
        }
 
        const data = await response.json();
        displayPokemonData(data);
    } catch (error) {
        document.getElementById("specs").innerHTML = `<p>${error.message}</p>`;
    }
 }
 
 function displayPokemonData(data) {
    const specs = document.getElementById("specs");
 
    const pokemonInfo = `
    <div id="spec1">
        <h2>${data.name}</h2>
        <img src="${data.sprites.front_default}" alt="${data.name}"/>
        <p><strong>Height:</strong> ${data.height} decimeters</p>
        <p><strong>Weight:</strong> ${data.weight} hectograms</p>
        <p><strong>Types:</strong> ${data.types.map(type => type.type.name).join(', ')}</p>
    </div>
 
    <div id="spec2">
        <p><strong>Abilities:</strong> ${data.abilities.map(ability => ability.ability.name).join(', ')}</p>
        <p><strong>Stats:</strong></p>
            <ul>
                ${data.stats.map(stat => `<li>${stat.stat.name}: ${stat.base_stat}</li>`).join('')}
            </ul>
        <p><strong>Moves:</strong></p>
            <ul>
                ${data.moves.slice(0, 10).map(move => `<li>${move.move.name}</li>`).join('')}
            </ul>
    </div>
 
    <div id="spec3">
        <p><strong>Front Sprite:</strong> <br> <img src="${data.sprites.front_default}" alt="${data.name} front"/></p>
        <p><strong>Back Sprite:</strong> <br> <img src="${data.sprites.back_default}" alt="${data.name} back"/></p>
    </div>
 
    <div id="spec4">
        <p><strong>Front Shiny Sprite:</strong> <br> <img src="${data.sprites.front_shiny}" alt="${data.name} shiny front"/></p>
        <p><strong>Back Shiny Sprite:</strong> <br> <img src="${data.sprites.back_shiny}" alt="${data.name} shiny back"/></p>
    </div>
    `;
    specs.innerHTML = pokemonInfo;
 }
 
 // Fetch the Pokémon data when the page loads
 window.onload = fetchPokemonDetails;
