import './App.css';
import { Authcontext } from './AuthContext.js';
import api from './api/axiosConfig';
import { useAuth } from './auth.hook';
import Navbar from './components/Navbar';
import { useRoutes } from './routes';
import { animate } from './clickanim';
import { useEffect, useCallback, useState } from 'react';
import { useNavigate } from "react-router-dom";


function App() {
  const {token, login, logout} = useAuth();
  const [tasks, setTasks] = useState([]);
  const [searchData, setSearchData] = useState("");
  const navigate = useNavigate();
  const updateSearch = (data) => {
    setSearchData(data);
  };
  const fetchTasks = async () => {
    api.get('/api/tasks/get',{headers:{Authorization:`Bearer ${token}`}}).then((res) => {
        setTasks(res.data);
        if(searchData != ""){
          const filteredTasks = tasks.filter((task) =>
          task.title.toLowerCase().includes(searchData.toLowerCase())
          )
          setTasks(filteredTasks);
        }
        console.log(tasks);
    }).catch(function(error){
        if(error.response.status === 401){
          logout();
          navigate("/login")
        }
    })
  };
  const isAuthenticated = !!token;
  console.log(isAuthenticated);
  const routes = useRoutes(isAuthenticated)
  return (
    <Authcontext.Provider value={{
      tasks, searchData, updateSearch, fetchTasks, token, login, logout, isAuthenticated
    }}>
      {isAuthenticated && <Navbar/>}
      <div className="App">
        {routes}
      </div>
    </Authcontext.Provider>
      
    );
  
}
export default App;
