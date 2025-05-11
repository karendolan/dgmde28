// Import component
import Header from '../components/Header';

/**
 * Home page
 * @returns the jsx for the home page
 */
export default function Home() {
  return (
    <div className='page'>
      <Header
        title="Home"
      />
      <div className='center'>
        <p>
          Choose a topic and decide among the options!
          <br/>
          Leave notes for each option.
          <br />
          Then view your summary.
        </p>
      </div>
    </div>
  )
}