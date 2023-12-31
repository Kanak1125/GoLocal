import React from 'react'
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

export default function PrivateRoute({componentToRender}) {
    const { currentUser } = useAuthContext();

    if (!currentUser) {
      return <Navigate to="/login" />
    }

    return componentToRender
}
