import React from 'react';
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import {Button, Col, Row} from "reactstrap";
import {play,pause,setTrack} from "../actions/Player";
import AnalysisTimeline from '../components/AnalysisTimeline'

class Game extends React.Component {

    constructor(props) {
        super(props);

        this.onTogglePlayback = this.onTogglePlayback.bind(this);
    }

    componentDidMount() {
        this.props.setTrack('7KXjTSCq5nL1LoYtL7XAwS');
    }

    onTogglePlayback() {
        if(!this.props.isPlaying) {
            this.props.play();
        } else {
            this.props.pause();
        }
    }

    render() {
        const {isPlaying} = this.props;

        return (
            <React.Fragment>
                <Row>
                    <Col>
                        <Button color='primary' onClick={this.onTogglePlayback}>
                            {isPlaying ?
                                <i className="fa fa-pause"></i>
                                :
                                <i className="fa fa-play"></i>
                            }
                        </Button>
                    </Col>
                </Row>
                <br/>
                <AnalysisTimeline />
                <Row>
                    <Col>
                        [Intro]<br />
                        Nobody pray for me<br />
                        It's been that day for me<br />
                        Waaaaay (yeah, yeah!)<br />
                        <br />
                        [Verse 1]<br />
                        Ayy, I remember syrup sandwiches and crime allowances<br />
                        Finesse a nigga with some counterfeits, but now I’m countin' this<br />
                        Parmesan where my accountant lives, in fact I'm downin’ this<br />
                        D'USSÉ with my boo bae tastes like Kool-Aid for the analysts<br />
                        Girl, I can buy yo' ass the world with my paystub<br />
                        Ooh, that pussy good, won't you sit it on my taste bloods?<br />
                        I get way too petty once you let me do the extras<br />
                        Pull up on your block, then break it down: we playin' Tetris<br />
                        A.M. to the P.M., P.M. to the A.M., funk<br />
                        Piss out your per diem, you just gotta hate 'em, funk<br />
                        If I quit your BM, I still ride Mercedes, funk<br />
                        If I quit this season, I still be the greatest, funk<br />
                        My left stroke just went viral<br />
                        Right stroke put lil' baby in a spiral<br />
                        Soprano C, we like to keep it on a high note<br />
                        It's levels to it, you and I know<br />
                    </Col>
                </Row>

            </React.Fragment>
        );
    }

}

const mapStateToProps = state => ({
    isPlaying: state.player.isPlaying
});

const mapDispatchToProps = dispatch => bindActionCreators({
    play,
    pause,
    setTrack
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Game);