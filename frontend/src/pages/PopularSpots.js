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
      <h1>Popular Study Spots</h1>

      {reviews.length === 0 ? (
        <p>No reviews available.</p>
      ) : (
        reviews.map(review => (
          <div key={review.id}>
            <h2>{review.location_name}</h2>
            <p>Location Type: {review.location_type}</p>

            <p>Review: {review.content}</p>

            <p>Crowd: {review.crowd_rating}/3</p>
            <p>Noise: {review.noise_rating}/3</p>
            <p>WiFi: {review.wifi_rating}/3</p>

            <p>Posted by {review.poster_name}</p>
          </div>
        ))
      )}
    </div>
  );
}