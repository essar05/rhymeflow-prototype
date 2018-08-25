import React from 'react';

const redirectToSpotify = () => {
    window.location.href = 'https://accounts.spotify.com/authorize' +
        '?client_id=b653abd1e6034e239ff50710f73a210e' +
        '&response_type=token' +
        '&redirect_uri=' + encodeURI('http://localhost:3000/login');
};

const Login = () => {
    return (
        <div>
            <button onClick={redirectToSpotify}>Login with Spotify</button>
        </div>
    );
};

export default Login;