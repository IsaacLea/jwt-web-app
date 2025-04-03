import './App.css';
import Logon from './components/Logon/Logon'; // Import the Logon component
import { useEffect, useState } from 'react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/check-session', {
          method: 'GET',
          headers: {
            'Authorization': localStorage.getItem('sessionToken') || ''
          }
        });
        setIsAuthenticated(response.ok);
      } catch {
        setIsAuthenticated(false);
      }
    };

    checkAuthentication();
  }, []);

  if (!isAuthenticated) {
    return <Logon />; // Redirect to Logon page if not authenticated
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Session Token test app</h1>
        <p>Your gateway to modern solutions.</p>
      </header>
      <main className="app-main">
        <h1>Welcome to the App!</h1>
        <p>You are logged in.</p>
        <button className="check-session-button" onClick={async () => {
          try {
            const response = await fetch('http://localhost:3000/api/check-session', {
              method: 'GET',
              headers: {
                'Authorization': localStorage.getItem('sessionToken') || ''
              }
            });
            if (!response.ok) {
              throw new Error('Session invalid or expired');
            }
            const data = await response.json();
            alert(data.message);
          } catch (error) {
            alert(`Error: ${error instanceof Error ? error.message : String(error)}`);
          }
        }}>
          Check Session
        </button>
      </main>
      <footer className="app-footer">
        <p>&copy; 2023 Our Application. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
