import { Routes, Route, Navigate } from "react-router-dom"
import Home from "./components/Home"
import Login from "./components/Login"
import Signup from "./components/Signup"

export const useRoutes = isAuthenticated => {
    if(isAuthenticated){
        return(
        <Routes>
          <Route path='/'  element={<Login/>}>
          </Route>
          <Route path='/signup' element={<Signup/>}>
          </Route>
          <Route path='/home' element={<Home/>}></Route>
          <Route path="*" element={<Navigate to="/" replace/>}/>
        </Routes>
        )
    }else{
        return(
        <Routes>
          <Route path='/'  element={<Login/>}>
          </Route>
          <Route path='/signup' element={<Signup/>}>
          </Route>
          <Route path="*" element={<Navigate to="/" replace/>}/>
        </Routes>
        )
    }
}