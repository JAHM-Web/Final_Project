import './App.css';
import { Routes, Route, NavLink } from 'react-router-dom';
import CampusMap from './pages/CampusMap';
import PopularSpots from './pages/PopularSpots';
import PostReview from './pages/PostReview';


function App() {
  return (
    <div className="app-shell">
      <div className="page-frame narrow">
        <header className="site-header">
          <div className="brand">
            <span className="brand-icon">✎</span>
            <span className="brand-name">RateMyStudySpot</span>
          </div>
        </header>


        <nav className="top-nav">
          <div className="nav-links">
            <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              ✎ Home
            </NavLink>
            <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              ⌖ Campus Map
            </NavLink>
            <NavLink to="/popular" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              ↗ Popular Spots
            </NavLink>
            <NavLink to="/review" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              ✎ Post Review
            </NavLink>
          </div>
        </nav>


        <Routes>
          <Route path="/" element={<CampusMap />} />
          <Route path="/popular" element={<PopularSpots />} />
          <Route path="/review" element={<PostReview />} />
        </Routes>


        <footer className="site-footer">
          © 2026 RateMyStudySpot. Find your perfect study space.
        </footer>
      </div>
    </div>
  );
}


export default App;



