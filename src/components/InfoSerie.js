import React, { useState, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Badge } from "reactstrap";

const InfoSerie = ({ match }) => {
	const [form, setForm] = useState({
		name: "",
		comments: "",
	});
	const [genres, setGenres] = useState([]);
	const [success, setSuccess] = useState(false);
	const [errorApi, setErrorApi] = useState(false);
	const [mode, setMode] = useState("INFO");
	const [data, setData] = useState({});

	useEffect(() => {
		axios
			.get("/api/series/" + match.params.id)
			.then((res) => {
				setData(res.data);
				setForm(res.data);
			})
			.catch((error) => {
				setErrorApi(true);
			});
	}, [match.params.id]);

	useEffect(() => {
		axios.get("/api/genres").then((res) => {
			setGenres(res.data.data);
		});
	}, [data]);

	//Custom Header
	const masterHeader = {
		height: "50vh",
		minHeight: "500px",
		backgroundImage: `url('${data.background}')`,
		backgroundSize: "cover",
		backgroundPosition: "center",
		backgroundRepeat: "no-repeat",
	};

	const onChange = (field) => (event) => {
		setForm({
			...form,
			[field]: event.target.value,
		});
	};

	const seleciona = (value) => () => {
		setForm({
			...form,
			status: value,
		});
	};

	const onSave = () => {
		axios
			.put(`/api/series/${match.params.id}`, form)
			.then(() => {
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
				<h1>Informações da Série</h1>
				<hr />
				<div
					className='alert alert-danger alert-dismissible fade show'
					role='alert'>
					<strong>
						Opsss... Houve um problema ao carregar as infos da
						série. Tente novamente mais tarde!
					</strong>
				</div>
			</div>
		);
	}

	if (success) {
		return <Redirect to='/series' />;
	}

	return (
		<div>
			<header style={masterHeader}>
				<div
					className='h-100'
					style={{ background: "rgba(0,0,0,0.7)" }}>
					<div className='h-100 container'>
						<div className='row h-100 align-items-center'>
							<div className='col-3'>
								<img
									src={data.poster}
									alt={data.name}
									className='img-fluid img-thumbnail'
								/>
							</div>
							<div className='col-9'>
								<h1 className='font-weight-light text-white'>
									{data.name}
								</h1>
								<div className='lead text-white'>
									{data.status === "ASSISTIDO" && (
										<Badge color='success'>Assistido</Badge>
									)}
									{data.status === "PARA_ASSISTIR" && (
										<Badge color='warning'>
											Para Assistir
										</Badge>
									)}
									<p>Gênero: {data.genre}</p>
								</div>
								<div>
									{mode === "INFO" && (
										<div>
											<p>
												<button
													className='btn btn-primary'
													onClick={() =>
														setMode("EDIT")
													}>
													Editar
												</button>
											</p>
										</div>
									)}
									{mode === "EDIT" && (
										<div>
											<p>
												<button
													className='btn btn-warning'
													onClick={() =>
														setMode("INFO")
													}>
													Fechar
												</button>
											</p>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</header>
			{mode === "EDIT" && (
				<div className='container'>
					<h1>Informações da Série</h1>
					<hr />
					<form>
						<div className='form-group'>
							<label htmlFor='name'>Nome</label>
							<input
								type='text'
								value={form.name}
								onChange={onChange("name")}
								className='form-control'
								id='name'
								placeholder='Informe o Nome da Série'
							/>
						</div>
						<div className='form-group'>
							<label htmlFor='name'>Gêneros</label>
							<select
								className='form-control'
								id='genre'
								value={form.genre_id}
								onChange={onChange("genre_id")}>
								{genres.map((genre) => (
									<option key={genre.id} value={genre.id}>
										{genre.name}
									</option>
								))}
							</select>
						</div>
						<div className='form-group'>
							<div className='form-check'>
								<input
									className='form-check-input'
									type='radio'
									name='status'
									id='paraAssistir'
									value='PARA_ASSISTIR'
									onChange={seleciona("PARA_ASSISTIR")}
									checked={form.status === "PARA_ASSISTIR"}
								/>
								<label
									className='form-check-label'
									htmlFor='paraAssistir'>
									Para Assistir
								</label>
							</div>
							<div className='form-check'>
								<input
									className='form-check-input'
									type='radio'
									name='status'
									id='assistido'
									value='ASSISTIDO'
									onChange={seleciona("ASSISTIDO")}
									checked={form.status === "ASSISTIDO"}
								/>
								<label
									className='form-check-label'
									htmlFor='assistido'>
									Assistido
								</label>
							</div>
						</div>

						<div className='form-group'>
							<label htmlFor='name'>Comentários</label>
							<input
								type='text'
								value={form.comments}
								onChange={onChange("comments")}
								className='form-control'
								id='comments'
								placeholder='Informe os Comentários'
							/>
						</div>
						<button
							type='button'
							onClick={onSave}
							className='btn btn-success'>
							Salvar
						</button>
						<button
							className='btn btn-warning'
							onClick={() => setMode("INFO")}>
							Cancelar
						</button>
					</form>
				</div>
			)}
		</div>
	);
};

export default InfoSerie;
