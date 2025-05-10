// Import useContext to use the global context
import { useContext, useState, useEffect } from 'react';
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
  // Use State
  const [moveItem, setMoveItem] = useState();

  useEffect(() => {
    const moving = (e) => {
      e.preventDefault();
      console.log('Moving!!!!', e.type, e.movementX, e.movementY);
      console.log('moving', e);
    };

    if (moveItem) {
      moveItem.addEventListener('mousemove', moving);
    }

    return () => {
      if (moveItem) {
        moveItem.removeEventListener('mousemove', moving);
      }
    };
  }, [moveItem]);


  function moveStart(e) {
    e.preventDefault();
    console.log('Touching!!!!', e.target, e.type, e.movementX, e.movementY);
    setMoveItem(e.target);

  }

  function moveEnd(e) {
    e.preventDefault();
    console.log('Ending move!!!!', e.type, e.movementX, e.movementY);
    setMoveItem();
  }

  // Make a JSX collection of choices
  const choices = choiceOptions.map((c) => {
    const {id, subtopic, temperament, origin, description, life_span, wikipedia_url, image, note, order} = c;
    console.log('Rerendering list: subtopic: ', c, subtopic, id);
    return (
      <div>
      <div className="move-indicator" />
      <div
        className="Choose-option-component"
        key={id}
        onMouseDown={moveStart}
        onMouseUp={moveEnd}
      >
        <ChoiceComponent
          topic = {currTopic}
          subtopic = {subtopic}
          description = {description}
          image = {image}
          attribute = {temperament}
          origin = {origin}
          life_span = {life_span}
          wikipedia_url =  {wikipedia_url}
        />
        <div className="Choose-notes">
          <label>Notes:
            <textarea type="textarea" onChange={((e) => c.addNote(e.target.value))}>
              {note}
            </textarea>
          </label>
          {order && (
            <div>
              Preference ({order})
            </div>
          )}
        </div>
      </div>
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