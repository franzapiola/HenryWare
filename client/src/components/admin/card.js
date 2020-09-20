import React from 'react';
import { Navbar, Button, NavDropdown } from 'react-bootstrap'
import { withRouter, Link } from 'react-router-dom';
import styles from "./card-style.module.css";




const Card = props => {

	return(
		<Link to={props.linkto}>
			<div className={`card text-center h-100 w-100 d-flex`} style={{borderRadius: '35px'}}>
				<div >
					<img src={props.imgsrc} alt="usersImg" className={`${styles.imgCard} card-img-top`}/>
				</div>

				<div className="card-body text-dark">
					<h4 className=""> {props.title}</h4>
					<p className="card-text">
						{props.text}
					</p>
					
				</div>
			</div>


		</Link>

	
		)


}

export default Card;
