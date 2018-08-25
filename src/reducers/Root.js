import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import sessionReducer from './Session'
import playerReducer from './Player'

export default combineReducers({
    routing: routerReducer,
    session: sessionReducer,
    player: playerReducer
});