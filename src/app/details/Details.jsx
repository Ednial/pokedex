import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';

function Details() {
	const params = useParams();
	const [pokemon, setPokemon] = useState({});

	useEffect(() => {
		if (params.name) {
			axios
				.get(`https://pokeapi.co/api/v2/pokemon/${params.name}`)
				.then((response) => {
					setPokemon(response.data);
				})
				.catch((error) => console.error(error));
		}
	}, [params.name]);

	if (!pokemon.name) return null;

	return (
		<div>
			<div
				className={`w-full h-[600px] type-bg--${pokemon.types[0].type.name} flex items-center justify-center`}
			>
				<img
					src={pokemon.sprites?.other?.['official-artwork'].front_default}
					alt={pokemon.name}
					className="size-4/5 object-contain"
				></img>
			</div>
			<section
				className={`max-w-5xl mx-auto px-4 border type-border--${pokemon.types[0].type.name}`}
			>
				<h1 className="text-6xl font-bold bg-gradient-to-b from-red-500 to-white text-transparent bg-clip-text mb-4 flex justify-center items-center">
					{pokemon.name}
				</h1>
				<p className="text-center mt-4 ">NUMBER OF POKEMON: {pokemon.id}</p>
				<p className="text-center mt-4 ">HEIGHT: {pokemon.height}</p>
				<p className="text-center mt-4 ">WEIGHT: {pokemon.weight}</p>
			</section>
		</div>
	);
}

export default Details;
