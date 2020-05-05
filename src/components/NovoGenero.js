import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

const NovoGenero = () => {
	const [name, setName] = useState("");
	const [success, setSuccess] = useState(false);

	const onChange = (event) => {
		setName(event.target.value);
	};

	const onSave = () => {
		axios
			.post("/api/genres/", {
				name,
			})
			.then(() => {
				setSuccess(true);
			})
			.catch((error) => {
				alert(
					`Opsss... Houve um problema ao salvar o registro - ${error}`
				);
			});
	};

	if (success) {
		return <Redirect to='/generos' />;
	}

	return (
		<div className='container'>
			<h1>Adicionar Gênero</h1>
			<hr />
			<form>
				<div className='form-group'>
					<label htmlFor='name'>Nome</label>
					<input
						type='text'
						value={name}
						onChange={onChange}
						className='form-control'
						id='name'
						placeholder='Gênero'
					/>
				</div>
				<button
					type='button'
					onClick={onSave}
					className='btn btn-success'>
					Salvar
				</button>
			</form>
		</div>
	);
};

export default NovoGenero;
