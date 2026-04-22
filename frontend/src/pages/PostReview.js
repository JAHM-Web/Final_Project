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
    .then(res => {
      console.log("STATUS:", res.status);
      return res.json();
    })
    .then(data => {
      console.log("SUCCESS:", data);
    })
    .catch(err => {
      console.error("ERROR:", err);
    });
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Post Review</h2>

      {/* MAP */}
      <MapContainer
        center={[42.73, -84.48]}
        zoom={15}
        style={{ height: "300px", width: "600px", margin: "auto" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationPicker setCoords={setCoords} />

        {form.latitude && (
          <Marker position={[form.latitude, form.longitude]} />
        )}
      </MapContainer>

      <p>
        Selected: {form.latitude}, {form.longitude}
      </p>

      <form onSubmit={handleSubmit}>
        <input name="location_name" placeholder="Location Name" onChange={handleChange} /><br />
        <input name="location_type" placeholder="Location Type" onChange={handleChange} /><br />
        <input name="crowd_rating" type="number" placeholder="Crowd" onChange={handleChange} /><br />
        <input name="noise_rating" type="number" placeholder="Noise" onChange={handleChange} /><br />
        <input name="wifi_rating" type="number" placeholder="WiFi" onChange={handleChange} /><br />
        <input name="poster_name" placeholder="Your Name" onChange={handleChange} /><br />
        <textarea name="content" placeholder="Review" onChange={handleChange} /><br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}