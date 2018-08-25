import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import sessionReducer from './Session'

export default combineReducers({
    routing: routerReducer,
    session: sessionReducer
});