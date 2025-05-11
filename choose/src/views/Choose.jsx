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
  const { context, handleUpdate } = useContext(ChooseContext);
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
    item.classList.add('moving');
    const position = item.getBoundingClientRect();
    setMovePos({
        top: position.y + window.scrollY,
        left: position.x,
    })
    setMoveItem(item);
  }

  function moveEnd(e) {
    e.preventDefault();
    // remove moving class designation
    moveItem.classList.remove('moving');
    const option = choiceOptions.find(o => moveItem.id == `row-opt-${o.id}`);
    const top = moveItem.getBoundingClientRect().y + window.scrollY;
    const optionElems = document.getElementsByClassName('Choose-option-component');
    let lowerElemId;
    for (e of optionElems) {
      if (e.id !== rowMoveId) {
        const eTop = e.getBoundingClientRect().y + window.scrollY;
        if (eTop > top) {
          lowerElemId = e.id;
          break;
        }
      }
    }
    console.log('lowerElemId: ', lowerElemId, option.id);
    // Move the item to the bottom of the list
    if (!lowerElemId) {
      let count = 1;
      choiceOptions.forEach(o => {
        console.log('Comparing ids ', o.id, option.id);
        if (o.id === option.id) {
          o.setPosition(choiceOptions.length);
        } else {
          // all others increment as usual
          o.setPosition(count++);
        }
        console.log("TTTTop Set option ", o.subtopic, o.position);
      });
    }
    // Move the item within the list
    else {
      let count = 1;
      // Find lower option from the lower element id
      const lowerOpt = choiceOptions.find((o) => {
         return lowerElemId === `row-opt-${o.id}`
      })
      if (lowerOpt) {
        let isMoveUpdated = false;
        const lowerPos = lowerOpt.position;
        // With the assumption that these are in order, except for the moved item
        choiceOptions.forEach(o => {
          // Bump all lower options down a notch
          if (lowerPos <= o.position) {
            if (!isMoveUpdated) {
              option.setPosition(count++);
              isMoveUpdated = true;
              console.log("SSS Set option ", option.subtopic, option.position);
            }
          }
          if (o.id !== option.id) {
            o.setPosition(count++);
          }
        });
        // Set this option to lower position
        option.setPosition(lowerPos);
      } else {
        console.log('ERROR, should be a lower object for ', lowerElemId);
      }
    }
    // remove item
    setMoveItem(undefined);
  }

  function changePosition(option, position) {
    const prevPos = option.position;
    option.setPosition(position);
    // No work needed if at same position
    if (prevPos == position) return;
    const isUp = prevPos > position;
    if (isUp) {
      let count = position + 1;
      choiceOptions.forEach((o) => {
        if (o.id !== option.id && o.position >= position) {
          o.setPosition(count++)
        }
      });
      option.setPosition(position);
    } else {
      let count = prevPos;
      choiceOptions.forEach((o) => {
        if ( o.id !== option.id
          && o.position > prevPos
          && o.position <= position
        ) {
          o.setPosition(count++)
        }
      });
      option.setPosition(position);
    }
    // Update the context
    handleUpdate({
      choiceOptions,
    })
  }

  console.log("Before sort ", choiceOptions);
  // sort
  choiceOptions.sort((a, b) => {
    return a.position - b.position;
  })

  console.log("AFTER sort ", choiceOptions);

  // Make a JSX collection of choices
  console.log('Rerendering list: ');
  const choices = choiceOptions.map((c) => {
    console.log('IN RENDER for ', c.id);
    const {id, subtopic, temperament, origin, description, life_span, wikipedia_url, image, note, position} = c;
    const rowId = `row-opt-${id}`;
    return (
      <div className="Option-choice-block" key={id} id={`choice-${id}`}>
        <div className="move-indicator" />
        <div
          id={rowId}
          className={`Choose-option-component position-${position}`}
          onMouseDown={moveStart}
          onMouseUp={moveEnd}
          style={rowMoveId === rowId && movePos ? {position: 'absolute', top: movePos.top, left: movePos.left} : undefined}
        >
          {position}
          <ChoiceComponent
            topic = {currTopic}
            subtopic = {subtopic}
            description = {description}
            image = {image}
            attribute = {temperament}
            origin = {origin}
            life_span = {life_span}
            wikipedia_url =  {wikipedia_url}
            position = {position}
          />
          <div className="Choose-notes" onMouseDown={((e) => {
            e.stopPropagation();
          })}
          onMouseUp={((e) => {
            e.stopPropagation();
          })}
          >
            <label>Notes
              <textarea
                className={`Choose-notes-textarea ${note ? 'noted' : ''}`}
                rows="9" type="textarea"
                onChange={((e) => c.addNote(e.target.value))}
                value={note}
              />
            </label>
            <label>
              Position
              {' '}
              <input
                id="Option-position-input"
                type="number"
                value={position}
                min={1} max={choiceOptions.length}
                onChange={(e) => changePosition(c, Number.parseInt(e.target.value))}
              />
            </label>
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
      <div className='Choose center'>
        {choices}
      </div>
    </div>
  )
}