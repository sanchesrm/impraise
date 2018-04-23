import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom'; 
import LogoBar from './containers/components/LogoBar';
import MainComponent from './containers/Main/MainComponent';

const Routes = () => (
	<BrowserRouter>
		<div className="App">
			<LogoBar />
			<main>
				<Route path="/" exact component={MainComponent} />
			</main>
		</div>
	</BrowserRouter>
);

export default Routes;