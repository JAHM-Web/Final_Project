import { useEffect, useState } from 'react';

export default function PopularSpot() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch('/api/reviews')
      .then(res => res.json())
      .then(data => {
        setReviews(Array.isArray(data) ? data : []);
      })
      .catch(err => console.error(err));
  }, []);

  const getRatingLabel = (value) => {
    if (value <= 1) return "Low";
    if (value === 2) return "Moderate";
    return "High";
  };

  return (
    <div>
      <h1 className="hero-title" style={{ textAlign: "center", marginBottom: "20px" }}>
        Popular Study Spots
      </h1>

      {reviews.length === 0 ? (
        <p style={{ textAlign: "center" }}>No reviews available yet.</p>
      ) : (
        reviews.map(review => (
          <div className="card" key={review.id}>

            {/* TOP SECTION */}
            <div style={{ marginBottom: "10px" }}>
              <h2 style={{ marginBottom: "4px" }}>
                {review.location_name}
              </h2>

              <span style={{
                display: "inline-block",
                background: "#DDE5B6",
                padding: "4px 10px",
                borderRadius: "20px",
                fontSize: "12px",
                marginTop: "4px"
              }}>
                {review.location_type}
              </span>
            </div>

            {/* REVIEW TEXT */}
            <p style={{
              fontStyle: "italic",
              marginBottom: "12px",
              color: "#444"
            }}>
              “{review.content}”
            </p>

            {/* RATINGS GRID */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "10px",
              marginBottom: "10px"
            }}>

              <div>
                <strong>Crowd</strong>
                <p>{review.crowd_rating}/3 ({getRatingLabel(review.crowd_rating)})</p>
              </div>

              <div>
                <strong>Noise</strong>
                <p>{review.noise_rating}/3 ({getRatingLabel(review.noise_rating)})</p>
              </div>

              <div>
                <strong>WiFi</strong>
                <p>{review.wifi_rating}/3 ({getRatingLabel(review.wifi_rating)})</p>
              </div>

            </div>

            <div style={{
              borderTop: "1px solid rgba(0,0,0,0.08)",
              paddingTop: "8px",
              fontSize: "13px",
              color: "#666",
              display: "flex",
              justifyContent: "space-between"
            }}>
              <span>Posted by {review.poster_name}</span>
              <span>📍 MSU Campus</span>
            </div>

          </div>
        ))
      )}
    </div>
  );
}
