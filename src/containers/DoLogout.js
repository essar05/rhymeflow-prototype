import React from 'react';
import {Redirect} from "react-router-dom";
import {bindActionCreators} from "redux";
import {logout} from "../actions/Session";
import queryString from 'query-string'
import {connect} from "react-redux";

const setAccessToken = (locationHash, isAuthenticated, callback) => {
    if(isAuthenticated) return;

    const params = queryString.parse(locationHash);

    if(Object.prototype.hasOwnProperty.call(params, 'access_token')) {
        localStorage.setItem('spotifyAccessToken', params['access_token']);
    }

    callback();
};

const DoLogout = ({logout}) => {
    logout();

    return (
        <Redirect to='/' />
    );
};

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => bindActionCreators({
    logout
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DoLogout);