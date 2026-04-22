import { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

export default function CampusMap() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
  fetch('/api/reviews')
    .then(res => res.json())
    .then(data => {
      console.log("API DATA:", data);
      setPosts(Array.isArray(data) ? data : []);
    })
    .catch(err => console.error(err));
}, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Find Your Perfect Study Spot</h1>
      <h2>Discover and rate the best study locations at Michigan State</h2>

      <MapContainer
        center={[42.73, -84.48]}
        zoom={13}
        style={{ height: "400px", width: "800px", margin: "20px auto" }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {posts.map(post => (
          post.latitude && post.longitude && (
            <Marker
              key={post.id}
              position={[post.latitude, post.longitude]}
            >
              <Popup>
                <h3>{post.location_name}</h3>
              </Popup>
            </Marker>
          )
        ))}
      </MapContainer>
    </div>
  );
}