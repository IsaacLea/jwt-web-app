import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axiosInstance from "../../Utils/axiosInstance";

const ProtectedRoute = () => {

  const [isAuthenticated, setAuthenticated] = useState<boolean | undefined | null>(undefined);
  

  // Call the API to check if the session token is valid
  const isValidSessionToken = async (sessionToken : string | null) => {

    try {
     
      const response = await axiosInstance.get('http://localhost:3000/api/check-session');
      
      return (response.status == 200);
      
    } catch {
      return false;
    }
  }

  useEffect(() => {

    const jwtAccessToken = localStorage.getItem('sessionToken');

    if (!jwtAccessToken) {
      setAuthenticated(null); // No session token, user is not logged in
      return;
    }
    
    isValidSessionToken(jwtAccessToken).then((isValid) => {
      if (isValid) {
        console.log("Valid session token");       
        setAuthenticated(true);   

      } else {
        setAuthenticated(null);   
      }
    });
  }, []);

  if (isAuthenticated === undefined) return null; // Loading state

  if (!isAuthenticated) {
    return <Navigate to="/logon" replace />;
  }

  // Return Outlet instead of children so that this component can be used as a layout component, meaning it can wrap any number of protected child reoutes
  return <Outlet />; 

}

export default ProtectedRoute;