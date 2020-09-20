
import { 
	REQUEST_CART_DATA,
	RECEIVE_CART_DATA,
	REQUEST_DELETE,
	RECEIVE_DELETE
	
} from '../actions/cart'


const initialState = {
	isFetching: false,
    didInvalidate: false,	
	cartData : {
		products : []
	}
	
};

export default (state= initialState, action) => {

	switch(action.type){
		
		case(REQUEST_CART_DATA):
			return{
				...state,
				isFetching: true,
				cartData : {products : []}
		}
		case(RECEIVE_CART_DATA):
			return{
				...state,
				isFetching: false,
				cartData: action.cartData
			}
		
		case(REQUEST_DELETE):
			return {
				...state,
				isFetching: true,
			}
		



		case(RECEIVE_DELETE):
			
			return {
				...state,
				isFetching: false,
				cartData : {
					...state.cartData,
					products: state.cartData.products.filter(product => product.product_id !== action.payload)
				}
			}
		}

	return state;
	
}