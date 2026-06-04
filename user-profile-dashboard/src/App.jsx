import React, { useState, useEffect } from "react";



function App() {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [secondsOnpage, setSecondsOnPage] = useState(0);

  const fetchUser = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users/5');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const userData = await response.json();
      setUser(userData);
      setLoading(false);

    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => { fetchUser() }, []);


  useEffect(() => {
    if (user) {
      document.title = `Profile ${user.name} | User Dashboard`;
    } else {
      document.title = 'Loading... | User Dashboard';
    }
  }, [user]);

  useEffect(() => {

    const timer = setInterval(() => {
      setSecondsOnPage(prev => prev + 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };

  }, []);

  return (
    <div className="App">
      <h1>User Profile Dashbaord</h1>
      <p style={{ fontStyle: 'italic', marginBottom: '20px', textAlign: 'center', color: '#666' }}>
        Time on page: {secondsOnpage} seconds
      </p>
      {error && (
        <div className="error-message" style={{ color: 'red', padding: '20px', border: '1px solid red' }}>
          <h2>Error!</h2>
          <p>{error}</p>
        </div>
      )}

      {loading && !error && (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <p>Loading user data....</p>
        </div>
      )}

      {user && !loading && !error && (
        <div style={{ padding: '20px', border: '1px solid #ccc' }}>
          <h2>User Information </h2>
          <p><strong>Name:</strong>{user.name}</p>
          <p><strong>Email:</strong>{user.email}</p>
          <p><strong>Phone:</strong>{user.phone}</p>
          <p><strong>Website:</strong>{user.website}</p>
        </div>
      )}
    </div>
  );
}

export default App;