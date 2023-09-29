import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './authentication/PrivateRoute';
import PrivateRoute2 from './authentication/PrivateRoute2';
import Signup from './authentication/SignUp';
import Login from './authentication/Login';
import Feed from './Pages/Feed';
import ForgotPassword from './authentication/ForgotPassword';
import AuthProvider from './context/AuthContext';

function App() {
  return (
    <BrowserRouter >
      <AuthProvider>
        <Routes>
          {/* <Route element={<PrivateRoute 
            componentToRender={<Profile />}
          />}>
            <Route path='/user' element={<Profile />} />
          </Route> */}
          <Route element={<PrivateRoute2 componentToRender={<Signup />}/>}>
            <Route path='/signup' element={<Signup />}/>
          </Route>
          <Route element={<PrivateRoute2 componentToRender={<Login />}/>}>
            <Route path='/login' element={<Login />}/>
          </Route>
          <Route element={<PrivateRoute2 componentToRender={<ForgotPassword />}/>}>
            <Route path='/forgot-password' element={<ForgotPassword />}/>
          </Route>
          {/* <Route element={<PrivateRoute componentToRender={<UpdateProfile />}/>}>
            <Route path='/update-profile' element={<UpdateProfile />} />
          </Route> */}
          <Route element={<PrivateRoute componentToRender={<Feed />}/>}>
            <Route path='/' element={<Feed />}/>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;