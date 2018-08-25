import React from 'react';
import {Button} from "reactstrap";
import '../styles/Login.css'

const redirectToSpotify = () => {
    window.location.href = 'https://accounts.spotify.com/authorize' +
        '?client_id=b653abd1e6034e239ff50710f73a210e' +
        '&response_type=token' +
        '&redirect_uri=' + encodeURI('http://localhost:3000/login') +
        '&scope=' + encodeURI('user-modify-playback-state');
};

const Login = () => {
    return (
        <div className="login-container">
            <h1 className='logo'>RhymeFlow</h1>
            <br />
            <Button color='primary' onClick={redirectToSpotify}>Login with Spotify</Button>
        </div>
    );
};

export default Login;