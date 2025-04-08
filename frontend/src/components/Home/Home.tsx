import './home.css';
import { Link } from 'react-router-dom'; // Added import for Link
import { useState } from 'react';
import axiosInstance from '../../Utils/axiosInstance';

function Home() {

  const [serverTime, setServerTime] = useState<string | undefined | null>(undefined);

  const logOut = async () => {

    try {
      const response = await axiosInstance.post('/api/logout');
      console.log(response.data); 


      localStorage.removeItem('accessToken'); 
      localStorage.removeItem('refreshToken'); 
      window.location.reload(); // Reload to reflect changes

    }
    catch (error) {
      console.error('Error Logging out:', error); // Log any errors
    }
  };

  // Function to call the server and get the current time
  const getServerTime = async () => {

    try {
      
      const response = await axiosInstance.get('/api/server-time');
      
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
        {true && (
          <>
            {/* <p>Your session token: {sessionToken}</p> */}
            <button onClick={logOut}>Log out</button> 
            <button onClick={getServerTime}>Call Server to get time</button> 
            {serverTime && <p>Server time: {serverTime}</p>}
          </>
        )}
      </div>
    </main>
    <footer className="app-footer">
      {<p>&copy; Demo app</p>}
    </footer>
  </div>
  );

}

export default Home;
