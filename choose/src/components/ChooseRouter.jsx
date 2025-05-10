// Import react router dependencies
import { Routes, Route } from 'react-router-dom';

// Import components
import Choose from '../views/Choose';
import Home from '../views/Home';
import Topic from '../views/Topic';
import Report from '../views/Report';
import NotFound from '../views/NotFound'

/**
 * The Routes of the app, showing all possible page paths
 * @returns
 */
export default function ChooseRouter() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/topic" element={<Topic />} />
        <Route path="/choose" element={<Choose />} />
        <Route path="/report" element={<Report />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}