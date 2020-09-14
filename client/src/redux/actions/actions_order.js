export const REQUEST_PRODUCTS = 'REQUEST_PRODUCTS';
export const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS';
export const INVALID_REQUEST_PRODUCTS = 'INVALID_REQUEST_PRODUCTS';

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
	console.log('receiveProducts')
	return {
		type: RECEIVE_PRODUCTS,
		products: products,
	}
}