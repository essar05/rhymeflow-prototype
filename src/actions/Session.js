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

    dispatch(setUserRequesting());
    const user = await SpotifyAPI.get('/me');
    dispatch(login(user.data));
};

export const logout = () => {
    localStorage.removeItem('spotifyAccessToken');

    return {
        type: types.SESSION_LOGOUT
    }
};

export const login = (user = null) => ({
    type: types.SESSION_LOGIN,
    user
});

export const setUserRequesting = (isRequesting = true) => ({
    type: types.SESSION_REQUESTING_USER,
    isRequesting
});