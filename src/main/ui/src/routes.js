import { Routes, Route, Navigate } from "react-router-dom"
import Home from "./components/Home"
import Login from "./components/Login"
import Signup from "./components/Signup"
import AddTask from "./components/AddTask"
import Navbar from "./components/Navbar"

export const useRoutes = isAuthenticated => {
    if(isAuthenticated){
        return(
            <Routes>
              <Route path='/login'  element={<Login/>}>
              </Route>
              <Route path='/signup' element={<Signup/>}>
              </Route>
              <Route path='/home' element={<Home/>}></Route>
              <Route path='/addtask' element={<AddTask/>}></Route>
              <Route path="/*" element={<Navigate to="/home"/>}/>
            </Routes>
        )
    }else{
        return( 
        <Routes>
          <Route path='/login'  element={<Login/>}>
          </Route>
          <Route path='/signup' element={<Signup/>}>
          </Route>
          <Route path="/*" element={<Navigate to="/login" replace/>}/>
        </Routes>
        )
    }
}