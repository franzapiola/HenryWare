import React,{ useState } from 'react';
import { useHistory }  from 'react-router-dom'
import styles from './register.module.scss'
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

//Redux
import { loadUserData } from '../../redux/actions/auth';
import { connect } from 'react-redux';


//localhost:3000/loginToken

function Login(props){
	const history = useHistory();
	
	//Redux
	const { user, loadUserData } = props;

	const [ form, setForm ] = useState({
		email: '',
		password: ''
	});

	//Mensaje de error ante un fallo en la autenticacion
	const [ errorMsg, setErrorMsg ] = useState('');

/*	axios.post(url, {
	  //...data
	}, {
	  headers: {
	    'Authorization': `Basic ${token}` 
	  }
	})
*/
	//Si ya hay un usuario loggeado, redirigirlo automáticamente al home
	if(user.role != 'Guest'){
		history.push('/');
	}

	const handleSubmit =  (e) => {
		e.preventDefault();
		//Autenticamos con el contenido del form a la ruta de login
		axios.post("http://localhost:3001/auth/login", form)
		.then(response =>{
			// el objeto user tiene los datos relevantes del usuario ( id, nombre, apellido,rol)
			// el objeto accessToken es el token de sesion
			if(response.data.user){
				//Sacamos el accessToken y la información del usuario de la respuesta
				const { user, accessToken } = response.data
				//Llamando a loadUserData, mandamos el usuario recibido como respuesta a la store de Redux
				loadUserData(user);
				//El accessToken, por otro lado, lo guardamos en el Local storage
				localStorage.setItem("actualToken", accessToken);
				//Redireccionamos a la homepage
				history.push('/');
				return;
			}
			if(!response.data.user){
				const { error } = response.data
				setErrorMsg(error);
				setTimeout(()=>{
					setErrorMsg('');
				}, 4000)
				return localStorage.setItem("actualToken",null);
			}
		})
		.catch( (err) => console.log(err) )

	}

	/*const getToken = (email,passwd) => {
		console.log(email)
		 axios.get("http://localhost:3001/auth",

		 	headers: {
				'Authorization' : `Beared ${localStorage.getItem("actualToken")}`
			}
		})
		.then(response =>{
			console.log(response.data)
			//localStorage.setItem("actualToken",response.data.accessToken)
		})
		.catch( (err) => console.log(err) )

	}*/

		
	return(
		<div className={`pt-3 mt-2 d-flex justify-content-center align-items-center w-100 mx-auto ${styles.container}`}>
			<div className={`card ${styles.cardLogin}`}  >
			{/* <span>TOKEN actual : {localStorage.getItem("actualToken")} </span> */}
			<form onSubmit={handleSubmit}>
				 <div className="form-group">
				    <label for="userInput">Correo Electronico</label>
					<input name="correo" value={form.email}type="text" className={`form-control ${styles.inputLogin}`} id="correo" 
					onChange={(e)=>setForm({
						...form,
						email: e.target.value
					})}/>
				  </div>
				  <div className="form-group">
				    <label for="exampleInputPassword1">Contraseña</label>
				    <input type="password" value={form.password} className={`form-control ${styles.inputLogin}`} id="password"
					onChange={(e) => setForm({
						...form,
						password: e.target.value
					})}/>
				  </div>
					{errorMsg && <span>{errorMsg}</span>}
				  <input  type='submit' className={`${styles.henryColor} col-md-12`} value='Ingresar' />
				</form>
			</div>
		</div>
		)
}

const mapStateToProps = state => {
	return {
		user: state.auth
	}
}

const mapDispatchToProps = dispatch => {
	return {
		loadUserData: userData => dispatch(loadUserData(userData))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);