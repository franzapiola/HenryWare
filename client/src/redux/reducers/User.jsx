import {REQUEST_USER, RECEIVE_USER } from '../actions/User'

const initialState = {
	isFetching: false,
    didInvalidate: false,
    user: {
        
    },
};

export default (state= initialState, action) => {

	switch(action.type){
        case REQUEST_USER:
        return {
            ...state,
            isFetching: true,
        }
        case RECEIVE_USER :
            return {
                ...state,
                isFetching: false,
                user: action.user,
            }
	}

	return state;
	
};