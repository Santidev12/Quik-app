import { component$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemon/pokemon-image';
import { usePokemonGame } from '~/hooks/use-pokemon-game';


export const usePokemonId = routeLoader$<number>(({ params, redirect }) => {

    const id = Number(params.id);
    if(isNaN(id)) throw redirect(301, '/');
    if( id <= 0) throw redirect(301, '/');
    if( id > 1000) throw redirect(301, '/');
    
    return id;
})

export default component$(() => {

    const pokemonId = usePokemonId();
    const {
        isPokemonVisible,
        showBackImage,
        toogleFromBack,
        toogleVisible
    } = usePokemonGame();  
    return(
        <>
        {/* <span>Pokemon: {location.params.id}</span> */}
        <span class="text-5xl">Pokemon: {pokemonId}</span>
        <PokemonImage
            id={pokemonId.value}
            isVisible={isPokemonVisible.value}
            backImage={showBackImage.value}
        />
        <div class="flex mt-3">
        <button onClick$={toogleVisible} class="btn btn-primary mr-2">Revelar</button>
        <button onClick$={toogleFromBack} class="btn btn-primary mr-2">Voltear</button>
        </div>
        </>
    )
});