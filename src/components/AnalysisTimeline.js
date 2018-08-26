import React from 'react';
import analysis from '../constants/AnalysisTemp'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

class AnalysisTimeline extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            analysis: analysis
        };
    }

    render() {
        return (
            <div>
                isPlaying: {this.props.isPlaying ? "yes" : "no"} <br/>
                position: {this.props.position}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isPlaying: state.player.isPlaying,
    position: state.player.currentPosition
});

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch);

export default connect(
    mapStateToProps, mapDispatchToProps
)(AnalysisTimeline);