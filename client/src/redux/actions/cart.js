
import {loadUserData} from '../../redux/actions/auth'

export const REQUEST_CART_DATA = 'REQUEST_CART_DATA';
//export const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS';
//export const INVALID_REQUEST_PRODUCTS = 'INVALID_REQUEST_PRODUCTS';

export const RECEIVE_CART_DATA = "RECEIVE_CART_DATA";

export const REQUEST_DELETE = "REQUEST_DELETE";
export const RECEIVE_DELETE = "RECEIVE_DELETE"



/* Funciones para eliminar un producto de la db y del store  */
export const deleteProduct = (userId, product_id)=>{
	return dispatch => {
		dispatch(requestDelete())
		fetch(`http://localhost:3001/users/${userId}/deletecartproduct`, {
			method: 'DELETE', //POST or 'PUT'
            body: JSON.stringify({product_id}), // data can be `string` or {object}!
            headers:{
                'Content-Type': 'application/json'
            }
		})
		.then( response => response.json())
		.then( json => dispatch(receiveDelete(product_id)))		
	}
}
export const requestDelete = () => {
	return {
		type: REQUEST_DELETE,
	}
}

export const receiveDelete = (product_id) => {
	return {
		type: RECEIVE_DELETE,
		payload: product_id
	}
}


export const receiveCartData = cartData => {
	return {
		type: RECEIVE_CART_DATA,
		cartData
	}
}

export const requestCartData = () => {
	return {
		type: REQUEST_CART_DATA,
	}
}

export function fetchUserCart(idUser) { 
	//const idUser = localStorage.getItem("actualUserId");
	return dispatch => {
		
		dispatch(requestCartData())
		fetch(`http://localhost:3001/users/${idUser}/cart`)
		.then( response => response.json())
		.then( json => dispatch(receiveCartData(json)))
		.catch(err => console.log("Error en fetchUserCart:",err))
		
	}
}

//Cambia la candidad en el carrito
export function changeQuantity(userId, product_id, quantity){
	
		return dispatch => { 		
			fetch(`http://localhost:3001/users/${userId}/cart`, {
				method: 'PUT', //POST or 'PUT'
	        	body: JSON.stringify({product_id, quantity}), // data can be `string` or {object}!
	        	headers:{
	            	'Content-Type': 'application/json'
	        	}
			})
			.then(() => dispatch(fetchUserCart(userId)))
			.catch(err => console.log("Error en changeQuantity:",err))
		//.then( response => response.json())
	//.then( json => dispatch(receiveQuantity(json)))
		}
	
}

