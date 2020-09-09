export const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS'
export const addProduct = (product) =>{
	return {
		type : "ADD_PRODUCT",
		product : product
	}
}

export const receiveProducts = (products) => {
	return {
		type: RECEIVE_PRODUCTS,
		products: products,
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
export const getProducts = (products) => {
	return{
		type: "GET_PRODUCTS",
		products: ['a', 'b']
	}
}
/* export function getProducts() { 
	return function (dispatch) {
	  return fetch(`http://localhost:3001/products`)
		.then(
		  response => response.json()
		)
		.then(json =>
		  dispatch(getProducts(json))
		)
	}
  } */