import { createStore, applyMiddleware } from "redux";
import rootReducer from './reducers/rootReducer';
import { getProducts } from './actions/actions'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'


const store = createStore(
	rootReducer,
    applyMiddleware(thunkMiddleware)
	);


	//store.dispatch(getProducts()).then(() => console.log('Estado con funcion asincrona', store.getState()))
export default store;
