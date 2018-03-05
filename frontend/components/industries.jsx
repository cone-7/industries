import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ButtonComponent from "./button.jsx";
import RenderServices from "./renderservices.jsx";

export default class Industries extends React.Component {

	constructor(props) {
	    super(props);
	    this.state = {
	    	industriesInfo: {}
	    }
	    this.getIndustries = this.getIndustries.bind(this);
	    this.createStructureToShow = this.createStructureToShow.bind(this)
 	}

 	handleChange(propertyName, event) {
 		if(propertyName==='found')
 			this.setState({found: event.target.value})
 		else{
    	const cards = this.state.cards;
    	cards[propertyName] = event.target.value;
    	this.setState({ cards: cards });
    }
  }

	componentDidMount(){
		this.getIndustries()
	}

	getIndustries(){
		// let x = {
		// 	"industries": [{
		// 		"id": "11",
		// 		"name": "Agricultura",
		// 		"children": [{
		// 			"id": "111",
		// 			"name": "Siembra de soya",
		// 			"children": [{
		// 				"id": "1111",
		// 				"name": "Siembra de soya"
		// 			}]
		// 		}]
		// 	}, {
		// 		"id": "97",
		// 		"name": "Otros",
		// 		"children": [{
		// 			"id": "971",
		// 			"name": "Otros perecederos"
		// 		}, {
		// 			"id": "972",
		// 			"name": "Otros servicios",
		// 			"children": [{
		// 				"id": "9721",
		// 				"name": "Servicios varios"
		// 			}]
		// 		}]
		// 	}]
		// };
		//setTimeout( function(){this.setState({industriesInfo: x.industries})}.bind(this), 100)
		// console.log(this.state.industriesInfo)
		// self = this;
		fetch('http://localhost:8000/api/industries/', {
		  method: 'GET'
		}).then((response) => {
			return response.json();
		}).then((data) => {
			console.log(data.objects)
			this.setState({industriesInfo: data.objects})
		})
	}

	createStructureToShow(arrayIndustries){
		console.log(arrayIndustries[0].children != null)
		return arrayIndustries.map((industrie) => {
			if(industrie.children != null)
				return (
					<div>
						<div key={industrie.id}> Industrie: {industrie.name}</div>
						<RenderServices service={industrie.children}/>
					</div>)
			else
				return <div key={industrie.id}> Industrie: {industrie.name}</div>
		})
	}

	render() { 
		return ( 
			<div className="body"> 
				{ JSON.stringify(this.state.industriesInfo) === JSON.stringify({}) ?
					"nada":
					this.createStructureToShow(this.state.industriesInfo)
					// this.state.industriesInfo.map((industrie) =>
					// 	<div key={industrie.id}>{industrie.children[0].id}</div>
					// 	)
				}
				<Link to="/upload">Upload file</Link>
			</div> 
		) 
	} 
}
