import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: {children: React.ReactNode; }) => {

  const [currentUser, setCurrentUser] = useState<string | undefined | null>(undefined);
  const sessionToken = localStorage.getItem('sessionToken');

  const isValidSessionToken = async (sessionToken : string | null) => {

    console.log("Check session token: ", sessionToken);
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

  // Render the protected component if authenticated
  return children; 

}

export default ProtectedRoute;