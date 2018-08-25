import React from 'react';
import {Route, Switch} from "react-router-dom";
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import DoLogin from "../containers/DoLogin";
import Login from "./Login";

const RequireAuthentication = ({isAuthenticated, ...props}) => {
    if(!isAuthenticated) {
        return (
            <Switch>
                <Route path='/login' exact component={DoLogin} />
                <Route path='/' component={Login} />
            </Switch>
        );
    }

    return props.children;
};

const mapStateToProps = state => ({
    isAuthenticated: state.session.isAuthenticated
});

export default connect(
    mapStateToProps, {}
)(RequireAuthentication);