import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import './App.css';
import GamePage from '../GamePage/GamePage';
import SettingsPage from '../SettingsPage/SettingsPage';


let colorTable = [
  {name: 'Easy', colors: ['#7CCCE5', '#FDE47F', '#E04644', '#B576AD']},
  {name: 'Moderate', colors: ['#7CCCE5', '#FDE47F', '#E04644', '#B576AD', '#B7D968']},
  {name: 'Difficult', colors: ['#7CCCE5', '#FDE47F', '#E04644', '#B576AD', '#B7D968', '#555E7B']}
];


class App extends Component {
  constructor(props) {
    super(props);
    this.state = Object.assign(
      {difficultyLevel: 0, colors: colorTable[0].colors},
      this.getInitialState()
    );
  }

  getInitialState() {
    let colorIdx = (this.state && this.state.difficultyLevel) || 0;
    return {
      code: this.genCode(colorTable[colorIdx].colors.length),
      selColorIdx: 0,
      guesses: [this.getNewGuess()],
      elapsedTime: 0,
      isTiming: true
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

  setDifficulty = (level) => {
    this.setState({
      difficultyLevel: level,
      colors: colorTable[level].colors
    });
  }

   /*-----Callback Methods ----*/

  handleColorSelection = (colorIdx) => {
     this.setState({ selColorIdx: colorIdx });
  }

 handleNewGame = () => {
  this.setState(this.getInitialState());
  }

  handlePegClick = (pegIdx) => {
    let currentGuessIdx = this.state.guesses.length - 1;

    // Always replace objects/arrays with NEW versions
    let guessesCopy = [...this.state.guesses];
    let codeArrCopy = [...guessesCopy[currentGuessIdx].code];

    // Update the NEW array
    codeArrCopy[pegIdx] = this.state.selColorIdx;

    // Update the NEW guesses array
    guessesCopy[currentGuessIdx].code = codeArrCopy;

    // Update state with the NEW guesses array
    this.setState({
      guesses: guessesCopy
    });
  }

  handleScoreButton = () => {
    let currentGuessIdx = this.state.guesses.length - 1;
    // Computing the score will modify the guessed code and the
    // secret code, therefore create copies of the originals
    let guessCodeCopy = [...this.state.guesses[currentGuessIdx].code];
    let secretCodeCopy = [...this.state.code];

    let perfect = 0, almost = 0;

    // First pass computes number of "perfect"
    guessCodeCopy.forEach((code, idx) => {
      if (secretCodeCopy[idx] === code) {
        perfect++;
        // ensure does not match again
        guessCodeCopy[idx] = secretCodeCopy[idx] = null;
      }
    });

    //Second pass computes number of 'almost'
    guessCodeCopy.forEach((code, idx) => {
      if (code === null) return;
      let foundIdx = secretCodeCopy.indexOf(code);
      if (foundIdx > -1) {
        almost++;
        secretCodeCopy[foundIdx] = null;
      }
    });

      // State must only be updated with NEW objects/arrays
    let guessesCopy = [...this.state.guesses];

    //Set scores
    guessesCopy[currentGuessIdx].score.perfect = perfect;
    guessesCopy[currentGuessIdx].score.almost = almost;

    //if perfect is not 4, game still go push in new guess
    if (perfect !== 4) this.state.guesses.push(this.getNewGuess());


    //update state with new guessess array
    this.setState({ 
      guesses: this.state.guesses 
    });
  }

  getWinTries = () => {
    // if winner, return num guesses, otherwise 0 (no winner)
    let lastGuess = this.state.guesses[this.state.guesses.length - 1];
    return lastGuess.score.perfect === 4 ? this.state.guesses.length : 0;
  }

/*---Lifecycle Methods---*/

 componentDidMount() {
  console.log('App: componentDidMount')
  }

  componentWillMount() {
  console.log('App: componentWillMount')
  }
 
 render() {
  console.log('App: render')
  return (
    <div>
      <header className='header-footer'>R E A C T &nbsp;&nbsp; M A S T E R M I N D</header>
      <Router>
          <Switch>
            <Route exact path='/' render={() =>
              <GamePage
                colors={this.state.colors}
                selColorIdx={this.state.selColorIdx}
                guesses={this.state.guesses}
                elapsedTime={this.state.elapsedTime}
                handleColorSelection={this.handleColorSelection}
                handleNewGameClick={this.handleNewGameClick}
                handlePegClick={this.handlePegClick}
                handleScoreClick={this.handleScoreClick}
              />}
            />
            <Route exact path='/settings' render={({history}) => 
              <SettingsPage
                colorTable={colorTable}
                difficultyLevel={this.state.difficultyLevel}
                handleDifficultyChange={this.setDifficulty}
                handleNewGame={this.handleNewGameClick}
                history={history}
              />
            }/>
          </Switch>
      </Router>
    </div>
    );
  }
}

export default App;
