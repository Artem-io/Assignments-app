import { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import Login from './Components/Login'
import PrivateRoute from './Components/PrivateRoute';
import AssignmentDetails from './Components/AssignmentDetails';
import {useLocalStorage} from './util/useLocalStorage';
import { jwtDecode } from "jwt-decode";
import TeacherDashboard from './Components/TeacherDashboard'
import {JwtContext} from './util/JwtContext';
import TeacherAssignmentDetails from './Components/TeacherAssignmentDetails';

function App() 
{
  const [jwt, setJwt] = useLocalStorage('', 'jwt');
  const decoded = jwt? jwtDecode(jwt) : { authorities: [] };
  useEffect(()=>console.log(decoded.authorities), [decoded.authorities]);

  return (
    <JwtContext.Provider value={{ jwt, setJwt }}>
      <Routes>
        <Route path='/' element={<Navigate to='/dashboard' />} />
        <Route path='/assignments/:id' element={decoded.authorities.find((role) => role === 'TEACHER')? 
        <TeacherAssignmentDetails/> : <AssignmentDetails />}/>

        <Route path='/dashboard' element={
          decoded.authorities.find((role) => role === 'TEACHER')? 
          <PrivateRoute> <TeacherDashboard /> </PrivateRoute>
          : <PrivateRoute> <Dashboard /> </PrivateRoute>
          } />
          
        <Route path='/login' element={<Login />} />
      </Routes>
    </JwtContext.Provider>
  )
}

export default App
