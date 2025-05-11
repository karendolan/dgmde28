// Import component
import Header from '../components/Header';

/**
 * Home page
 * @returns the jsx for the home page
 */
export default function Home() {

  const instructionArray = [
    "Choose a topic and decide among the options",
    "Add an observational note for each option",
    "Assess your notes in the Report summary",
  ];

  return (
    <div className='page'>
      <Header
        title="Home"
      />
      <h2>
        Instructions
      </h2>
      <div className='center'>
        <ol>
          {instructionArray.map(inst => (
            <li>
              {inst}
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}