// Import component
import Header from './Header';
/**
 * Topic page
 * @returns the jsx for the topics page
 */
export default function Topic() {
  return (
    <div className='page'>
      <Header
        title="Topic"
      />
      <div className='center'>
        <div>
          You are on the topics page!
        </div>
      </div>
    </div>
  )
}