import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
function App() {
  return (
    <div className="App">
      <Routes>
         <Route path='/login' element={<Login/>}/>
         <Route path='/register' element={<Register/>}/>

      </Routes>
    </div>
  );
}

export default App;
