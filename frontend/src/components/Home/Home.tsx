import './home.css';
import { Link } from 'react-router-dom'; // Added import for Link
import axios from 'axios'; // Import axios
import { useState } from 'react';

function Home() {

  const [serverTime, setServerTime] = useState<string | undefined | null>(undefined);

  const sessionToken = localStorage.getItem('sessionToken'); // Retrieve session token

  const logOut = async () => {

    const config = {
      // headers: { Authorization: `Bearer ${sessionToken}` }
      headers: { Authorization: `${sessionToken}` }
    };

    try {
      const response = await axios.post('http://localhost:3000/api/logout', null, config);
      console.log(response.data); 

      localStorage.removeItem('sessionToken'); // Clear session token
      window.location.reload(); // Reload to reflect changes

    }
    catch (error) {
      console.error('Error Logging out:', error); // Log any errors
    }

    
  };

  // Function to call the server and get the current time
  const getServerTime = async () => {

    const config = {
      // headers: { Authorization: `Bearer ${sessionToken}` }
      headers: { Authorization: `${sessionToken}` }
    };

    console.log(config);

    try {
      const response = await axios.get('http://localhost:3000/api/server-time', config);
      console.log(response.data); // Log the server time

      setServerTime(response.data.serverTime); // Set server time to state
    }
    catch (error) {
      console.error('Error fetching server time:', error); // Log any errors
    }
  };

  return (
    <div className="app-container">
    <header className="app-header">
      <h1>Session Token test app</h1>
    </header>
    <main className="app-main">
      <div> 
        <h1>Welcome to the App!</h1>
        <Link to="/logon">Go to Logon Page</Link> 
        <br />
        <Link to="/private">Go to Private Page</Link>
        <br />
        {sessionToken && (
          <>
            <p>Your session token: {sessionToken}</p>
            <button onClick={logOut}>Log out</button> 
            <button onClick={getServerTime}>Call Server to get time</button> 
            {serverTime && <p>Server time: {serverTime}</p>}
          </>
        )}
      </div>
    </main>
    <footer className="app-footer">
      <p>&copy; 2023 Our Application. All rights reserved.</p>
    </footer>
  </div>
  );

}

export default Home;
