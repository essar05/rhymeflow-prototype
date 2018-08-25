import axios from 'axios';

const SpotifyAPI = axios.create({
    baseURL: 'https://api.spotify.com/v1'
});

export const setAuthenticationToken = (token) => {
    SpotifyAPI.defaults.headers.common['Authorization'] =  'Bearer ' + token;
};

export default SpotifyAPI;