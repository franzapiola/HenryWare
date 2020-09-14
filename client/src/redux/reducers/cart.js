import { REQUEST_PRODUCTS, RECEIVE_PRODUCTS ,RECEIVE_USER_CART} from '../actions/actions'
const initialState = {
	isFetching: false,
    didInvalidate: false,
	id_order : "",
	status : "cart",
	products : [],
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
		case("SET_ID"):
			return{
				...state,
				id_order : action.id
			}
		case(REQUEST_PRODUCTS):
			return{
				...state,
				isFetching: true,
				products: []
		}
		case(RECEIVE_PRODUCTS):
			return{
				...state,
				isFetching: false,
				products: action.products
		}
		case(RECEIVE_USER_CART):
			return{
				...state,
				isFetching: false,
				products: action.products
			}
	}

	return state;
	
};