import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

const NovaSerie = () => {
	const [name, setName] = useState("");
	const [success, setSuccess] = useState(false);

	const onChange = (event) => {
		setName(event.target.value);
	};

	const onSave = () => {
		axios
			.post("/api/series/", {
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
		return <Redirect to='/series' />;
	}

	return (
		<div className='container'>
			<h1>Adicionar Série</h1>
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
						placeholder='Série'
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

export default NovaSerie;
