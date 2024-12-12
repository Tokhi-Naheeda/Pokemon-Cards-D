
const buttonElement=document.querySelector('button');
const warning = document.getElementById('warning');
const pokemonResult = document.getElementById('pokemon-container');
pokemonResult.style.display='none'
buttonElement.addEventListener('click', async()=>{
    const inputElement=document.querySelector('input').value.trim();
    const url="https://pokeapi.co/api/v2/pokemon";

    warning.textContent = '';
    pokemonResult.innerHTML = '';


    if(inputElement===''){
        warning.textContent='Please enter a Pokemon name';
        pokemonResult.style.display='none'
        return;
    }
    try{
        const response=await fetch(`${url}/${inputElement.toLowerCase()}`);
        if (!response.ok) {
            throw new Error('Pokémon not found');
        }
        const pokemon=await response.json();
        console.log(pokemon);
        pokemonResult.style.display='block';
        pokemonResult.innerHTML=`
      <h2>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
            <h3><span class="highlight">Stats</span></h3>
            <div>
                ${pokemon.stats.map(stat => ` <p>${stat.stat.name}: ${stat.base_stat}</p>`).join('')}
            </div>
            <h3><span class="highlight">Abilities</span></h3>
            <div>
                ${pokemon.abilities.map(ability => `<p>${ability.ability.name}</p>`).join('')}
            </div>
    `;
    }catch(err){
        warning.innerText=`Error: Pokemon not found`;

    }
});
    