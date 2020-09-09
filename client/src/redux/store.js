import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from './reducers/rootReducer';
import { fetchProducts } from './actions/actions'
import thunkMiddleware from 'redux-thunk'

//import { createLogger } from 'redux-logger'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, /* thunkMiddleware,  */composeEnhancers(
    applyMiddleware(thunkMiddleware)
  ));
/* const store = createStore(
	rootReducer,
	applyMiddleware(
		thunkMiddleware, 
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	), 
	
); */
store.subscribe(() => {console.log(store.getState())})

export default store;
