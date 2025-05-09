// Import useContext to use the global context
import { useContext } from 'react';
// Import the global context
import ChooseContext from '../objects/ChooseContext';
// Import component
import Header from '../components/Header';

/**
 * The choose from the options page
 * TODO: sort by preference or random to start
 * TODO: something else for key - subtopic?
 */
export default function Choose() {
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