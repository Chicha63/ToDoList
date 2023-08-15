import './App.css';
import api from './api/axiosConfig';
import Login from './components/Login';
import {Routes, Route} from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/login' element={<Login/>}>
        </Route>
      </Routes>
    </div>
  );
}
export default App;
