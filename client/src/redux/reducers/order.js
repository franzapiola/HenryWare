
const initialState = {

	products : [],
	id_order : "",
	status : "cart",
	total_price : 0,
	payment_method : ""
	// modo de envio , fecha de envio


};


export default (state= initialState, action) => {

	switch(action.type){
		case("ADD_PRODUCT"):
			return{
				...state,
				products : state.products.concat(action.product)
			}
		case("CHANGE_STATUS"):
			return{
				...state,
				status : action.status
			}
		case("ADD_PAYMENT_METHOD"):
			return{
				...state,
				payment_method : action.method
			}
		case('GET_PRODUCTS'):
		console.log(action)
			return{
				...state,
				products: action.products
			}
	}

	return state;

};