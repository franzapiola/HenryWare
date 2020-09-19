import { LOAD_USER_DATA } from '../actions/auth';

const initialState = {
    role: 'Guest'
}

export default (state = initialState, action) => {
    switch(action.type){
        case LOAD_USER_DATA:
            return action.payload;
    }
    return state;
}