const pokemonList = document.getElementById('pokemonList');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const maxRecords = 151;
const limit = 5;
let offset = 0;



function loadPokemonItens(offset, limit) {

    pokeApi.getPokemons(offset, limit).then((pokemons = []) =>{
    
        // Metodo simplificado
        const newHtml = pokemons.map((pokemon) =>`
            <li class="card ${pokemon.type}">
                <div class="poke-details">
                    <span class="poke-name">${pokemon.name}</span>
                    <span class="poke-number">#0${pokemon.number}</span>
                </div>
        
                <div class="poke-type">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src=" ${pokemon.photo}" class="poke-img" alt="${pokemon.name}">
                </div>
            </li>`
        ).join('');
        //Substituindo o HTML
        pokemonList.innerHTML += newHtml; 
    
    
        /*
        Metodo antigo simplificado
            const newList = pokemons.map((pokemon) => {
                return convertPokemonToLi(pokemon);
            })
            const newHtml = newList.join('');
    
            pokemonList.innerHTML = newHtml;
        */
        
        /*
        Metodo não simplificado
            const listItems = []
            for (let i = 0; i < pokemons.length; i++) {
                const pokemon = pokemons[i];
                listItems.push(convertPokemonToLi(pokemon));
            };
        */
    
    });
}


loadPokemonItens(offset, limit)

loadMoreBtn.addEventListener('click', () => {
    offset += limit

    const qntdRecordNextPage = offset + limit;

    if (qntdRecordNextPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset, newLimit)

        loadMoreBtn.parentElement.removeChild(loadMoreBtn)
    } else {
        
        loadPokemonItens(offset, limit)
    }


})

