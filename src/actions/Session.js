import * as types from '../constants/ActionTypes';
import { toast } from 'react-toastify';
import SpotifyAPI, { setAuthenticationToken } from '../services/SpotifyAPI';

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
    if (requested) return;

    dispatch(setUserRequesting());
    try {
        const response = await SpotifyAPI.get('/me');
        dispatch(login(response.data));
    } catch(error) {
        toast.error('You have been logged out');
        dispatch(setUserRequesting(false));
        dispatch(logout());
    }
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