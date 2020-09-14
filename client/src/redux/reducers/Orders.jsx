import {REQUEST_ORDERS, RECEIVE_ORDERS, CHANGE_STATUS } from '../actions/Orders'

const initialState = {
    /* Cada objeto order va a tener un order_id, un user_id y un status */
	isFetching: false,
    didInvalidate: false,
	orders : [],
	// modo de envio , fecha de envio
};

export default (state= initialState, action) => {

	switch(action.type){
		case(CHANGE_STATUS):
			return{
				...state,
				status : action.status
            }
        case(REQUEST_ORDERS):
        return {
            ...state,
            isFetching: true,
        }
        case(RECEIVE_ORDERS):
            return {
                ...state,
                isFetching: false,
                orders: action.orders,
            }
	}

	return state;
	
};