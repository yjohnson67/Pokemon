//search bar redirect
document.addEventListener("DOMContentLoaded", function() {
    document.querySelector("#searchButton").addEventListener("click", function() {
        const pokemonName = document.querySelector("#pokemonSearch").value.toLowerCase();
        window.location.href = `details.html?name=${pokemonName}`;
    });
 });
  
 async function fetchPokemonDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const pokemonName = urlParams.get('name');  // Get the name from the query parameter
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
  
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
  
        const data = await response.json();
        displayPokemonData(data);
    } catch (error) {
        document.getElementById("specs").innerHTML = `Error: ${error.message}`;
    }
 }
  
 function displayPokemonData(data) {
    const specs = document.getElementById("specs");
    
    // Example of how to structure the data
    const pokemonInfo = `
        <h2>${data.name}</h2>
        <img src="${data.sprites.front_default}" alt="${data.name}"/>
        <p><strong>Height:</strong> ${data.height} decimeters</p>
        <p><strong>Weight:</strong> ${data.weight} hectograms</p>
        <p><strong>Types:</strong> ${data.types.map(type => type.type.name).join(', ')}</p>
    `;
    specs.innerHTML = pokemonInfo;
 }
  
 // Fetch the Pokémon data when the page loads
 window.onload = fetchPokemonDetails;