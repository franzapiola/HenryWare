import { 
	REQUEST_PRODUCTS, 
	RECEIVE_PRODUCTS ,
	RECEIVE_USER_CART, 
	REQUEST_QUANTITY, 
	RECEIVE_QUANTITY,
	REQUEST_DELETE,
	RECEIVE_DELETE,
} from '../actions/actions'


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
		case(REQUEST_QUANTITY):
			return {
				...state,
				isFetching: true,
			}
		case(RECEIVE_QUANTITY):
		//console.log('receive quantity',action.payload)
		//console.log('state products',state.products.products)
		const products = state.products.products.map( prod => {
			if(prod.product_id === action.payload.quantity.product_id){
				prod.LineaDeOrden.quantity = action.payload.quantity.quantity
			}
			return prod
		})
		//console.log('Productos modificado',products)
		state.products.products = products
			return{
				...state,
				isFetching: false,
				//products: {products: products}
		}
		case(REQUEST_DELETE):
		return {
			...state,
			isFetching: true,
		}
		
		case(RECEIVE_DELETE):
		console.log(action)
		return {
			...state,
			isFetching: false,
			products: {products: state.products.products.filter(product => product.product_id !== action.payload.product_id	)} 
		}
	}

	return state;
	
};