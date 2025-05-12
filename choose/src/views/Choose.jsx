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
  // console.log("CHOOSE START - moveItem ???? " , moveItem?.id, movePos);
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
    // Remove the cursor listener
    document.removeEventListener('mousemove', cursorMoveHandler.current);
    // update positions
    updateDragPositions(e);
    // Remove moving class style designation
    moveItem.classList.remove('moving');
    // Unset movePos
    setMovePos(undefined);
    // remove item
    setMoveItem(undefined);
  }

  /**
   * Isolate the crazy logic to reorder the items
   * @param {Evemt} e
   * @returns
   */
  function updateDragPositions(e) {
    // Determine the new ordering of the options, if any
    // Retrieve the move option Object
    const option = choiceOptions.find(o => moveItem.id == `row-opt-${o.id}`);
    // Retrieve the move element's current location on the page
    const top = moveItem.getBoundingClientRect().y + window.scrollY;
    // Get all the option elements
    const optionElems = document.getElementsByClassName('Choose-option-component');
    // 1. look for and element that falls below the moved element
    let lowerElemId;
    let upperElemId;
    for (e of optionElems) {
      // Get the bounding box of each element that is not the move element
      if (e.id !== rowMoveId) {
        const eTop = e.getBoundingClientRect().y + window.scrollY;
        if (eTop > top) {
          // Get the first item below this one that is found
          lowerElemId = e.id;
          break;
        } else {
          // Otherwise, the element is above the move element
          upperElemId = e.id;
          // Keep going to get the lowest one above this element
        }
      }
    }
    // Move item is at the bottom, whe nothing is lower that the move element
    if (!lowerElemId) {
      // Already in correct position at the end
      if (option.position == optionElems.length) return;
      // Otherwise continue to reposition
      let count = 1;
      choiceOptions.forEach(o => {
        if (o.id === option.id) {
          o.setPosition(choiceOptions.length);
        } else {
          // all others increment as usual
          o.setPosition(count++);
        }
      });
    }
    // Move item is at the top, if there are elements below it but none above it
    else if (!upperElemId) {
      // Already in correct position at the start
      if (option.position == 1) return;
      // Otherwise continue to reposition
      // start the count below the top
      let count = 2;
      choiceOptions.forEach(o => {
        if (o.id === option.id) {
          // The move item goes to the top
          o.setPosition(1);
        } else {
          // all others increment as usual
          o.setPosition(count++);
        }
      });
    }
    // Move falls within the list
    else {
      let count = 1;
      // Find lower option from the lower element id
      const lowerOpt = choiceOptions.find((o) => {
         return lowerElemId === `row-opt-${o.id}`
      })
      if (lowerOpt) {
        const lowerPos = lowerOpt.position;
        const oldPos = option.position;
        // Already in correct position above the lower position
        if (oldPos + 1 == lowerPos) return;
        // Otherwise continue to reposition
        // If moved up, it gets the lower Pos number. If it moved down, it gets lowerPos number - 1
        const isUpMove = lowerPos < oldPos;
        const newPos = isUpMove ? lowerPos : lowerPos - 1 ;
        // With the assumption that these are in order, except for the moved item
        choiceOptions.forEach(o => {
          if (o.id === option.id) {
            // The move item gets the calculate position
            o.setPosition(newPos);
          } else {
            // skip over the newPos when it's hit
            if (isUpMove && o.position == newPos) {
              // Move the count down one to push items down in position
              count = newPos + 1;
            } else if (isUpMove && count >= oldPos ) {
              // No more work needed, lower items keep their existing position
              return;
            } else if (!isUpMove &&  o.position - 1 == oldPos) {
              // This is the item that used to be under the element, now goes up
              count = oldPos;
            } else if (!isUpMove && count >= newPos ) {
              // No more work needed, lower items keep their existing position
              return;
            }
            o.setPosition(count++);
          }
        });
      } else {
        console.log('ERROR, should be a lower object for ', lowerElemId);
      }
    }

  }

  /**
   * The manual change
   * For some reason this is easier than
   * calculating the drag and drop order
   * @param {*} option
   * @param {*} position
   * @returns
   */
  function changePosition(option, position) {
    // console.log('STARTING Change position');
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
  // console.log("Before sort ", choiceOptions);
  // Sort the choiceOptions by option position
  choiceOptions.sort((a, b) => {
    return a.position - b.position;
  })
  // console.log("AFTER sort ", choiceOptions);

  // Make a JSX collection of choices
  // console.log('Rerendering list: ');
  const choices = choiceOptions.map((c) => {
    // console.log('IN RENDER for ', c.id);
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