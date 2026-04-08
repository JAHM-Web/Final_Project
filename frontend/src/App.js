import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

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
