import { $, component$, useContext, useOnDocument, useTask$ } from '@builder.io/qwik';
import { DocumentHead, } from '@builder.io/qwik-city';

import { PokemonImage } from '~/components/pokemon/pokemon-image';
import { PokemonListContext } from '~/context/pokemon/pokemon-list.context';
import { getSmallPokemons } from '~/helpers/get-small-pokemons';


export default component$(() => {

  const pokemonList = useContext(PokemonListContext)


  useTask$(async({ track }) => {

    track( () => pokemonList.currentPage)

    pokemonList.isLoading = true;

    const pokemons = await getSmallPokemons(pokemonList.currentPage * 10, 30);
    pokemonList.pokemons = [...pokemonList.pokemons, ...pokemons]

    pokemonList.isLoading = false;

  })

  useOnDocument('scroll', $(() => {
    const maxScroll = document.body.scrollHeight;
    const currentScroll = window.scrollY + window.innerHeight

    if((currentScroll + 200) >= maxScroll &&  !pokemonList.isLoading){
      pokemonList.isLoading = true;
      pokemonList.currentPage++;
    }
  }))
  
    return(
      <>
      <div class="flex flex-col">
        <span class="my-5 text-5xl">Status</span>
        <span>Pagina Actual: {pokemonList.currentPage}</span>
        <span >Esta cargando: </span>
        </div> 

        <div class="mt-10">
        <button 
        class="btn btn-primary mr-2"
        onClick$={() => pokemonList.currentPage--}
        >
            Anterior
          </button>

          <button
        onClick$={() => pokemonList.currentPage++}

           class="btn btn-primary mr-2"
           >
            Siguiente
          </button>
        </div>

        <div class="grid sm:grid-cols-2 md:grid-cols-5 xl:grid-cols-7 mt-5">

          {pokemonList.pokemons.map(({name, id}) => (
              <div key={name} class="m-5 flex flex-col justify-content items-center">
                <PokemonImage id={id}/> 
                <span class="capitalize">{name}</span>
                </div>
            ))
          }
          
        </div>
      </> 
    )
});

export const head: DocumentHead = {
    title: "Client List",
    meta: [
      {
        name: "description",
        content: "My first app in Qwik",
      },
    ],
  };