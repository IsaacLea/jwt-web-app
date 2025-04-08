import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Added import for useNavigate

// Import CSS module.  Modules allow for scoped CSS, preventing class name collisions.
import styles from './Logon.module.css'; 
import axiosInstance from '../../Utils/axiosInstance';

function Logon() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogon = async () => {
    try {
      
      const response = await axiosInstance.post('/api/logon', JSON.stringify({ username, password }));

      if (response.status !== 200) {
        console.log(response);
        throw new Error('Failed to logon');
      }

      const jwtAccessToken = response.data.token;
      const jwtRefreshToken = response.data.refreshToken;
      

      localStorage.setItem('sessionToken', jwtAccessToken); 
      localStorage.setItem('refreshToken', jwtRefreshToken);

      navigate('/'); // Redirect to home page
      
    } catch (error) {
      alert(`Error: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  return (
    <div className={styles['logon-container']}>
      <h1>Logon</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogon();
        }}
      >
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Logon</button>
      </form>
    </div>
  );
}

export default Logon;
