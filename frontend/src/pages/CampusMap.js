import { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
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
      <MapContainer
        center={[42.73, -84.48]}
        zoom={13}
        style={{ height: "400px", width: "800px", margin: "20px auto" }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* <Marker position={[42.73, -84.48]} /> */}

        {posts.map(post => (
          post.latitude && post.longitude && (
            <Marker
              key={post.id}
              position={[post.latitude, post.longitude]}
            />
          )
        ))}
      </MapContainer>

      <h2>Posts</h2>
      {posts.length === 0 ? (
        <p>Loading...</p>
      ) : (
        posts.map(post => (
          <div key={post.id}>
            <h3>{post.location_name}</h3>
            <p>{post.content}</p>
          </div>
        ))
      )}
    </div>
  );
}