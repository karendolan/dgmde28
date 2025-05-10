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
    console.log("choice: ", c);
    const {name, temperament, origin, description, life_span, wikipedeia_url, image} = c;
    return (
      <div className="choice-item" key={i}>
        <div>{name}</div>
        <div>{temperament}</div>
        <div>{origin}</div>
        <div>{description}</div>
        <div>{life_span}</div>
        <img height={100} src={image.url}/>
        <a href={wikipedeia_url}>wikipedeia</a>
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