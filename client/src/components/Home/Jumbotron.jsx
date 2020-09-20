import React from "react";
import  './Jumbotron.css'
import image from './Jumbotron.svg'
import button from './BotonJumbotron.svg'
import {Link} from 'react-router-dom'

const Jumbotron = () =>{
	return(
		<div className="jumbotron jumbotron-fluid">
			<img className='jumbotronImg' src={image} alt=""/>
			<Link to='/products'><img className='jumbotronButton' src={button}/></Link>
		</div>
		
		

	)

}


export default Jumbotron

