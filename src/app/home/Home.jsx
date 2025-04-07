import React from 'react';
import NameForm from './components/NameForm';

function Home() {
	return (
		<div className="w-full h-dvh flex justify-center items-center">
			<div className="shrink-0 text-center">
				<h1 className="text-6xl font-bold bg-gradient-to-b from-red-500 to-white text-transparent bg-clip-text mb-4">
					POKEDEX
				</h1>
				<h2 className="text-xl font-semibold text-red-500 mb-4">
					Welcome trainer
				</h2>
				<p className="mb-2">To start please enter your nickname</p>
				<NameForm />
			</div>
			<div className="absolute left-0 bottom-0 bg-black w-full h-20 mt-auto">
				<div className="bg-red-600 w-full h-12"></div>
			</div>
		</div>
	);
}

export default Home;
