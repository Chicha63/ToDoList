import { useCallback, useState } from "react"

export const useAuth = () =>{
    const [token, setToken] = useState(sessionStorage.getItem("token"));

    const login = useCallback((jwtToken)=>{
        setToken(jwtToken);
        sessionStorage.setItem("token", jwtToken);
    },[])

    const logout = useCallback(()=>{
        setToken(null);
        sessionStorage.removeItem("token");
    },[])

    return {token, login, logout};
}