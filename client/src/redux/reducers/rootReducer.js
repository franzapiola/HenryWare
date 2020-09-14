import { combineReducers } from 'redux'

import main from './main'
import cart from './cart';
import Orders from './Orders';
import User from './User'

export default combineReducers({
  cart, Orders, User, main

})