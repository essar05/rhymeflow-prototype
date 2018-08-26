import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Route, Switch } from 'react-router-dom'
import { getRoutes } from "../constants/Routes";
import { ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { initAuth, getAuthenticatedUser } from "../actions/Session";
import RequireAuthentication from "../components/RequireAuthentication";
import NavBar from "../components/NavBar";
import LoadingSplash from "../components/LoadingSplash";

class App extends React.Component {

    componentDidMount() {
        this.props.initAuth();
    }

    render() {
        const { isLoading } = this.props;

        return (
            <React.Fragment>
                <ToastContainer transition={Flip}/>

                { isLoading ?
                    <LoadingSplash />
                    :
                    <RequireAuthentication>

                        <NavBar />

                        <main tabIndex={0} onKeyPress={this.onKeyPressed}>
                            <div className="container-fluid">
                                <Switch>
                                    {getRoutes().reverse().map(({path, exact = false, component}) => (
                                        <Route path={path} exact={exact} component={component} key={path} />
                                    ))}
                                </Switch>
                            </div>
                        </main>
                    </RequireAuthentication>
                }
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.session.isAuthenticated,
    isLoading: state.session.isRequesting,
    user: state.session.user
});

const mapDispatchToProps = dispatch => bindActionCreators({
    initAuth,
    getAuthenticatedUser
}, dispatch);

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(App));