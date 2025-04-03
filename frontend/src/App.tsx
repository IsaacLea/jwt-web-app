import { Route, Routes } from 'react-router-dom';
import './App.css';
import Logon from './components/Logon/Logon'; // Import the Logon component

import Home from './components/Home/Home';
import PrivatePage from './components/PrivatePage/PrivatePage';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

type AuthUser = { id: string; name: string };
type ProtectedRouteProps = {
  user: AuthUser | null;
  children: React.ReactNode;
};

function App() {

  return (
    <div>
      {/* <button onClick={() => navigate(-1)}>go back</button> */}
      {/* <Nav/> */}
      <Routes>                
        <Route path="/" element={<Home/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/logon" element={<Logon/>}/>
        <Route element={<ProtectedRoute/>}>
          <Route path="/private" element={<PrivatePage/>}/>
        </Route>

        {/* <Route
          path="/private"
          element={
            <ProtectedRoute>
              <PrivatePage />
            </ProtectedRoute>
          }
        /> */}
        
        {/* <Route path="*" element={<NotFound/>}/> */}
      </Routes>
    </div>
);
}

export default App;
