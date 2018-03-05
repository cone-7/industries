import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ButtonComponent from "./button.jsx";

class Upload extends React.Component {
	constructor(props) {
		super(props);
		    this.state = {
		      customer: {}
		    };
		 this.uploadToServer = this.uploadToServer.bind(this);
  	}

	handleChange(propertyName, event) {
    	const customer = this.state.customer;
    	customer[propertyName] = event.target.value;
    	this.setState({ customer: customer });
  	}
	
	uploadToServer(){
		let formData  = new FormData();

		formData.append('file', this.state.file);
	    
	    return fetch('http://localhost:8000/upload/file', {
		  method: 'POST',
		  headers: {
		    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
		  },
		  body: formData
		}).then((response) => {
			return response.json();
		}).then((data) => {
			this.props.history.push({pathname:"/industries"})
			console.log(data);
		})

	}

	render() { 
		return ( 
			<div style={{textAlign:"center"}}> 
				File:<input id='file' onChange={this.handleChange.bind(this, 'file')} 
					value={this.state.customer.file} type="file"></input>

				<ButtonComponent onClick={this.uploadToServer}>Enviar</ButtonComponent>
			</div> 
		) 
	} 
}

export default Upload;
