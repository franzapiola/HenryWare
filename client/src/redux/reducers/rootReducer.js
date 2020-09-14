import { combineReducers } from 'redux'
import cart from './cart'
import main from './main'

export default combineReducers({
  cart,
  main
})