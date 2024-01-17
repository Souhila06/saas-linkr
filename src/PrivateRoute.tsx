import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route } from 'react-router-dom';

interface PrivateRouteProps {
    children: React.ReactNode;
    allowedRoles?: string[];
}
const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, allowedRoles }) => {
    const token = localStorage.getItem('accessToken');
    const userString = localStorage.getItem('user');

  
    const user = userString ? JSON.parse(userString) : null;


    if (user && user.emailVerified) {
        const emailVerified = user.emailVerified;
        console.log('Email Verified:', emailVerified);
      
 
      

        localStorage.setItem('user', JSON.stringify(user));
      
       
      } else {
        console.log('User is null or email is not verified.');
      }
    if (!token) {
        console.log('Token is missing');
        return <Navigate to="/login" replace />;
    }

    if (!user) {
        console.log('User information is missing');
        return <Navigate to="/login" replace />;
    }
    console.log('User object:', user);
    

    if (!user.emailVerified) {

        console.log('Email is not verified. User object:', user);
        return <Navigate to="/verifyemail" replace />;
    }
    if (allowedRoles && !allowedRoles.includes(user.role)) {
        console.log('User does not have the required role. User object:', user);
        return <Navigate to="/notfound" replace />;
    }

    return <>{children}</>;
};

export default PrivateRoute;
