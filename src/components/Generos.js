import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Generos = () => {
	const [data, setData] = useState([]);
	const [errorApi, setErrorApi] = useState(false);

	useEffect(() => {
		axios
			.get("/api/genres")
			.then((res) => {
				setData(res.data.data);
			})
			.catch((error) => {
				setErrorApi(true);
			});
	}, []);

	const deleteGenero = (id) => {
		axios
			.delete("api/genres/" + id)
			.then(() => {
				const filtrado = data.filter((item) => item.id !== id);
				setData(filtrado);
			})
			.catch((error) => {
				alert(
					`Opsss... Houve um problema ao remover o registro - ${error}`
				);
			});
	};

	const renderLine = (record) => {
		return (
			<tr key={record.id}>
				<th scope='row'>{record.id}</th>
				<td>{record.name}</td>
				<td>
					<Link
						to={"/generos/" + record.id}
						className='btn btn-warning'>
						Editar
					</Link>
					<button
						onClick={() => deleteGenero(record.id)}
						className='btn btn-danger'>
						Remover
					</button>
				</td>
			</tr>
		);
	};

	if (errorApi) {
		return (
			<div className='container'>
				<h1>Gêneros</h1>
				<div
					className='alert alert-danger alert-dismissible fade show'
					role='alert'>
					<strong>
						Opsss... Houve um problema ao carregar os registros.
						Tente novamente mais tarde!
					</strong>
				</div>
			</div>
		);
	}

	if (data.length === 0) {
		return (
			<div className='container'>
				<h1>Gêneros</h1>
				<div
					className='alert alert-warning alert-dismissible fade show'
					role='alert'>
					<strong>
						Não há gêneros cadastrados. Clique{" "}
						<Link to='/generos/novo' className='alert-link'>
							aqui
						</Link>{" "}
						para cadastrar novo gênero
					</strong>
				</div>
			</div>
		);
	}

	return (
		<div className='container'>
			<h1>Gêneros</h1>
			<Link to='/generos/novo' className='btn btn-primary btn-block'>
				Adicionar Gênero
			</Link>
			<hr />
			<table className='table table-hover table-dark'>
				<thead>
					<tr>
						<th scope='col'>Id</th>
						<th scope='col'>Nome</th>
						<th scope='col'>Ações</th>
					</tr>
				</thead>
				<tbody>{data.map(renderLine)}</tbody>
			</table>
		</div>
	);
};

export default Generos;
