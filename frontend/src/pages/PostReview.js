import { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';

function LocationPicker({ setCoords }) {
  useMapEvents({
    click(e) {
      setCoords({
        latitude: e.latlng.lat,
        longitude: e.latlng.lng
      });
    }
  });

  return null;
}

export default function PostReview() {
  const [form, setForm] = useState({
    location_name: "",
    location_type: "",
    crowd_rating: "",
    noise_rating: "",
    wifi_rating: "",
    poster_name: "",
    content: "",
    latitude: null,
    longitude: null
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const setCoords = ({ latitude, longitude }) => {
    setForm(prev => ({
      ...prev,
      latitude,
      longitude
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("SUBMIT FIRED", form);

    fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ review: form })
    })
      .then(res => res.json())
      .then(data => console.log("SUCCESS:", data))
      .catch(err => console.error("ERROR:", err));
  };

  return (
    <div>
      {/* HERO TITLE (NOW MATCHES REST OF APP) */}
      <div className="hero">
        <h1 className="hero-title">Post a Review</h1>
        <p className="hero-subtitle">
          Share your experience and help others find the best study spots.
        </p>
      </div>

      <MapContainer
        center={[42.73, -84.48]}
        zoom={15}
        className="leaflet-container"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <LocationPicker setCoords={setCoords} />

        {form.latitude && (
          <Marker position={[form.latitude, form.longitude]} />
        )}
      </MapContainer>

      {/* COORDS */}
      <h4 style={{ textAlign: "center" }}> 
        Select a Location on the Map 
      </h4>
      <p style={{ textAlign: "center" }}>
        Selected Coordinates: {form.latitude}, {form.longitude}
      </p>

      <form onSubmit={handleSubmit}>
        <input name="location_name" placeholder="Location Name" onChange={handleChange} />
        <input name="location_type" placeholder="Location Type" onChange={handleChange} />

        <input name="crowd_rating" type="number" placeholder="Crowd (1-3)" onChange={handleChange} />
        <input name="noise_rating" type="number" placeholder="Noise (1-3)" onChange={handleChange} />
        <input name="wifi_rating" type="number" placeholder="WiFi (1-3)" onChange={handleChange} />

        <input name="poster_name" placeholder="Your Name" onChange={handleChange} />
        <textarea name="content" placeholder="Write your review..." onChange={handleChange} />

        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
}
