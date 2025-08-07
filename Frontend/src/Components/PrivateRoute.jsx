import { useEffect, useState, useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { validateToken } from '../api/AssignmentsService';
import { JwtContext } from '../util/JwtContext';

const PrivateRoute = ({children}) => {
    const {jwt} = useContext(JwtContext);
    const [isTokenValid, setIsTokenValid] = useState(null);

    useEffect(() => {checkToken()});
    const checkToken = async () => {
      try {
        const response = await validateToken(jwt);
        setIsTokenValid(response.data);
      } 
      catch (err) {
        console.error("Token validation failed: ", err);
        setIsTokenValid(false);
      }
    };
    

    if (isTokenValid === null) return <div>Loading</div>;
    else if(!isTokenValid || !jwt) return <Navigate to='/login' />
    else return children;
}

export default PrivateRoute