import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./components/Header";
import Home from "./components/Home";
import Generos from "./components/Generos";
import NovoGenero from "./components/NovoGenero";
import EditarGenero from "./components/EditarGenero";
import Series from "./components/Series";
import NovaSerie from "./components/NovaSerie";
import InfoSerie from "./components/InfoSerie";

function App() {
	return (
		<div>
			<Router>
				<Header />
				<Switch>
					<Route path='/' exact component={Home} />
					<Route path='/generos' exact component={Generos} />
					<Route path='/generos/novo' exact component={NovoGenero} />
					<Route path='/generos/:id' component={EditarGenero} />
					<Route path='/series' exact component={Series} />
					<Route path='/series/novo' exact component={NovaSerie} />
					<Route path='/series/:id' component={InfoSerie} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
