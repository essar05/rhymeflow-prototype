import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Route, Switch } from 'react-router-dom'
import { ToastContainer, Flip } from 'react-toastify';
import { getRoutes } from "../constants/Routes";
import 'react-toastify/dist/ReactToastify.min.css';

class App extends React.Component {

    componentDidMount() {

    }

    componentDidUpdate() {

    }

    render() {
        return (
            <div>
                <ToastContainer transition={Flip}/>

                <main>
                    <div className="container-fluid">
                        <Switch>
                            {getRoutes().reverse().map(({path, exact = false, component}) => (
                                <Route path={path} exact={exact} component={component} key={path} />
                            ))}
                        </Switch>
                    </div>
                </main>
            </div>
        );
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch);

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(App));