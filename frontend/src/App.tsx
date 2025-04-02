import './App.css';

function App() {
  const handleLogon = () => {
    alert('Logon button clicked!');
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Session Token test app</h1>
        <p>Your gateway to modern solutions.</p>
      </header>
      <main className="app-main">
        <button className="logon-button" onClick={handleLogon}>
          Logon
        </button>
      </main>
      <footer className="app-footer">
        <p>&copy; 2023 Our Application. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
