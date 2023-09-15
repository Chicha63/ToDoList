import './App.css';
import { Authcontext } from './AuthContext.js';
import { useAuth } from './auth.hook';
import Navbar from './components/Navbar';
import { useRoutes } from './routes';
import { animate } from './clickanim';
import { useEffect, useCallback, useState } from 'react';


function App() {
  const {token, login, logout} = useAuth();
  
  const isAuthenticated = !!token;
  console.log(isAuthenticated);
  const routes = useRoutes(isAuthenticated)
  return (
    <Authcontext.Provider value={{
      token, login, logout, isAuthenticated
    }}>
      {isAuthenticated && <Navbar/>}
      <div className="App">
        {routes}
      </div>
    </Authcontext.Provider>
      
    );
  
}
export default App;
