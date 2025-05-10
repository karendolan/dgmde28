/**
 * DGMD E-28 Final Project
 * Subtopic Choice, Karen Dolan, May, 2025
 */
import { useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom';

// Import objects
import OptionObject from './objects/OptionObject';

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

  const initialTopic = 'cats';
  // Set defaults in the initial context
  var [context, setContext] = useState({
    // The Option objects to choose from
    choiceOptions: getOptions(initialTopic),
    // Stock main topic options
    topicOptions: [initialTopic, 'dogs', 'cars', 'trees', 'fruit'],
    // The initial topic associated to the subtopics
    currTopic: initialTopic,
  });

  function getOptions(topic) {
    console.log('catOptionData: ', catOptionData)
    const options = catOptionData.map((o, i) => {
      const {id, name, description, image, temperament, origin, life_span, wikipedia_url} = o;
      return new OptionObject ({
        id,
        topic,
        subtopic: name,
        description,
        image,
        attribute: temperament,
        origin,
        life_span,
        wikipedia_url,
        position: i + 1
      });
    })
    console.log('Objects ', options);
    return options;
  }

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
