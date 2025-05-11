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
import { saveLocalStorage, getLocalStorage } from './functions/LocalStorage';

// Import test data
import catOptionData from './data/cats';
import dogOptionData from './data/dogs';

// Import the style
import './App.css'

// ----------------------------------
// The main App entry point
function App() {

  /**
   * Helper to create a fresh context for a new topic
   * @param {string} topic
   * @returns
   */
  function getFreshTopicContext(topic) {
    const freshContext = {
      // The Option objects to choose from
      choiceOptions: getOptions(topic),
      // Stock main topic options
      topicOptions: ['cats', 'dogs'],
      // The initial topic associated to the subtopics
      currTopic: topic,
      // Summary text
      choiceSummaryNote: '',
    }
    return freshContext;
  }

  // Default initial topic for the app
  const initialTopic = 'cats';
  // Update the context with saved context from local storage
  let initialContext;
  const savedContext = getLocalStorage(initialTopic);
  if (savedContext && savedContext.currTopic === initialTopic) {
    const {choiceOptions, topicOptions, currTopic, choiceSummaryNote} = savedContext;
    initialContext = {
      // The Option objects to choose from, will build from the data saved to local storage
      choiceOptions: getOptions(initialTopic, choiceOptions),
      // Stock main topic options
      topicOptions: topicOptions,
      // This is the same as initialTopic
      currTopic,
      // Summary text
      choiceSummaryNote,
    }
  } else {
    // Create a fresh context
    initialContext = getFreshTopicContext(initialTopic);
  }

  // Set defaults in the initial context
  const [context, setContext] = useState(initialContext);

  /**
   * Helper to instantiate a collection of Option Objects
   * @param {string} topic
   * @param {object} topicData
   * @returns
   */
  function getOptions(topic, topicData) {
    // inbound existing topic data for storage has first priority
    // TODO: if API exists, use that to retrieve new data from the catapi or thedog api
    // For now, use stock data from file & save and retrieve from local storage
    let optionInput = topicData;
    // Otherwise, get stock data
    if (!optionInput) {
      switch (topic) {
        case 'cats': {
           optionInput = catOptionData;
           break;
        }
        case 'dogs': {
           optionInput = dogOptionData;
           break;
        }
        default: {
          console.log('Unsupported topic!');
        }
      }
    }
    const options = optionInput.map((o, i) => {
      const {id, name, subtopic, description, image, temperament, attribute, breed_group, origin, life_span, wikipedia_url, position, note} = o;
      return new OptionObject ({
        id,
        topic,
        subtopic: name || subtopic ,
        description: description || breed_group,
        image,
        attribute: temperament || attribute,
        origin,
        life_span,
        wikipedia_url,
        position: position ? position : i + 1,
        note,
      });
    })
    console.log('Objects ', options);
    return options;
  }

  function handleUpdate(newContext) {
    const { currTopic } = newContext;
    // check for topic change
    let changedContextData;
    if (currTopic !== context.currTopic) {
      changedContextData = getLocalStorage(currTopic);
      if (changedContextData && changedContextData.currTopic === currTopic) {
        // Set the changed topic with existing saved data
        setContext(changedContextData);
      } else {
         setContext(getFreshTopicContext(currTopic))
      }
    } else {
      // Save current context update to local storage
      saveLocalStorage(context.currTopic, newContext);
      // Save update to app context
      setContext(newContext);
    }
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
