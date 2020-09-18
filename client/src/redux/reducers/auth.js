import { LOGIN } from '../actions/auth';

const initialState = {
    role: 'Guest'
}


export default (state = initialState, action) => {
    switch(action.type){
        case LOGIN:
            return action.payload;
    }
    return state;
}