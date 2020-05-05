import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Generos = () => {
	const [data, setData] = useState([]);
	const [errorApi, setErrorApi] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	// useEffect(() => {
	// 	(async function () {
	// 		try {
	// 			const response = await fetch("/api/genres");
	// 			const json = await response.json();
	// 			setData(json.data);
	// 			setIsLoading(false);
	// 		} catch {
	// 			setErrorApi(true);
	// 			setIsLoading(false);
	// 		}
	// 	})();
	// }, []);

	// useEffect(() => {
	// 	async function fetchData() {
	// 		try {
	// 			const response = await fetch("/api/genres");
	// 			const json = await response.json();
	// 			setData(json.data);
	// 			setIsLoading(false);
	// 		} catch {
	// 			setErrorApi(true);
	// 			setIsLoading(false);
	// 		}
	// 	}
	// 	fetchData();
	// }, []);

	useEffect(() => {
		axios
			.get("/api/genres")
			.then((res) => {
				setData(res.data.data);
				setIsLoading(false);
			})
			.catch(() => {
				setErrorApi(true);
				setIsLoading(false);
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

	/**
	 * Como o component não está em outro arquivo (Component externo),
	 * não existe a necessidade de passar os States como props, poderíamos
	 * acessar os States diretamente. Foi mantido para fins de exemplo.
	 */
	const GenerosResults = ({ error, results, isLoading }) => {
		if (error) {
			return (
				<div
					className='alert alert-danger alert-dismissible fade show'
					role='alert'>
					<strong>
						Opsss... Houve um problema ao carregar os registros.
						Tente novamente mais tarde!
					</strong>
				</div>
			);
		}
		if (isLoading) {
			return (
				<div
					className='alert alert-primary alert-dismissible fade show'
					role='alert'>
					<strong>Carregando...</strong>
				</div>
			);
		}
		if (results.length === 0) {
			return (
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
			);
		}
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
		return (
			<>
				<table className='table table-hover table-dark'>
					<thead>
						<tr>
							<th scope='col'>Id</th>
							<th scope='col'>Nome</th>
							<th scope='col'>Ações</th>
						</tr>
					</thead>
					<tbody>{results.map(renderLine)}</tbody>
				</table>
				<Link to='/generos/novo' className='btn btn-primary btn-block'>
					Adicionar Gênero
				</Link>
			</>
		);
	};

	return (
		<div className='container'>
			<h1>Gêneros</h1>
			<hr />
			<GenerosResults
				error={errorApi}
				results={data}
				isLoading={isLoading}></GenerosResults>
		</div>
	);
};

export default Generos;
