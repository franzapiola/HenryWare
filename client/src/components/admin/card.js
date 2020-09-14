import React from 'react';
import { Navbar, Button, NavDropdown } from 'react-bootstrap'
import { withRouter, Link } from 'react-router-dom';
import "./card-style.css";



const Card = props => {

	return(

		<div className="card text-center">
			<div className="overflow">
				<img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.knack.com%2F_images%2Flive%2Fusers.png&f=1&nofb=1" alt="usersImg" className="card-img-top"/>
			</div>
			<div className="card-body text-dark">
				<h4 className="card-title"> Users Control</h4>
				<p className="card-text text-secondary">
					Agrega, modifica o elimina usuarios.
				</p>
				<a href="#" className="btn btn-outline-success">IR</a>
				
			</div>
		</div>


	
		)


}


export default Card;