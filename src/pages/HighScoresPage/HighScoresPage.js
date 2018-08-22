import React from 'react';
import {Link} from 'react-router-dom';


const HighScorePage = (props) => {
    return (
        <div>
            <h1>High Scores</h1>
            {props.highScores.map(s => 
                <div>
                    <h1>Player:{s.initials}</h1>
                    <h1>Number of Guesses{s.numGuesses}</h1>
                    <h1>Time{s.seconds}</h1>
                </div>
            )}
        </div>
    )
}

export default HighScorePage;