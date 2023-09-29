import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const PrivateRoute2 = ({componentToRender}) => {
    const { currentUser } = useAuthContext();

    if (currentUser) {
        return <Navigate to="/" />
    };

    return componentToRender
}

export default PrivateRoute2