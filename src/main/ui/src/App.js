import './App.css';
import api from './api/axiosConfig';
import Login from './components/Login';
import {Routes, Route} from 'react-router-dom';
import Signup from './components/Signup';
import Home from './components/Home';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/login' element={<Login/>}>
        </Route>
        <Route path='/signup' element={<Signup/>}>
        </Route>
        <Route path='/home' element={<Home/>}>
        </Route>
      </Routes>
    </div>
  );
}
export default App;
