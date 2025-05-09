import { Link } from 'react-router-dom';

/**
 * The nav bar
 * @param {*} props
 * @returns
 */
export default function Nav(props) {
  const { curPage } = props;
  return (
    <div id='main-nav'>
      <span className={curPage === 'Home' ? 'bold' : ''}>
        <Link to="/">Home</Link>
      </span>
      <span className={curPage === 'Topic' ? 'bold' : ''}>
        <Link to="/topic">Topic</Link>
      </span>
      <span className={curPage === 'Choose' ? 'bold' : ''}>
        <Link to="/choose">Choose</Link>
      </span>
      <span className={curPage === 'Report' ? 'bold' : ''}>
        <Link to="/report">Report</Link>
      </span>
    </div>
  );
}