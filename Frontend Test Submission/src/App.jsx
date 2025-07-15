import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ShortenerPage from './pages/ShortenerPage';
import StatsPage from './pages/StatsPage';

export default function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Shortener</Link> | <Link to="/stats">Stats</Link>
      </nav>
      <Routes>
        <Route path="/" element={<ShortenerPage />} />
        <Route path="/stats" element={<StatsPage />} />
      </Routes>
    </Router>
  );
}
