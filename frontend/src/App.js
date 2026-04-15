import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';


function App() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
  fetch('http://localhost:3000/api/posts')
    .then(res => res.json())
    .then(data => setPosts(data))
    .catch(err => console.error(err));
}, []);
  return (
    <div className="App">
  <header className="App-header">
    <MapContainer
        center={[42.73, -84.48]}  // East Lansing coords
        zoom={13}
        style={{ height: "400px", width: "600px" }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>

    <h1>Posts from Rails API</h1>
    {posts.length === 0 ? (
      <p>Loading...</p>
    ) : (
      posts.map(post => (
        <div key={post.id}>
          <h2>{post.title}</h2>
        </div>
      ))
    )}
  </header>
</div>
  );
}

export default App;
