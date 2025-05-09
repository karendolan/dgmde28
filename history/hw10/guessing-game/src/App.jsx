/**
 * DGMD E-28 Assignment: React JSX
 * Guessing Game, Karen Dolan, May 7, 2025
 */
import { useState, useContext, createContext } from 'react'
import { Routes, Route, Link } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import './App.css'

// Create a data context
const GameContext = createContext();

// ------------------------
// The Routes of the app, showing all possible page paths
function MyRouteApp() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Game />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="dist" element={<Game />} />
        <Route path="dist/" element={<Game />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

// ------------------------
// The nav bar, the current page is emphasized
function Nav(props) {
  const { curPage } = props;
  return (
    <div id='main-nav'>
      <span className={curPage === 'Game' ? 'bold' : ''}>
        <Link to="/">Game</Link>
      </span>
      <span className={curPage === 'Stats' ? 'bold' : ''}>
        <Link to="/stats">Stats</Link>
      </span>
      <span className={curPage === 'Settings' ? 'bold' : ''}>
        <Link to="/settings">Settings</Link>
      </span>
    </div>
  );
}

// ------------------------
// The Header that includes the nav bar
function Header(props) {
  // Receive title of the page as a prop, with fun fallback
  const {
    title = "Good Day!",
  } = props;

  return (
    <div className='header'>
      <div className='gameName title headElem'>Guessing Game</div>
      <h1 className='page-title headElem'>{title}</h1>
      <Nav
        curPage={title}
      />
    </div>
  )
}

// ------------------------
// The main Game/Home page
function Game() {
  // Debug helper
  const isDebug = false;
  // Retrieve context and it's setter
  const { context, handleUpdate } = useContext(GameContext);
  // Destructure the context
  const {
    maxGuesses,
    min,
    max,
    triesPerWin,
  } = context;
  // calculate the initial number to guess
  function getRandomNumToGuess() {
    return Number.parseInt(Math.random() * (max - min)) + min;
  }
  // Set local state to track current guess, guesses in this game, and the random number to guess per game
  const [curGuess, setCurGuess] = useState();
  const [guesses, setGuesses] = useState([]);
  const [numToGuess, setNumToGuess] = useState(getRandomNumToGuess())

  // Sub-function to handle the guess
  function handleGuess(e) {
    // Prevent form submission from refreshing page
    e.preventDefault();
    // Convert the guess to a number
    const curNum = Number(curGuess);
    if (curNum === numToGuess) {
      // Save the number of guesses for the win to the game context
      handleUpdate({
        ...context,
        triesPerWin: [...triesPerWin, guesses.length],
      });
    }
    // Add the current guess to the set of guesses
    setGuesses((g) => [...g, curNum]);
    // Reset the current guess
    setCurGuess('');
  }

  // Reset Game
  function newGame() {
    setCurGuess('');
    setGuesses([]);
    setNumToGuess(getRandomNumToGuess());
  }

  // Check if this is a win
  const isWin = guesses.find(g => g === numToGuess);
  const isLoose = !isWin && (maxGuesses <= guesses.length);
  const guessesLeft =  maxGuesses - guesses.length;

  // Return the JSX of the Game component
  return (
    <div className='page'>
      <Header
        title="Game"
      />
      <div className='game-content center'>
        {guesses.map((guess, i) => {
          let text;
          if (guess > numToGuess) text = 'is too high';
          if (guess < numToGuess) text = 'is too low';
          if (guess == numToGuess) text = 'is right! CONGRATULATIONS';
          return (
            <div key={i}>
              {guess}
              {' '}
              {text}
            </div>
          )
        })}
        {isWin && (
          <div className="gameName">
            You Won in {guesses.length} guess{guesses.length > 1 ?  'es' : ''}!
          </div>
        )}
        {isLoose && (
          <div className="gameName">
            You ran out of guesses. The number was {numToGuess}. Try again!
          </div>
        )}
        {!isWin && !isLoose && (
          <>
            <div>
              You have {guessesLeft} chance{guessesLeft > 1 ? 's' : ''} to guess correctly!
            </div>
            <form className='Guess-form center' onSubmit={handleGuess}>
            <label>
              Guess a number from {min} to {max}! {isDebug ? `(${numToGuess})` : ''}
              <input
                className='Game-guess-input'
                type='number' name='guess' value={curGuess}
                min={min} max={max}
                onChange={(e) => setCurGuess(e.target.value)}
              />
            </label>
          </form>
          </>
        )}
        {(isWin || isLoose) && (
          <button onClick={newGame}>Play again</button>
        )}
      </div>
    </div>
  )
}

// ------------------------
// The page not found page
function NotFound() {
  return (
    <div className='page'>
      <Header
        title="Ooops!"
      />
      <div className='center'>
        This page is not in service.
        <div>
          Please go <a href="/">Home</a>!
        </div>
      </div>
    </div>
  )
}

// -----------------------
// The status page
function Stats() {
  // Retrieve context
  const { context } = useContext(GameContext);
  // Destructure the context
  const { triesPerWin } = context;
  // Get the average tries per win
  const totalGuesses = triesPerWin.reduce((total, num) => total + num, 0)
  const avgGuesses = totalGuesses === 0 ? 0 : totalGuesses/triesPerWin.length;

  return (

    <div className='page'>
      <Header
        title="Stats"
      />
      <div className='center'>
        <div>
          <div>
            You have won {triesPerWin.length} game{triesPerWin.length == 1 ? '' : 's'}
          </div>
          <div>
            Your average number of guesses to win is {avgGuesses}
          </div>
        </div>
      </div>
    </div>
  )
}

// ------------------------
// The Settings page
function Settings() {
  // local constants to limit the game range
  const MIN_VALUE = 0;
  const MAX_VALUE = 1000000;

  // Retrieve context and it's setter
  const { context, handleUpdate } = useContext(GameContext);
  const { min, max, maxGuesses } = context;

  // Set local state
  const [msg, setMsg] = useState();
  const [newMin, setNewMin] = useState(min);
  const [newMax, setNewMax] = useState(max);
  const [newMaxGuesses, setNewMaxGuesses] = useState(maxGuesses);

  // Helper to check valid numbers
  function isValidSettings() {
    let isValid = true;
    if (Number(newMin) >= Number(newMax)) {
      setMsg(`The minimum ${newMin} must be less than the max ${newMax}. `);
      isValid = false;
    } else {
      setMsg(`The guess range is set from ${newMin} to ${newMax} with ${newMaxGuesses} tries`);
    }
    return isValid;
  }

  // Update the context
  function handleSubmit(e) {
    e.preventDefault();
    // Check if valid
    if (isValidSettings()) {
      handleUpdate({
        ...context,
        min: newMin,
        max: newMax,
        maxGuesses: newMaxGuesses,
      });
    }
  };

  return (

    <div className='page'>
      <Header
        title="Settings"
      />
      <div className='center'>
        <div>
          <div className="gameName">
            {msg}
          </div>
          <div>
            <form className="inputForm" onSubmit={handleSubmit}>
              <label>
                Minimum number
                <input type='number' min={ MIN_VALUE } max={MAX_VALUE - 1 } name='min' value={newMin} onChange={(e) => setNewMin(e.target.value)} />
              </label>
              <label>
                Maximum number
                <input type='number' min={ MIN_VALUE + 1 } max={MAX_VALUE} name='max' value={newMax} onChange={(e) => setNewMax(e.target.value)} />
              </label>
              <label>
                Maximum number of guesses
                <input type='number' name='maxGuesses' value={newMaxGuesses} onChange={(e) => setNewMaxGuesses(e.target.value)} />
              </label>
              <input type="submit" min={MIN_VALUE} max={MAX_VALUE}  value="Update Settings" />
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

// ------------------------
// ------------------------
// The main App entry point
function App() {
  // Set defaults in the initial context
  var [context, setContext] = useState({
    // default min range
    min: 0,
    // default max range
    max: 100,
    // default number of guesses per game
    maxGuesses: 6,
    // Array that holds the number of tries per each win
    triesPerWin: [],
  });

  function handleUpdate(newContext) {
    setContext(newContext);
  }

  // The App wraps the routes in the global context
  return (
    <GameContext.Provider value={{ context, handleUpdate }}>
      <Router>
        <MyRouteApp />
      </Router>
    </GameContext.Provider>
  )
}

export default App
