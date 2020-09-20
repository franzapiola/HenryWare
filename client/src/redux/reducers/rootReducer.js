import { combineReducers } from 'redux'

import main from './main'
import Orders from './Orders';
import User from './User';
import orderInfo from './orderInfo';
import auth from './auth';
import review from './review';
import cart from './cart';
import order from './order'

export default combineReducers({

  cart,Orders, User,main,orderInfo, auth, review,order
})