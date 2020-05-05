import React, { useState, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

const EditarGenero = ({ match }) => {
	// console.log(props);
	// console.log(props.match);

	// const match = propos.match;
	// const { match } = props;
	const [name, setName] = useState("");
	const [success, setSuccess] = useState(false);
	const [errorApi, setErrorApi] = useState(false);

	useEffect(() => {
		axios
			.get("/api/genres/" + match.params.id)
			.then((res) => {
				setName(res.data.name);
			})
			.catch((error) => {
				setErrorApi(true);
			});
	}, [match.params.id]);

	const onChange = (event) => {
		setName(event.target.value);
	};

	const onSave = () => {
		axios
			.put("/api/genres/" + match.params.id, {
				name,
			})
			.then((res) => {
				setSuccess(true);
			})
			.catch((error) => {
				alert(
					`Opsss... Houve um problema ao salvar o registro - ${error}`
				);
			});
	};

	if (errorApi) {
		return (
			<div className='container'>
				<h1>Editar Gênero</h1>
				<hr />
				<div
					className='alert alert-danger alert-dismissible fade show'
					role='alert'>
					<strong>
						Opsss... Houve um problema ao carregar o registro. Tente
						novamente mais tarde!
					</strong>
				</div>
			</div>
		);
	}

	if (success) {
		return <Redirect to='/generos' />;
	}

	return (
		<div className='container'>
			<h1>Editar Gênero</h1>
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

export default EditarGenero;
