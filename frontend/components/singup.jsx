import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ButtonComponent from "./button.jsx"
import "./styles/main.css"

class Singup extends React.Component {
	constructor(props) {
		super(props);
		    this.state = {
		      customer: {}
		    };
		 this.singup = this.singup.bind(this);
  	}

	handleChange(propertyName, event) {
    	const customer = this.state.customer;
    	customer[propertyName] = event.target.value;
    	this.setState({ customer: customer });
  	}
	
	singup(){
		/*return fetch(window.location.href+'api/customer', {
		  method: 'POST',
		  headers: {
		    'Content-Type': 'application/json'
		  },
		  body: JSON.stringify({
				"customer": {
					"name": this.state.customer.name,
					"password": this.state.customer.password,
					"email": this.state.customer.email,
					"securityNumber": this.state.customer.securityNumber
				}
			})
		}).then(function(response){
			return response.json();
		}).then(function(data){
			console.log(data);
		})
		this.props.history.push({pathname:"/upload"})*/

	}

	render() { 
		return ( 
			<div style={{textAlign:"center"}}> 
				Nombre:<input id='name' onChange={this.handleChange.bind(this, 'name')} 
					value={this.state.customer.name} type="text"></input>

				Email:<input id='email' onChange={this.handleChange.bind(this, 'email')} 
					value={this.state.customer.email} type="text"></input>

				Password<input id='password' onChange={this.handleChange.bind(this, 'password')} 
					value={this.state.customer.password} type="password"></input>

				Confirma Password<input id='confirmapassword' onChange={this.handleChange.bind(this, 'confirmapassword')} 
					value={this.state.customer.confirmapassword} type="password"></input>

				Security Number:<input id='securityNumber' onChange={this.handleChange.bind(this, 'securityNumber')} 
					value={this.state.customer.securityNumber} type="text"></input>

				<ButtonComponent onClick={this.singup}>Enviar</ButtonComponent>
			</div> 
		) 
	} 
}

export default Singup;
