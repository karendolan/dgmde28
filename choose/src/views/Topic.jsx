// Import component
import Header from '../components/Header';
// Import useContext to use the global context
import { useContext } from 'react';
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

  function onChange(e){
    console.log("event ", e);
      handleUpdate({
        ...context,
        currTopic: e,
      });
  }

  console.log('topicOptions', topicOptions);

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
        <div onChange={onChange}>
          blah
          {topicOptions}
          {topicOptions && topicOptions.map((opt) => {
            <div>
              {opt}
              <label>
                bla
                <input key={opt} type="radio" id="opt" name="topic" value="opt" selected={currTopic === opt ? 'selected' : ''}/>
                {opt}
              </label>
            </div>
          })}
        </div>
      </div>
    </div>
  )
}