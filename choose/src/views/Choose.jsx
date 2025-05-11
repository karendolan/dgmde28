// Import useContext to use the global context
import { useContext, useState, useEffect, useRef } from 'react';
// Import the global context
import ChooseContext from '../objects/ChooseContext';
// Import components
import Header from '../components/Header';
import ChoiceComponent from '../components/ChoiceComponent';
import OptionNoteComponent from '../components/OptionNoteComponent';

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
  // UseRef is required to save the exact reference to the document cursor move handler
  const cursorMoveHandler = useRef(undefined);

  // currently select row
  console.log("CHOOSE START - moveItem ???? " , moveItem?.id, movePos);
  const rowMoveId = moveItem ? moveItem.id : undefined;

  // 1. have a moving item - add listener to mouse move: document.addEventListener('mousemove', (event) => {
  // --- sets initial position
  // --- when no longer moving item - movePos is removed
  // 2. have a movePos change - sets new move position

  // -------------------------------------------------
  // Start of module useEffect hooks
  // -------------------------------------------------

  // On mount useEffect create the handler that the document will use for mousemove
  // when moving option Items up or down the list
  useEffect(() => {
    // Set the persistent cursorMoveHandler function
    cursorMoveHandler.current = (e) => {
      console.log("Mouse move event ", e)
      const scrollBy = 10;
      let moveY = e.movementY;
      const moveX = e.movementX;
      // Scroll window if necessary
      const clientY = e.clientY;
      const winHeight = window.innerHeight;
      // Scroll if necessary when at top of screen
      if (clientY < scrollBy) {
        window.scrollBy(0,-scrollBy)
        // decrement the moveY
        moveY -=scrollBy;
      }
      // Scroll if necessary at bottom of screen
      else if (clientY >  Math.abs(winHeight - scrollBy)) {
        window.scrollBy(0, scrollBy);
        // increment the moveY
        moveY +=scrollBy;
      }
      // Update the new mouse move position in the state
      setMovePos({
        moveY,
        moveX,
      })
    }
  }, []);

  // -------------------------------------------------
  // End of module hooks, start of internal function
  // -------------------------------------------------

  /**
   * Calculate the style position attribute of the move item
   * @returns
   */
  const getPositionStyle = () => {
    let style = ''
    if (movePos && moveItem) {
      const position = moveItem.getBoundingClientRect();
      const top = position.y + window.scrollY + movePos.moveY;
      const left = position.x + movePos.moveX;
      style = {
        position: 'absolute',
        top: Number.parseInt(top),
        left: Number.parseInt(left)
      };
    }
    return style;
  }

  /**
   * Handler called when an option is being grabbed for dragging to change position
   * @param {e} the event
   */
  function moveStart(e) {
    e.preventDefault();
    console.log('STARTING cursor EVENT LISTENER');
    // Save the item being moved to state
    const item = e.target.closest('.Choose-option-component');
    // Add moving style to the element
    item.classList.add('moving');
    // Set the move item in the state
    setMoveItem(item);
    // Start an event handler on the mouse move
    document.addEventListener('mousemove', cursorMoveHandler.current);
  }

  /**
   * Handler called during mouse up after an option position is dragged
   * This handler updates the position of the options if a change was made
   * @param {e} the mouse up event
   */
  function moveEnd(e) {
    e.preventDefault();
    console.log('Removing cursor EVENT LISTENER ---------------');
    // Remove the cursor listener
    document.removeEventListener('mousemove', cursorMoveHandler.current);
    // Determine the new ordering of the options, if any
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
    console.log('UNSETTING movPos and moveItem');
    // Remove moving class style designation
    moveItem.classList.remove('moving');
    // Unset movePos
    setMovePos(undefined);
    // remove item
    setMoveItem(undefined);
  }

  /**
   * The manual change
   * @param {*} option
   * @param {*} position
   * @returns
   */
  function changePosition(option, position) {
    console.log('STARTING Change position');
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
      ...context,
      choiceOptions,
    })
  }
  /**
   * Update note changes to the global context
   */
  function updateNote(){
    // Update the context
    handleUpdate({
      ...context,
      choiceOptions,
    })
  }

  // -------------------------------------------------
  // End of module functions, start of JSX rendering
  // -------------------------------------------------
  console.log("Before sort ", choiceOptions);
  // Sort the choiceOptions by option position
  choiceOptions.sort((a, b) => {
    return a.position - b.position;
  })
  console.log("AFTER sort ", choiceOptions);

  // Make a JSX collection of choices
  console.log('Rerendering list: ');
  const choices = choiceOptions.map((c) => {
    console.log('IN RENDER for ', c.id);
    const {id, subtopic, attribute, origin, description, life_span, wikipedia_url, image, note, position} = c;
    const rowId = `row-opt-${id}`;
    return (
      <div className="Option-choice-block" key={id} id={`choice-${id}`}>
        <div className="move-indicator" />
        <div
          id={rowId}
          className={`Choose-option-component position-${position}`}
          onMouseDown={moveStart}
          onMouseUp={moveEnd}
          style={rowMoveId === rowId && movePos ? getPositionStyle() : undefined}
        >
          {position}
          <ChoiceComponent
            topic = {currTopic}
            subtopic = {subtopic}
            description = {description}
            image = {image}
            attribute = {attribute}
            origin = {origin}
            life_span = {life_span}
            wikipedia_url =  {wikipedia_url}
            position = {position}
          />
          <div className="Choose-notes" onMouseDown={((e) => {
            // Prevent click into notes from activating option position drag activity
            e.stopPropagation();
          })}
          onMouseUp={((e) => {
            // Prevent mouse up from activating position drag activity
            e.stopPropagation();
          })}
          >
            <OptionNoteComponent
              existingNote={note}
              option={c}
              callback={updateNote}
              label={'Notes'}
            />
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
      <h2>
        Topic {currTopic}
      </h2>
      <div className='Choose center'>
        {choices}
      </div>
    </div>
  )
}