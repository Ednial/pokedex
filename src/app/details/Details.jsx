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
			<section className="max-w-5xl mx-auto px-4">
				<h1 className="text-6xl font-bold bg-gradient-to-b from-red-500 to-white text-transparent bg-clip-text mb-4 flex justify-center items-center">
					{pokemon.name}
				</h1>
				<p className="text-center mt-4 text-gray-400 ">
					Number of pokemon:{' '}
					<span className="text-black text-base font-semibold">
						{pokemon.id}
					</span>
				</p>
				<div className="grid grid-cols-2 gap-4 mt-4 border-b-3 border-gray-200 pt-4">
					<p className="text-center mt-4 text-gray-400 ">
						Height:{' '}
						<span className="text-black text-base font-semibold">
							{pokemon.height}
						</span>
					</p>
					<p className="text-center mt-4 text-gray-400 ">
						Weight:{' '}
						<span className="text-black text-base font-semibold">
							{pokemon.weight}
						</span>
					</p>
				</div>
			</section>
			<section className="max-w-5xl mx-auto px-4 mt-4">
				<h2 className="text-3xl font-bold text-center mb-4">Stats</h2>
				<div className="grid grid-cols-2 gap-4 border-b-3 border-gray-200 pt-4">
					{pokemon.stats.map((stat) => (
						<div key={stat.stat.name} className="text-center">
							<p className="text-gray-400">{stat.stat.name}</p>
							<p className="text-black font-semibold">{stat.base_stat}</p>
						</div>
					))}
				</div>
			</section>
			<section className="max-w-5xl mx-auto px-4 mt-4">
				<h2 className="text-3xl font-bold text-center mb-4">Abilities</h2>
				<div className="grid grid-cols-2 gap-4 border-b-3 border-gray-200 pt-4">
					{pokemon.abilities.map((ability) => (
						<div key={ability.ability.name} className="text-center">
							<p className="text-gray-400">{ability.ability.name}</p>
						</div>
					))}
				</div>
			</section>
		</div>
	);
}

export default Details;
