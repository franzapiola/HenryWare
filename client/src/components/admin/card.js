import React from 'react';
import { Navbar, Button, NavDropdown } from 'react-bootstrap'
import { withRouter, Link } from 'react-router-dom';
import "./card-style.css";




const Card = props => {

	return(

		<div className="card text-center">
			<div className="overflow">
				<img src={props.imgsrc} alt="usersImg" className="card-img-top"/>
			</div>
			<div className="card-body text-dark">
				<h4 className="card-title"> {props.title}</h4>
				<p className="card-text text-secondary">
					{props.text}
				</p>
				<a href={props.linkto} className="btn btn-outline-success">ELEGIR</a>
				
			</div>
		</div>


	
		)


}


export default Card;


export default Card;
