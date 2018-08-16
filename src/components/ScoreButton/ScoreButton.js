import React from 'react';

const ScoreButton = (props) => {
  return (
    <button className="btn btn-default" style={{padding: '2px 6px'}} disabled={props.code.includes(null)}>
      ✔
    </button>
  );
}


export default ScoreButton;
