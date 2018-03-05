import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ButtonComponent from "./button.jsx";
import "./styles/main.css"

export default class Body extends React.Component {
	constructor(props) {
		super(props);
		    this.state = {
		      loginInfo: {}
		    };
		 this.login = this.login.bind(this);
		 this.handleChange = this.handleChange.bind(this);
  	}

	login() {
		// return fetch(window.location.href+'api/login', {
		return fetch('http://localhost:8000/apps/register/login/', {
		  method: 'POST',
		  headers: {
		    'Content-Type': 'application/json'
		  },
		  body: JSON.stringify({
				"username": this.state.loginInfo.username,
				"password": this.state.loginInfo.pass
			})
		}).then((response)=>{
			return response.json();
		}).then((data)=>{
			this.props.history.push({pathname:"/industries", state: { token: data.token }})
		})
		//this.props.history.push({pathname:"/industries"})
	}

	handleChange(propertyName, event) {
    	const dataLogin = this.state.loginInfo;
    	dataLogin[propertyName] = event.target.value;
    	this.setState({ loginInfo: dataLogin });
  	}

	render() { 
		return ( 
			<div className="body" style={{}}> 
				<div className="singleElement">
					Username:<input id='username' onChange={this.handleChange.bind(this, 'username')} 
						value={this.state.loginInfo.username} type="text"></input>
				</div>	
				<div className="singleElement">
					Password<input id='pass' onChange={this.handleChange.bind(this, 'pass')} 
						value={this.state.loginInfo.pass} type="password"></input>
				</div>
				<div className="singleElement">
					<ButtonComponent onClick={this.login}>Enviar</ButtonComponent>
				</div>
				<Link to="/singup">Singup</Link>
			</div> 
		) 
	} 
}