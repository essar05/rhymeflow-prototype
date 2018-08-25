import React from 'react';
import {Redirect} from "react-router-dom";
import {bindActionCreators} from "redux";
import {logout} from "../actions/Session";
import {connect} from "react-redux";

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