
export const addProduct = (product) =>{
	return {
		type : "ADD_PRODUCT",
		product : product
	}
}

export const changeStatus = () =>{
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