export const REQUEST_PRODUCTS = 'REQUEST_PRODUCTS';
export const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS';
export const INVALID_REQUEST_PRODUCTS = 'INVALID_REQUEST_PRODUCTS';
export const RECEIVE_USER_CART = "RECEIVE_USER_CART";
export const REQUEST_QUANTITY = "REQUEST_QUANTITY"
export const RECEIVE_QUANTITY = "RECEIVE_QUANTITY"

export const setId = (id) => {
	return{
		type: "SET_ID",
		id : id
	}
}

export const addProduct = (product) =>{
	return {
		type : "ADD_PRODUCT",
		product : product
	}
}

export const changeStatus = (status) =>{
	return{
		type: "CHANGE_STATUS",
		status : status
	}
}

export const addPaymentMethod = (method) =>{
	return{
		type: "ADD_PAYMENT_METHOD",
		method : method
	}
}
export const requestProducts = () => {
	return {
		type: REQUEST_PRODUCTS,
	}
}
export function fetchProducts() { 
	return dispatch => {
		dispatch(requestProducts())
		fetch(`http://localhost:3001/products`)
		.then( response => response.json())
		.then( json => dispatch(receiveProducts(json)))
		
	}
}
export const receiveProducts = products => {
	return {
		type: RECEIVE_PRODUCTS,
		products: products
	}
}

export function fetchUserCart() { 
	const idUser = localStorage.getItem("actualUserId");
	return dispatch => {
		dispatch(requestProducts())
		fetch(`http://localhost:3001/users/${idUser}/cart`)
		.then( response => response.json())
		.then( json => dispatch(receiveProducts(json)))
		
	}
}
export const receiveCartProducts = products => {
	return {
		type: RECEIVE_USER_CART,
		products: products,
	}
}
//Cambia la candidad en el carrito
export function changeQuantity(userId, product_id, quantity){
	return dispatch =>{
		dispatch(requestQuantity())
		fetch(`http://localhost:3001/users/${userId}/cart`, {
			method: 'PUT', //POST or 'PUT'
            body: JSON.stringify({product_id, quantity}), // data can be `string` or {object}!
            headers:{
                'Content-Type': 'application/json'
            }
		})
		.then( response => response.json())
		.then( json => dispatch(receiveQuantity(json)))
		
	}
}

export function requestQuantity(){
	return {
		type: REQUEST_QUANTITY
	}
}

export function receiveQuantity(quantity, position){
	return {
		type: RECEIVE_QUANTITY,
		payload: {quantity, position}
	}
}