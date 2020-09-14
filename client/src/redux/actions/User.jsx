export const REQUEST_USER = 'REQUEST_USER'
export const RECEIVE_USER = 'RECEIVE_USER'



export function fetchUser(userId) { 
    return dispatch => {
        dispatch(requestUser())
        fetch(`http://localhost:3001/users/${userId}`)
        .then( response => response.json())
        .then( json => dispatch(receiveUser(json)))        
    }
}
export const requestUser = () => {
	return {
        type: REQUEST_USER,
        isFetching: true,
	}
}
export const receiveUser = user => {
	return {
        type: RECEIVE_USER,
        isFetching: false,
		user: user,
	}
}