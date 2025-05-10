// Import useContext to use the global context
import { useContext } from 'react';
// Import the global context
import ChooseContext from '../objects/ChooseContext';
// Import component
import Header from '../components/Header';
import ChoiceComponent from '../components/ChoiceComponent';

// Import the style
import './Choose.css';

/**
 * The choose from the options page
 * TODO: sort by preference or random to start
 * TODO: something else for key - subtopic?
 */
export default function Choose() {
  // Retrieve context
  const { context } = useContext(ChooseContext);
  // Destructure the context
  const { choiceOptions, currTopic } = context;

  // Make a JSX collection of choices
  const choices = choiceOptions.map((c) => {
    console.log("choice: ", c);
    const {name, temperament, origin, description, life_span, wikipedeia_url, image, note} = c;
    return (
      <div className="Choose-option" key={name} >
        <ChoiceComponent
          topic = {currTopic}
          subtopic = {name}
          description = {description}
          image = {image}
          attribute = {temperament}
          origin = {origin}
          life_span = {life_span}
          wikipedeia_url =  {wikipedeia_url}
        />
        <label>Notes:
          <textarea type="textarea" onChange={((e) => c.addNote(e.target.value))}>
            {note}
          </textarea>
        </label>
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