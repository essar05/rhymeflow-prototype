import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Route, Switch } from 'react-router-dom'
import { getRoutes } from "../constants/Routes";
import { ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { initAuth, getAuthenticatedUser } from "../actions/Session";
import Login from "../components/Login";
import DoLogin from "../components/DoLogin";

class App extends React.Component {

    componentDidMount() {
        this.props.initAuth();
    }

    componentDidUpdate() {
        if(this.props.isAuthenticated) {
            this.props.getAuthenticatedUser();
        }
    }

    render() {
        const { isAuthenticated } = this.props;

        return (
            <div>
                <ToastContainer transition={Flip}/>

                <main>
                    <div className="container-fluid">
                        {
                            !isAuthenticated &&
                            <Switch>
                                <Route path='/login' exact component={DoLogin} />
                                <Route path='/' component={Login} />
                            </Switch>
                        }

                        {
                            isAuthenticated &&
                            <Switch>
                                {getRoutes().reverse().map(({path, exact = false, component}) => (
                                    <Route path={path} exact={exact} component={component} key={path} />
                                ))}
                            </Switch>
                        }
                    </div>
                </main>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.session.isAuthenticated
});

const mapDispatchToProps = dispatch => bindActionCreators({
    initAuth,
    getAuthenticatedUser
}, dispatch);

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(App));