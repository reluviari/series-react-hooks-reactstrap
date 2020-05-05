import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Badge } from "reactstrap";

const Series = () => {
	const [data, setData] = useState([]);
	const [errorApi, setErrorApi] = useState(false);

	useEffect(() => {
		axios
			.get("/api/series")
			.then((res) => {
				setData(res.data.data);
			})
			.catch((error) => {
				setErrorApi(true);
			});
	}, []);

	const deleteSerie = (id) => {
		axios
			.delete("api/series/" + id)
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
				<td>{record.genre}</td>
				<td>
					{record.status === "ASSISTIDO" && (
						<Badge color='success'>Assistido</Badge>
					)}
					{record.status === "PARA_ASSISTIR" && (
						<Badge color='warning'>Para Assistir</Badge>
					)}
				</td>
				<td>
					<Link to={"/series/" + record.id} className='btn btn-info'>
						Info
					</Link>
					<button
						onClick={() => deleteSerie(record.id)}
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
				<h1>Séries</h1>
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
				<h1>Séries</h1>
				<hr />
				<div
					className='alert alert-warning alert-dismissible fade show'
					role='alert'>
					<strong>
						Não há séries cadastradas. Clique{" "}
						<Link to='/series/novo' className='alert-link'>
							aqui
						</Link>{" "}
						para cadastrar uma nova série.
					</strong>
				</div>
			</div>
		);
	}

	return (
		<div className='container'>
			<h1>Séries</h1>
			<hr />
			<table className='table table-hover table-dark'>
				<thead>
					<tr>
						<th scope='col'>Id</th>
						<th scope='col'>Nome</th>
						<th scope='col'>Gênero</th>
						<th scope='col'>Status</th>
						<th scope='col'>Ações</th>
					</tr>
				</thead>
				<tbody>{data.map(renderLine)}</tbody>
			</table>
			<Link to='/series/novo' className='btn btn-primary btn-block'>
				Adicionar Série
			</Link>
		</div>
	);
};

export default Series;
