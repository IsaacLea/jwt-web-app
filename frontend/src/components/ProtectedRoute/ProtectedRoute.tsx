import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {

  const [currentUser, setCurrentUser] = useState<string | undefined | null>(undefined);
  

  // Call the API to check if the session token is valid
  const isValidSessionToken = async (sessionToken : string | null) => {

    try {
      const response = await fetch('http://localhost:3000/api/check-session', {
        method: 'GET',
        headers: {
          'Authorization': sessionToken || ''
        }
      });

      return(response.ok);
    } catch {
      return false;
    }
  }

  useEffect(() => {

    const sessionToken = localStorage.getItem('sessionToken');

    if (!sessionToken) {
      setCurrentUser(null); // No session token, user is not logged in
      return;
    }
    
    isValidSessionToken(sessionToken).then((isValid) => {
      if (isValid) {
        console.log("Valid session token");       
        setCurrentUser("Isaac");   

      } else {
        setCurrentUser(null);   
      }
    });
  }, []);

  if (currentUser === undefined) return null; // Loading state

  if (!currentUser) {
    return <Navigate to="/logon" replace />;
  }

  // Return Outlet instead of children so that this component can be used as a layout component, meaning it can wrap any number of protected child reoutes
  return <Outlet />; 

}

export default ProtectedRoute;