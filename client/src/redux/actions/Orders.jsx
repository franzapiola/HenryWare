export const CHANGE_STATUS = 'CHANGE_STATUS';
export const REQUEST_ORDERS = 'REQUEST_ORDERS'
export const RECEIVE_ORDERS = 'RECEIVE_ORDERS'
export const changeStatus = (status) =>{
	return{
		type: "CHANGE_STATUS",
		status : status
	}
}

export function fetchOrders() { 
    return dispatch => {
        dispatch(requestOrders())
        fetch(`http://localhost:3001/orders`)
        .then( response => response.json())
        .then( json => dispatch(receiveOrders(json)))
        
    }
}
export const requestOrders = () => {
	return {
        type: REQUEST_ORDERS,
        isFetching: true,
	}
}
export const receiveOrders = orders => {
	return {
        type: RECEIVE_ORDERS,
        isFetching: false,
		orders: orders,
	}
}