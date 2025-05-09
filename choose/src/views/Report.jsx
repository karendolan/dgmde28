// Import component
import Header from '../components/Header';

/**
 * Report page
 * @returns the jsx for the report page
 */
export default function Report() {
  return (
    <div className='page'>
      <Header
        title="Report"
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