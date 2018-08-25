import * as types from '../constants/ActionTypes';

const initialState = {
    isPlaying: false,
    isPaused: false,
    trackId: '7KXjTSCq5nL1LoYtL7XAwS'
};

export default (state = initialState, action) => {
    switch (action.type) {

        case types.PLAYER_PLAY:
            return {
                ...state,
                isPlaying: true,
                isPaused: false
            };

        case types.PLAYER_PAUSE:
            return {
                ...state,
                isPlaying: false,
                isPaused: true
            };

        case types.PLAYER_SET_TRACK:
            return {
                ...state,
                isPlaying: false,
                isPaused: false,
                trackId: action.trackId
            };

        default:
            return state
    }
};

