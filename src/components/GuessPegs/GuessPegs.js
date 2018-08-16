import React from 'react';
import GuessPeg from '../GuessPeg/GuessPeg';
import './GuessPegs.css';

const GuessPegs = (props) => {
  return (
    <div className="GuessPegs">
      <GuessPeg 
        currentGuess={props.currentGuess} 
        color={props.colors[props.code[0]]}
        handleColorPick={() => props.handleColorPick(0)}/>
      <GuessPeg 
        currentGuess={props.currentGuess} 
        color={props.colors[props.code[1]]}
        handleColorPick={() => props.handleColorPick(1)}/>
      <GuessPeg 
        currentGuess={props.currentGuess} 
        color={props.colors[props.code[2]]}
        handleColorPick={() => props.handleColorPick(2)}/>
      <GuessPeg 
        currentGuess={props.currentGuess} 
        color={props.colors[props.code[3]]}
        handleColorPick={() => props.handleColorPick(2)}/>
    </div>
  );
}

export default GuessPegs;
