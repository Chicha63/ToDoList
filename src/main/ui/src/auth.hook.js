import { useCallback, useEffect, useState } from "react"

export const useAuth = () =>{
    const [token, setToken] = useState("");

    const login = useCallback((jwtToken)=>{
        setToken(jwtToken);
        sessionStorage.setItem("token", token);
    },[])

    const logout = useCallback(()=>{
        setToken(null);
        sessionStorage.removeItem("token");
    },[])

    useEffect(()=>{
        const data = sessionStorage.getItem("token")

        if(data){
            login(data);
        }
    },[login])

    return {token, login, logout}
}