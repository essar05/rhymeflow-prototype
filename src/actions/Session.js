import * as types from '../constants/ActionTypes';
import SpotifyAPI, { setAuthenticationToken } from '../services/SpotifyAPI'

export const initAuth = () => (dispatch) => {
    const accessToken = localStorage.getItem('spotifyAccessToken');

    if(accessToken) {
        //validate access token
        setAuthenticationToken(accessToken);
        dispatch(getAuthenticatedUser());
    }
};

export const getAuthenticatedUser = () => async (dispatch, getState) => {
    const requested = getState().session.user !== null;
    if(requested) return;

    const user = await SpotifyAPI.get('/me');
    dispatch(login(user.data));
};

export const login = (user = null) => ({
    type: types.SESSION_LOGIN,
    user
});