import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import CampusMap from './pages/CampusMap';
import PopularSpot from './pages/PopularSpots';
import PostReview from './pages/PostReview';

function App() {
  return (
    <div>
      <nav style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px",
        backgroundColor: "#282c34",
        color: "white"
      }}>
        <h1>RateMyStudySpot</h1>
        <div style={{ display: "flex", gap: "20px" }}>
          <Link to="/" style={{ color: "white" }}>Campus Map</Link>
          <Link to="/popular" style={{ color: "white" }}>Popular Spot</Link>
          <Link to="/review" style={{ color: "white" }}>Post Review</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<CampusMap />} />
        <Route path="/popular" element={<PopularSpot />} />
        <Route path="/review" element={<PostReview />} />
      </Routes>
    </div>
  );
}

export default App;