import React from "react";
import  './Jumbotron.css'
import image from './Jumbotron.svg'
import {Link} from 'react-router-dom'

const Jumbotron = () =>{
	return(
		<div className="jumbotron jumbotron-fluid">
			<img className='jumbotronImg' src={image} alt=""/>
			<Link to='/products'><div className='toProducts'></div></Link>
		</div>
		
		

	)

}


export default Jumbotron

