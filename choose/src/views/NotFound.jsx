// Import component
import Header from '../components/Header';

/**
 * The page not found page
 * @returns
 */
export default function NotFound() {
  return (
    <div className='page'>
      <Header
        title="The Dark Forest"
      />
      <div className='center'>
        This page is not in service.
        <div>
          Please go <a href="/">Home</a>!
        </div>
      </div>
    </div>
  )
}
