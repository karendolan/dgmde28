// Import useContext to use the global context
import { useContext, useState, useEffect } from 'react';
// Import the global context
import ChooseContext from '../objects/ChooseContext';
// Import components
import Header from '../components/Header';
import OptionNoteComponent from '../components/OptionNoteComponent';


// Import the style
import './Report.css';

/**
 * Report page
 * @returns the jsx for the report page
 */
export default function Report() {
    // Retrieve context
  const { context, handleUpdate } = useContext(ChooseContext);
  // Destructure the context
  const { choiceOptions, currTopic, choiceSummaryNote } = context;
  // Use state for summary note update
  const [curNote, setCurNote] = useState(choiceSummaryNote);

  useEffect(() => {
    console.log('Updating summary note ', curNote);
  }, [curNote]);

  // Handler for summary note changes
  function updateSummaryNote(update) {
    handleUpdate({
      ...context,
      choiceSummaryNote: update
    });
  }

  const reportOptions = choiceOptions.map((o) => {
    const {id, subtopic, image, origin, note, position} = o;
    // console.log("CAT ", o);
    return (
      <div key={id} className='Report-listItem'>
        <div className="Report-listItem-pos">
          #{position}
        </div>
        <div className='Report-listItem-image'>
          <img className='ChoiceComponent-image' height={100} src={image.url}/>
        </div>
        <div className="Report-listItem-desc">
          <div>{subtopic}</div>
          <div>{origin}</div>
        </div>
        <OptionNoteComponent
          label={''}
          existingNote={note}
          option={o}
          callback={setCurNote}
        />
      </div>
    )
  })

  return (
    <div className='page'>
      <Header
        title="Report"
      />
      <div className='center'>
        <h2>
          Topic {currTopic}
        </h2>
        <label className="center">Summary note
          <textarea
            className={`Choose-notes-textarea Report-note summary ${choiceSummaryNote ? 'noted' : ''}`}
            rows="3" type="textarea"
            onChange={((e) => {
              updateSummaryNote(e.target.value);
              setCurNote(e.target.value);
            })}
            value={choiceSummaryNote}
          />
        </label>
        <div className='Report-list'>
         {reportOptions}
        </div>
      </div>
    </div>
  )
}