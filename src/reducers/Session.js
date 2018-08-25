import * as types from '../constants/ActionTypes';

const initialState = {
    isAuthenticated: false,
    user: null
};

export default (state = initialState, action) => {
    switch (action.type) {

        case types.SESSION_LOGIN:
            return {
                ...state,
                isAuthenticated: true,
                user: action.user
            };

        default:
            return state
    }
};

