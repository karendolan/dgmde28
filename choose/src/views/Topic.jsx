// Import component
import Header from '../components/Header';
// Import useContext to use the global context
import { useContext, useState } from 'react';
// Import the global context
import ChooseContext from '../objects/ChooseContext';
// Navigate
import { useNavigate } from 'react-router-dom';


/**
 * Topic page
 * @returns the jsx for the topics page
 */
export default function Topic() {
  // Retrieve context
  const { context, handleUpdate } = useContext(ChooseContext);
  // Destructure the context
  const { currTopic, topicOptions } = context;
  // Set state
  const [topic, setTopic] = useState(currTopic);
  // Get a navigate
  const navigate = useNavigate();

  /**
   * Update the topic choice locally, but not yet submitted
   * @param {*} e
   */
  function onChange(e){
    setTopic(e.target.value);
  }

  /**
   * Submit topic choice & moves to the choose panel
   */
  function submitTopicChoice(){
    handleUpdate({
      ...context,
      currTopic: topic,
    });
    // Move the page to choose
    console.log('About to navigate to the choose page');
    navigate('/choose');
    console.log('Navigated????');
  }

  // Return the JSX
  return (
    <div className='page'>
      <Header
        title="Topic"
      />
      <div className='center'>
        <h2>
          Choose a topic
        </h2>
        {topic && (
          <div>
            Current topic is {currTopic}
          </div>
        )}
        <div>
          {topicOptions.map((opt) => {
            const selected = topic == opt ? 'selected' : '';
            return (
              <div key={opt} >
                <label>
                  <input onChange={onChange} type="radio" id={opt} name="topic" value={opt} checked={!!selected}/>
                  {opt}
                </label>
              </div>
            )
          })}
          <button onClick={submitTopicChoice}>
            Submit new topic
          </button>
        </div>
      </div>
    </div>
  )
}