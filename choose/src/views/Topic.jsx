// Import component
import Header from '../components/Header';
// Import useContext to use the global context
import { useContext, useState } from 'react';
// Import the global context
import ChooseContext from '../objects/ChooseContext';

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
   var [topic, setTopic] = useState(currTopic);

  function onChange(e){
    console.log("event ", e, e.target.value);
    setTopic(e.target.value);
  }

  function submitTopicChoice(){
      handleUpdate({
        ...context,
        currTopic: topic,
      });
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
            Current topic is {topic}
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