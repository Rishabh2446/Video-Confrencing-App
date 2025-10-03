import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import RouteProtector from './protectedRoute/RouteProtector';
import MeetRoom from './pages/MeetRoom';
import LoginProtector from './protectedRoute/LoginProtector';
function App() {
  return (
    <div className="App">
      <Routes>
         <Route path='/login' element={<LoginProtector> <Login/> </LoginProtector>}/>
         <Route path='/register' element={<LoginProtector> <Register/></LoginProtector>}/>
         <Route path='/meet/:id' element={<RouteProtector> <MeetRoom/></RouteProtector>}/>

      </Routes>
    </div>
  );
}

export default App;
