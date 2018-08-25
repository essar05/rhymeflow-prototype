import * as types from '../constants/ActionTypes';

const initialState = {
    isAuthenticated: false,
    isRequesting: false,
    user: null
};

export default (state = initialState, action) => {
    switch (action.type) {

        case types.SESSION_LOGIN:
            return {
                ...state,
                isRequesting: false,
                isAuthenticated: true,
                user: action.user
            };

        case types.SESSION_REQUESTING_USER:
            return {
                ...state,
                isRequesting: action.isRequesting
            };

        case types.SESSION_LOGOUT:
            return {
                ...state,
                isAuthenticated: false
            }

        default:
            return state
    }
};

