import React, { Component } from 'react';
import './App.css';
// Must import components used in the JSX
import GameBoard from './components/GameBoard/GameBoard';
import ColorPicker from './components/ColorPicker/ColorPicker';
import NewGameButton from './components/NewGameButton/NewGameButton';

let headFootStyle = {
  height: 50,
  padding: 10,
  margin: '15px 0',
  color: 'grey',
  fontSize: 18,
  textAlign: 'center'
};

let colors = ['#4881B6', '#D1AD74', '#99C78E', '#F39A88'];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = this.getStateObject();
  }

  getStateObject() {
    return {
        colors,
        code: this.genCode(colors.length),
        selColorIdx: 0,
        guesses: [this.getNewGuess()],
      };
  }

  getNewGuess() {
    return {
      code: [null, null, null, null],
      score: {
        perfect: 0,
        almost: 0
      }
    };
  }


  genCode(size) {
    return new Array(4).fill().map(dummy => Math.floor(Math.random() * size));
  }

  getWinTries = () => {
    // if winner, return num guesses, otherwise 0 (no winner)
    let lastGuess = this.state.guesses.length - 1;
    return this.state.code.join() === this.state.guesses[lastGuess].code.join() ? lastGuess + 1 : 0;
  }

  //event handler
  handleColorSelection = (colorIdx) => {
    this.setState({ selColorIdx: colorIdx });
  }

  //event handler to start new game
 handleNewGame = () => {
   this.setState(this.getStateObject());
 }

  render() {
    let winTries = this.getWinTries();
    return (
      <div className="App">
        <header style={headFootStyle}>C H A R ' S &nbsp;&nbsp; M A S T E R M I N D</header>
        <div className="App-game">
          <GameBoard
            guesses={this.state.guesses}
            colors={this.state.colors}
          />
          <div className="App-controls">
            <ColorPicker
              handleColorSelection={this.handleColorSelection}
              selColorIdx={this.state.selColorIdx}
              colors={this.state.colors}
            />
            <NewGameButton handleNewGame={this.handleNewGame} />
          </div>
        </div>
        <footer style={headFootStyle}>{(winTries ? `You Won in ${winTries} Guesses!` : 'Good Luck!')}</footer>
      </div>
    );
  }
}

export default App;
