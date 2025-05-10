/**
 * DGMD E-28 Final Project
 * Subtopic Choice, Karen Dolan, May, 2025
 */
import { useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom';

// Import functions
import ChooseRouter from './components/ChooseRouter';
import ChooseContext from './objects/ChooseContext';

// Import test data
import catOptionData from './data/cats';

// Import the style
import './App.css'

// ----------------------------------
// The main App entry point
function App() {
  // Set defaults in the initial context
  var [context, setContext] = useState({
    // The Option objects to choose from
    choiceOptions: catOptionData,
    // Stock main topic options
    topicOptions: ['cats', 'dogs', 'cars', 'trees', 'fruit'],
    // The initial topic associated to the subtopics
    currTopic: 'cats',
  });

  function handleUpdate(newContext) {
    setContext(newContext);
  }

  // The App wraps the routes in the global context
  return (
    <ChooseContext.Provider value={{ context, handleUpdate }}>
      <Router>
        <ChooseRouter />
      </Router>
    </ChooseContext.Provider>
  )
}

export default App
