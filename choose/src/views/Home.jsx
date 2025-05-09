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
        <div>
          Please go <a href="/">Home</a>!
        </div>
      </div>
    </div>
  )
}