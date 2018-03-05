import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Body from "./components/body.jsx"
import Singup from "./components/singup.jsx"
import Upload from "./components/upload.jsx"
import Industries from "./components/industries.jsx"

// main app

ReactDOM.render(
	<div>
		<div>Header</div>
		<BrowserRouter>
			<div>
				<Route exact path="/" component={Body}/>
				<Route exact path="/upload" component={Upload}/>
				<Route exact path="/singup" component={Singup}/>
				<Route exact path="/industries" component={Industries}/>
			</div>
		</BrowserRouter>
	</div>, 
	document.getElementById("main")
);
