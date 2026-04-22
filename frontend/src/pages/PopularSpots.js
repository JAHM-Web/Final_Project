import { useEffect, useState } from 'react';

export default function PopularSpot() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch('/api/reviews')
      .then(res => res.json())
      .then(data => {
        console.log("REVIEWS:", data);
        setReviews(Array.isArray(data) ? data : []);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div>

      {/* HERO HEADER (MATCHES OTHER PAGES) */}
      <div className="hero">
        <h1 className="hero-title">Popular Study Spots</h1>
        <p className="hero-subtitle">
          See what students are saying about study locations around campus.
        </p>
      </div>

      {/* CONTENT */}
      {reviews.length === 0 ? (
        <p style={{ textAlign: "center" }}>No reviews available.</p>
      ) : (
        reviews.map(review => (
          <div key={review.id} className="card">

            <h2>{review.location_name}</h2>

            <p><strong>Type:</strong> {review.location_type}</p>
            <p>{review.content}</p>

            <p><strong>Crowd:</strong> {review.crowd_rating}/3</p>
            <p><strong>Noise:</strong> {review.noise_rating}/3</p>
            <p><strong>WiFi:</strong> {review.wifi_rating}/3</p>

            <p style={{ marginTop: "10px", opacity: 0.7 }}>
              Posted by {review.poster_name}
            </p>

          </div>
        ))
      )}
    </div>
  );
}
