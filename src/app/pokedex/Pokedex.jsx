import { use, useEffect, useState } from 'react';
import axios from 'axios';
import { useName } from '../../contexts/nameContext';
import PokemonsList from './components/PokemonsList';
import PokemonCard from './components/PokemonCard';

const baseUrl = 'https://pokeapi.co/api/v2/pokemon';

function Pokedex() {
	const [state] = useName();
	const [pokemons, setPokemons] = useState([]);
	const [singlePokemon, setSinglePokemon] = useState(null);
	const [types, setTypes] = useState([]);
	const [filteredPokemons, setFilteredPokemons] = useState([]);
	const [search, setSearch] = useState('');
	const [selectedType, setSelectedType] = useState('');

	const getPokemons = async () => {
		axios
			.get(baseUrl + '?limit=150')
			.then((response) => {
				setPokemons(response.data.results);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	useEffect(() => {
		getPokemons();
	}, []);

	useEffect(() => {
		axios
			.get('https://pokeapi.co/api/v2/type?limit=21')
			.then((response) => {
				setTypes(response.data.results);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	useEffect(() => {
		if (selectedType === 'all') {
			setFilteredPokemons(pokemons);
			setSinglePokemon(null);
			return;
		}
		if (selectedType) {
			axios
				.get('https://pokeapi.co/api/v2/type/' + selectedType)
				.then((response) => {
					setFilteredPokemons(response.data.pokemon.map((p) => p.pokemon));
					setSinglePokemon(null);
				})
				.catch((error) => {
					console.error(error);
				});
		}
	}, [selectedType]);

	useEffect(() => {
		if (!search) {
			setFilteredPokemons(pokemons);
			setSinglePokemon(null);
			return;
		}
		setFilteredPokemons(
			pokemons.filter((pokemon) =>
				pokemon.name.toLowerCase().includes(search.toLowerCase()),
			),
		);
	}, [search, pokemons]);

	const searchPokemons = () => {
		if (!search) {
			setFilteredPokemons(pokemons);
			setSinglePokemon(null);
			return;
		}
		axios
			.get(baseUrl + '/' + search.toLowerCase())
			.then((response) => {
				setSinglePokemon(baseUrl + '/' + response.data.name);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	// return (
	// 	<div>
	// 		<div className="max-w-5xl mx-auto px-4">
	// 			<h1 className="text-4xl text-center mt-4 text-red-500">
	// 				Welcome {state.name}!
	// 			</h1>
	// 			<h2 className="text-2xl text-center mt-4 mb-9">
	// 				Here you can find your favorite Pokemon.
	// 			</h2>

	// 			<div className="mb-9">
	// 				<input
	// 					type="text"
	// 					placeholder="Search Pokemon"
	// 					value={search}
	// 					onChange={(e) => setSearch(e.target.value)}
	// 					className="shadow shadow-red-500 px-4 py-2 rounded"
	// 				/>
	// 				<button
	// 					className="bg-gradient-to-t from-red-500 to-white px-4 py-2 rounded cursor-pointer hover:text-white transition duration-300 ease-in-out"
	// 					onClick={searchPokemons}
	// 				>
	// 					Search
	// 				</button>

	// 				<select
	// 					value={selectedType}
	// 					onChange={(e) => setSelectedType(e.target.value)}
	// 					className="shadow shadow-red-500 px-4 py-2 rounded ml-4"
	// 				>
	// 					<option value="all">All pokemons</option>
	// 					{types.map((type) => (
	// 						<option key={type.name} value={type.name} className="capitalize">
	// 							{type.name}
	// 						</option>
	// 					))}
	// 				</select>
	// 			</div>

	// 			{singlePokemon ? (
	// 				<PokemonCard url={singlePokemon} />
	// 			) : (
	// 				<PokemonsList pokemons={filteredPokemons} />
	// 			)}
	// 		</div>
	// 	</div>
	// );

	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 20;

	const paginatedPokemons = filteredPokemons.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage,
	);

	const handleNextPage = () => {
		if (currentPage * itemsPerPage < filteredPokemons.length) {
			setCurrentPage((prevPage) => prevPage + 1);
		}
	};

	const handlePreviousPage = () => {
		if (currentPage > 1) {
			setCurrentPage((prevPage) => prevPage - 1);
		}
	};

	return (
		<div>
			<div className="max-w-5xl mx-auto px-4">
				<h1 className="text-4xl text-center mt-4 text-red-500">
					Welcome {state.name}!
				</h1>
				<h2 className="text-2xl text-center mt-4 mb-9">
					Here you can find your favorite Pokemon.
				</h2>

				<div className="mb-9">
					<input
						type="text"
						placeholder="Search Pokemon"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						className="shadow shadow-red-500 px-4 py-2 rounded"
					/>
					<button
						className="bg-gradient-to-t from-red-500 to-white px-4 py-2 rounded cursor-pointer hover:text-white transition duration-300 ease-in-out"
						onClick={searchPokemons}
					>
						Search
					</button>

					<select
						value={selectedType}
						onChange={(e) => setSelectedType(e.target.value)}
						className="shadow shadow-red-500 px-4 py-2 rounded ml-4"
					>
						<option value="all">All pokemons</option>
						{types.map((type) => (
							<option key={type.name} value={type.name} className="capitalize">
								{type.name}
							</option>
						))}
					</select>
				</div>

				{singlePokemon ? (
					<PokemonCard url={singlePokemon} />
				) : (
					<>
						<PokemonsList pokemons={paginatedPokemons} />
						<div className="flex justify-center mt-4">
							<button
								className="bg-red-500 text-white px-4 py-2 rounded mr-2 disabled:opacity-50"
								onClick={handlePreviousPage}
								disabled={currentPage === 1}
							>
								Previous
							</button>
							<button
								className="bg-red-500 text-white px-4 py-2 rounded disabled:opacity-50"
								onClick={handleNextPage}
								disabled={currentPage * itemsPerPage >= filteredPokemons.length}
							>
								Next
							</button>
						</div>
					</>
				)}
			</div>
		</div>
	);
}

export default Pokedex;
