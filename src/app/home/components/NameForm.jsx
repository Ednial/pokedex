import React, { useRef } from 'react';
import { types, useName } from '../../../contexts/nameContext';
import { useNavigate } from 'react-router';

function NameForm() {
	const [state, dispatch] = useName();
	const navigate = useNavigate();
	const inputRef = useRef();

	const handleSubmit = () => {
		if (!inputRef.current.value) return;
		dispatch({
			type: types.set_name,
			payload: inputRef.current.value,
		});
		navigate('/pokedex');
		inputRef.current.value = '';
	};

	return (
		<div className="flex items-center justify-center gap-2">
			<input
				type="text"
				className="shadow shadow-red-500 px-4 py-2 rounded"
				placeholder="Enter your nickname"
				ref={inputRef}
				onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
			/>
			<button
				className="bg-gradient-to-t from-red-500 to-white px-4 py-2 rounded cursor-pointer hover:text-white transition duration-300 ease-in-out"
				onClick={handleSubmit}
			>
				Start
			</button>
		</div>
	);
}

export default NameForm;
