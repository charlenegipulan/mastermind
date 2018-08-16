import React from 'react';

const GuessPeg = (props) => {
  let style = {
    width: 40,
    height: 40,
    margin: 5,
    borderRadius: '50%',
    backgroundColor: props.color,
    opacity: 0.85,
    border: props.color || '1px dashed gray',
    cursor: props.currentGuess && 'pointer'
  };

  return (
    //make only the pegs from current row clickable
    <div style={style} onClick={props.currentGuess ? props.handleColorPick : null }/>
  );
}

export default GuessPeg;
