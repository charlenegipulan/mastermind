import React, { Component } from 'react';
import './GameTimer.css';

function formatTime(seconds) {
    return `${Math.floor(seconds / 60).toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;
}

class GameTimer extends Component {

    //start timer 
    componentDidMount() {
        this.timerId = setInterval(() => {
            if (this.props.isTiming) this.props.handleTick();
            },1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    };

    render() {
        return(
            <div className="GameTimer">
                {formatTime(this.props.elapsedTime)}
            </div>
        );
    }
}

export default GameTimer;