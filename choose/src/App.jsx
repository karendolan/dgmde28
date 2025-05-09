import { useState, createContext, useContext } from 'react'
import './App.css'

// Create the global context for the Choose app
const ChooseContext = createContext();


// ------------------------
// The Header that includes the nav bar
function Header(props) {
  // Receive title of the page as a prop, with fun fallback
  const {
    title = "Good Day!",
  } = props;

  return (
    <div className='header'>
      <div className='title'>Subtopic Choice</div>
      <h1 className='page-title'>{title}</h1>
      <Nav
        curPage={title}
      />
    </div>
  )
}

// ------------------------
// The nav bar
function Nav(props) {
  const { curPage } = props;
  return (
    <div id='main-nav'>
      <span className={curPage === 'Home' ? 'bold' : ''}>
        <Link to="/">Home</Link>
      </span>
      <span className={curPage === 'Topics' ? 'bold' : ''}>
        <Link to="/topics">Stats</Link>
      </span>
      <span className={curPage === 'Choose' ? 'bold' : ''}>
        <Link to="/choose">Settings</Link>
      </span>
      <span className={curPage === 'Report' ? 'bold' : ''}>
        <Link to="/report">Settings</Link>
      </span>
    </div>
  );
}

// ------------------------
// The Routes of the app, showing all possible page paths
function ChooseRouter() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/topics" element={<Topics />} />
        <Route path="/choose" element={<Choose />} />
        <Route path="/report" element={<Report />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}


/**
 * ----------------------------------------
 * The choose from the options page
 * TODO: sort by preference or random to start
 * TODO: something else for key - subtopic?
 */
function Choose() {
  // Retrieve context
  const { context } = useContext(ChooseContext);
  // Destructure the context
  const { choiceOptions } = context;
  // Make a JSX collection of choices
  const choices = choiceOptions.map((c,i) => {
    return (
      <div className="choice-item" key={i}>
        <div>{c.topic}</div>
        <div>{c.subTopic}</div>
        <div>{c.description}</div>
        <image src={c.image}></image>
      </div>
    )
  })
  // return the JSX
  return (
    <div className='page'>
      <Header
        title="Choose"
      />
      <div className='center'>
        {choices}
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
        title="The Dark Forest"
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


// ----------------------------------
// The main App entry point
function App() {
  // Set defaults in the initial context
  var [context, setContext] = useState({
    // The Option objects to choose from
    choiceOptions: ['long hair'],
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
        <MyRouteApp />
      </Router>
    </ChooseContext.Provider>
  )
}

export default App
