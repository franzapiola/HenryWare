import React,{ useState, useEffect } from 'react';
import {useParams}  from 'react-router-dom'
import styles from './register.module.scss'
import { FormControl, TextField, Button } from '@material-ui/core';
import GoogleButton from 'react-google-button'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"



export default function Login(){
	const axios = require('axios');
	const [ emailForm, setEmailForm ] = useState('');
	const [ passForm, setPassForm ] = useState('');


	// const [idUser,setIdUser] = useState("Guest")
	// const [actualUserName,setActualUserName] = useState("guest")
	// localStorage.setItem("actualUserId",idUser)
	// localStorage.setItem("actualUserName",actualUserName)
	// const cambiarLocalId =  async (email)=>{
		 
	// 	 //const username = "juan@gmail.com";
		
	// 	 await axios({
	// 	 	url : `http://localhost:3001/users/usersID?email=${email}`,
	// 	 	method : "GET"
	// 	 }).then(response => {
	// 	 	setIdUser(response.data.id)
	// 	 	setActualUserName(response.data.name)
	// 	 	console.log(response.data.name)
	// 	 })	
	// }


	const handleSubmit = () => {
		axios.post('http://localhost:3001/auth/login', {
			email: emailForm,
			password: passForm
		})
	}
		
	return(
		<div className={`pt-3 mt-2 d-flex justify-content-center align-items-center w-100 mx-auto ${styles.container}`}>
			<div class={`card ${styles.cardLogin}`}  >
				<form onSubmit={handleSubmit}>
				 <div class="form-group">
				    <label for="userInput">Correo Electronico</label>
				    <input name="correo" type="text" value={emailForm} class={`form-control ${styles.inputLogin}`} id="correo" onChange = {(e)=>{setEmailForm(e.target.value)}}/>    
				  </div>
				  <div class="form-group">
				    <label for="exampleInputPassword1">Contraseña</label>
				    <input type="password" value={passForm} class={`form-control ${styles.inputLogin}`} id="password" onChange = {(e)=>{setPassForm(e.target.value)}}/>
				  </div>
				  <button type='submit'  className={`${styles.henryColor} col-md-12`}>Ingresar</button>
				 {/*<span>ACTUAL STATUS : {idUser} </span>*/}
				</form>
				{/* <button onClick={()=>console.log('pass:', passForm, 'email:', emailForm)}>X</button> */}
			</div>
		</div>
		)
}