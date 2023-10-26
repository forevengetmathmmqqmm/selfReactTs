import { combineReducers } from 'redux';
import user from './reducers/user';
import app from './reducers/app';
import web3 from './reducers/web3';
export default combineReducers({
  user,
  app,
  web3,
})