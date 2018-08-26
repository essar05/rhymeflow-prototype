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

        let intervalId = setInterval(async () => {
            dispatch(getPlaybackStatus((isPlaying) => {
                if(isPlaying === null){
                    clearInterval(intervalId);
                }
                if(isPlaying === true) {
                    clearInterval(intervalId);
                    intervalId = setInterval(async () => {
                        dispatch(getPlaybackStatus((isPlaying) => {
                            if(isPlaying === null){
                                clearInterval(intervalId);
                            }
                            if(isPlaying === false) {
                                clearInterval(intervalId);
                                clearInterval(getState().player.intervalId);
                                dispatch({
                                    type: types.PLAYER_PAUSE
                                });
                            }
                        }));
                    }, 1000);
                }
            }));
        }, 100);

        /*
        dispatch({
            type: types.PLAYER_PLAY
        });*/
    } catch(error) {
        toast.error('Unknown error occurred while trying to start playback');
    }
};

export const pause = () => async (dispatch, getState) => {
    try {
        await SpotifyAPI.put('/me/player/pause');

        clearInterval(getState().player.intervalId);

        /*
        dispatch({
            type: types.PLAYER_PAUSE
        });*/
    } catch(error) {
        toast.error('Error occurred while trying to pause playback');
    }
};


export const getPlaybackStatus = (callback) => async (dispatch, getState) => {
    try {
        const response = await SpotifyAPI.get('/me/player/currently-playing');

        clearInterval(getState().player.intervalId);

        dispatch({
            type: types.PLAYER_GET_PLAYBACK_STATUS,
            isPlaying: response.data.is_playing,
            duration: response.data.hasOwnProperty('item') ? response.data.item.duration_ms : 0,
            currentPosition: response.data.progress_ms,
            startPosition: response.data.progress_ms
        });

        if(response.data.is_playing) {
            let intervalId = setInterval(() => {
                dispatch({
                    type: types.PLAYER_INCREMENT_POSITION
                });
            }, 50);

            dispatch({
                type: types.PLAYER_SET_INTERVAL_ID,
                intervalId
            });
        }

        callback(response.data.is_playing);
    } catch(error) {
        callback(null);
        toast.error('Error occurred while trying to pause playback');
    }
};

export const setTrack = (trackId) => ({
    type: types.PLAYER_SET_TRACK,
    trackId: trackId
});
