import React from 'react';
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";

class Game extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                Welcome {this.props.user['display_name']}
            </div>
        );
    }

}

const mapStateToProps = state => ({
    user: state.session.user
});

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Game);