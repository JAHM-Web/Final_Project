import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Routes, Route, NavLink } from 'react-router-dom';

import CampusMap from './pages/CampusMap';
import PopularSpots from './pages/PopularSpots';
import PostReview from './pages/PostReview';

function App() {
  return (
    <div className="app-shell">

      {/* FULL WIDTH HEADER */}
      <header className="site-header">
        <div className="brand">
          <span className="brand-mark">✎</span>
          <span className="brand-text">RateMyStudySpot</span>
        </div>
      </header>

      {/* FULL WIDTH NAV */}
      <nav className="top-nav">
        <div className="nav-links">
          <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Home
          </NavLink>

          <NavLink to="/popular" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Popular Spots
          </NavLink>

          <NavLink to="/review" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Post Review
          </NavLink>
        </div>
      </nav>

      {/* PAGE CONTENT (CENTERED ONLY HERE) */}
      <main className="page-frame">
        <Routes>
          <Route path="/" element={<CampusMap />} />
          <Route path="/popular" element={<PopularSpots />} />
          <Route path="/review" element={<PostReview />} />
        </Routes>
      </main>

      {/* FULL WIDTH FOOTER */}
      <footer className="site-footer">
        © 2026 RateMyStudySpot. Find your perfect study space.
      </footer>

    </div>
  );
}

export default App;
