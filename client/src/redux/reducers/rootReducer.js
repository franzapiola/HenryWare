import { combineReducers } from 'redux'

import main from './main'
import cart from './cart';
import Orders from './Orders';
import User from './User';
import order from './order';
import orderInfo from './orderInfo';

export default combineReducers({

  cart, Orders, User,order,main,orderInfo
})