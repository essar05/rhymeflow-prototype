import React from 'react';
import lyrics from '../constants/Lyrics'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import '../styles/AnalysisTimeline.css'

class AnalysisTimeline extends React.Component {

    constructor(props) {
        super(props);

        let words = [];
        for(let barIndex in lyrics) {
            let bar = lyrics[barIndex];
            let wordsInBar = [];
            if(bar.charAt(0) === "[") {
                continue;
            }
            if(bar === '') {
                continue;
            }
            wordsInBar = bar.split(' ');
            words.push(wordsInBar);
        }

        this.state = {
            currentBar: -1,
            currentWord: 0,
            words: words,
            timeline: []
        };

        this.timelineRef = React.createRef();

        this.onKeyPressed = this.onKeyPressed.bind(this);
    }

    componentDidUpdate() {
        const scrollWidth = this.timelineRef.current.scrollWidth;
        const width = this.timelineRef.current.clientWidth;
        const scrollTo = parseInt(this.props.position / this.props.duration * scrollWidth) - width / 2;

        if(scrollTo > 0 && scrollTo < scrollWidth - width) {
            this.timelineRef.current.scrollLeft = scrollTo;
        }
    }

    onKeyPressed(e) {
        if(!this.props.isPlaying) return;

        const { words } = this.state;
        const { position } = this.props;
        let { currentWord, currentBar, timeline  } = this.state;

        if(currentBar === -1) {
            currentBar++;
        } else {
            let lastWordIndex = timeline.length - 1;
            if(lastWordIndex >= 0) {
                timeline[lastWordIndex].length = position - timeline[lastWordIndex].position;
            }

            if(currentWord === words[currentBar].length - 1) {
                if(currentBar === words.length - 1) {
                    return;
                }
                currentBar++;
                currentWord = 0;
            } else {
                currentWord++;
            }
        }

        timeline.push({
            word: words[currentBar][currentWord],
            position: position,
            length: null,
            row: 0
        });

        this.setState({
            ...this.state,
            timeline: [
                ...timeline
            ],
            currentBar: currentBar,
            currentWord: currentWord
        });
    }

    render() {
        return (
            <div tabIndex={0} onKeyPress={this.onKeyPressed}>
                isPlaying: {this.props.isPlaying ? "yes" : "no"} <br/>
                position: {this.props.position}
                <p>{this.state.currentBar > -1 ? this.state.words[this.state.currentBar][this.state.currentWord] : '-'}</p>
                <div className='analysis-timeline-wrapper' ref={this.timelineRef}>
                    <div className='analysis-timeline'>
                        <div className='cursor' style={{left: (this.props.position/this.props.duration * 100) + '%'}}>
                        </div>
                        {
                            this.state.timeline.map((entry) => {
                                if(entry.length === null) return '';
                                return (
                                    <div className='entry' key={entry.position} style={{width: (entry.length / this.props.duration * 100) + '%', top: (entry.row * 20) + 'px', left: (entry.position/this.props.duration * 100) + '%'}}>
                                        {entry.word}
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => ({
    isPlaying: state.player.isPlaying,
    position: state.player.currentPosition,
    duration: state.player.duration
});

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch);

export default connect(
    mapStateToProps, mapDispatchToProps
)(AnalysisTimeline);