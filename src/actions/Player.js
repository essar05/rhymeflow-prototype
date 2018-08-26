import * as types from '../constants/ActionTypes';
import SpotifyAPI from '../services/SpotifyAPI'
import { toast } from 'react-toastify';

export const play = () => async (dispatch, getState) => {
    let data = null;
    const isPaused = getState().player.isPaused;

    if(!isPaused) {
        const trackId = getState().player.trackId;

        data = {
            uris: ['spotify:track:' + trackId]
        };
    }

    try {
        await SpotifyAPI.put('/me/player/play', data);

        dispatch({
            type: types.PLAYER_PLAY
        });

        let intervalId = setInterval(() => {
            dispatch({
                type: types.PLAYER_INCREMENT_POSITION
            });
        }, 50);

        dispatch({
            type: types.PLAYER_SET_INTERVAL_ID,
            intervalId
        });


    } catch(error) {
        toast.error('Unknown error occurred while trying to start playback');
    }
};

export const pause = () => async (dispatch, getState) => {
    try {
        await SpotifyAPI.put('/me/player/pause');

        clearInterval(getState().player.intervalId);

        dispatch({
            type: types.PLAYER_PAUSE
        });
    } catch(error) {
        toast.error('Error occurred while trying to pause playback');
    }
};

export const setTrack = (trackId) => ({
    type: types.PLAYER_SET_TRACK,
    trackId: trackId
});
