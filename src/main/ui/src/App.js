import './App.css';
import { Authcontext } from './AuthContext.js';
import { useAuth } from './auth.hook';
import { useRoutes } from './routes';


function App() {
  const {token, login, logout} = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated)
  return (
    <Authcontext.Provider value={{
      token,login, logout, isAuthenticated
    }}>
      <div className="App">
        {routes}
      </div>
    </Authcontext.Provider>
      
    );
  
}
export default App;
