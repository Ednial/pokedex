import React from 'react';
import PokemonCard from './PokemonCard';

function PokemonsList({ pokemons }) {
	return (
		<div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
			{pokemons.map((pokemon) => (
				<PokemonCard key={pokemon.name} url={pokemon.url} />
			))}

			{pokemons.length === 0 && (
				<p className="text-center text-red-500">No pokemons found</p>
			)}
		</div>
	);
}

export default PokemonsList;
