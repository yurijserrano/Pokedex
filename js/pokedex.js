/**
 * Fetch Data from Pokemon API
 *
 * @author Yuri Serrano <yurijserrano@gmail.com>
 */

const pokemonContainer = document.getElementById('poke_container');
const pokemonNumber = 156;
const pokemonColors = {
	fire: '#FDDFDF',
	grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
};
const main_types = Object.keys(pokemonColors);

/**
 * Fetch all pokemons
 *
 * @function fetchPokemons
 */
const fetchPokemons = async () => {
	for (let i = 1; i <= pokemonNumber; i++) {
		await getPokemon(i);
	}
};

/**
 * Return each pokemon based on your id
 *
 * @function getPokemon
 * @param {number} id - pokemon id
 */
const getPokemon = async id => {
	const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
	const res = await fetch(url);
    const pokemon = await res.json();
    console.log(typeof(pokemon));
	createPokemonCard(pokemon);
};

/**
 * Create the card for the pokemon
 *
 * @function createPokemonCard
 * @param {object} pokemon
 */
function createPokemonCard(pokemon) {
	const pokemonEl = document.createElement('div');
	pokemonEl.classList.add('pokemon');

	const poke_types = pokemon.types.map(type => type.type.name);
	const type = main_types.find(type => poke_types.indexOf(type) > -1);
	const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
	const color = pokemonColors[type];

	pokemonEl.style.backgroundColor = color;

	const pokeInnerHTML = `
        <div class="img-container">
            <img src="https://pokeres.bastionbot.org/images/pokemon/${
							pokemon.id
						}.png" alt="${name}" />
        </div>
        <div class="info">
            <span class="number">#${pokemon.id
							.toString()
							.padStart(3, '0')}</span>
            <h3 class="name">${name}</h3>
            <small class="type">Type: <span>${type}</span></small>
        </div>
    `;

	pokemonEl.innerHTML = pokeInnerHTML;

	pokemonContainer.appendChild(pokemonEl);
}

fetchPokemons();



// SOCIAL PANEL JS
const floating_btn = document.querySelector('.floating-btn');
const close_btn = document.querySelector('.close-btn');
const social_panel_container = document.querySelector('.social-panel-container');

floating_btn.addEventListener('click', () => {
	social_panel_container.classList.toggle('visible')
});

close_btn.addEventListener('click', () => {
	social_panel_container.classList.remove('visible')
});