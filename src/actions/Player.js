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
    } catch(error) {
        toast.error('Unknown error occurred while trying to start playback');
    }
};

export const pause = () => async (dispatch) => {
    try {
        await SpotifyAPI.put('/me/player/pause');

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
