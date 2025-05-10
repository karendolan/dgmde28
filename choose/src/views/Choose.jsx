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
  // Use State
  const [movePos, setMovePos] = useState();

  // currently select row
  console.log("moveItem ???? " , moveItem?.id, movePos);
  const rowMoveId = moveItem ? moveItem.id : undefined;


  // Track when item is moving
  useEffect(() => {
    // On move event
    const moving = (e) => {
      console.log('---- IN MOVE: ', e, setMovePos, moveItem.style );
      e.preventDefault();
      if (movePos) {
        setMovePos({
          top: movePos.top + e.movementY,
          left: movePos.left + e.movementX,
        })
      }
    };

    // Adding event listeners
    if (moveItem) {
      console.log('ADDING EVENT LISTENER to ', moveItem)
      moveItem.addEventListener('mousemove', moving);
    }
    // Remove before remove item is removed
    return () => {
      if (moveItem) {
        console.log('Removing EVENT LISTENER from ', moveItem)
        moveItem.removeEventListener('mousemove', moving);
      }
    };
  }, [moveItem, movePos]);

  function moveStart(e) {
    e.preventDefault();
    const item = e.target.closest('.Choose-option-component');
    console.log('Touching!!!!', item, e.target, e.type, e.movementX, e.movementY);
    item.classList.add('moving');
    const position = item.getBoundingClientRect();
    console.log('Start Position', position);
    setMovePos({
        top: position.y,
        left: position.x,
    })
    setMoveItem(item);
  }

  function moveEnd(e) {
    e.preventDefault();
    console.log('Ending move!!!!', moveItem, e.type, e.movementX, e.movementY);
    moveItem.classList.remove('moving');
    // remove item
    setMoveItem(undefined);
  }

  // Make a JSX collection of choices
  console.log('Rerendering list: ');
  const choices = choiceOptions.map((c) => {
    console.log('IN RENDER for ', c.id);
    const {id, subtopic, temperament, origin, description, life_span, wikipedia_url, image, note, order} = c;
    const rowId = `row-opt-${id}`;
    return (
      <div key={id}>
        <div className="move-indicator" />
        <div
          id={rowId}
          className="Choose-option-component"
          onMouseDown={moveStart}
          onMouseUp={moveEnd}
          style={rowMoveId === rowId && movePos ? {position: 'absolute', top: movePos.top, left: movePos.left} : undefined}
        >
          Position is {movePos ? `left = ${movePos.left} top = ${movePos.top}`: ''}
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