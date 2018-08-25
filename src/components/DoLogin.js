import React from 'react';
import {Redirect} from "react-router-dom";
import {bindActionCreators} from "redux";
import {initAuth} from "../actions/Session";
import queryString from 'query-string'
import connect from "react-redux/es/connect/connect";

const setAccessToken = (locationHash, isAuthenticated, callback) => {
    if(isAuthenticated) return;

    const params = queryString.parse(locationHash);

    if(Object.prototype.hasOwnProperty.call(params, 'access_token')) {
        localStorage.setItem('spotifyAccessToken', params['access_token']);
    }

    callback();
};

const DoLogin = ({location, isAuthenticated, initAuth}) => {
    setAccessToken(location.hash, isAuthenticated, () => {
        initAuth();
    });

    return (
        <Redirect to='/' />
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.session.isAuthenticated
});

const mapDispatchToProps = dispatch => bindActionCreators({
    initAuth
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DoLogin);