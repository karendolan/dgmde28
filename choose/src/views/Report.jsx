// Import useContext to use the global context
import { useContext } from 'react';
// Import the global context
import ChooseContext from '../objects/ChooseContext';
// Import component
import Header from '../components/Header';

// Import the style
import './Report.css';

/**
 * Report page
 * @returns the jsx for the report page
 */
export default function Report() {
    // Retrieve context
  const { context } = useContext(ChooseContext);
  // Destructure the context
  const { choiceOptions, currTopic } = context;

  const reportOptions = choiceOptions.map((o) => {
    const {id, subtopic, image, origin, note, position} = o;
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
        <div className='Report-note'>
          {note}
        </div>
      </div>
    )
  })

  return (
    <div className='page'>
      <Header
        title="Report"
      />
      <div className='center'>
        <div>
          Topic {currTopic}
        </div>
        <div className='Report-list'>
         {reportOptions}
        </div>
      </div>
    </div>
  )
}