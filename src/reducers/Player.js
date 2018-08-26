import * as types from '../constants/ActionTypes';
import {getDeltaTime} from "../utils/TimeUtils";

const initialState = {
    isPlaying: false,
    isPaused: false,
    currentPosition: 0,
    startPosition: 0,
    intervalId: null,
    startTime: null,
    trackId: ''
};

export default (state = initialState, action) => {
    switch (action.type) {

        case types.PLAYER_PLAY:
            return {
                ...state,
                isPlaying: true,
                isPaused: false,
                startTime: new Date(),
                startPosition: state.currentPosition
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
                currentPosition: 0,
                trackId: action.trackId
            };

        case types.PLAYER_INCREMENT_POSITION:
            const currentTime = new Date();
            return {
                ...state,
                currentPosition: state.startPosition + getDeltaTime(state.startTime, currentTime)
            };

        case types.PLAYER_SET_INTERVAL_ID:
            return {
                ...state,
                intervalId: action.intervalId
            };

        default:
            return state
    }
};

