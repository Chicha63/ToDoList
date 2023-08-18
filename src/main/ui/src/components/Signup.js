import React, { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from '../api/axiosConfig';
import { Authcontext } from "../AuthContext";

const Signup = () =>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const auth = useContext(Authcontext);
    const signup = async() =>{
        try{
            const request = api.post("/api/auth/signup", {
                email,
                password
            }).then(function(response) {
                auth.login(response.data.token);
                navigate("/home");
            });
        }catch(err){
            console.log(err);
        }
    }

    return(
        <div>
            <h3>Sign up</h3>
            <div>
                <div><label>Email</label></div>
                <input type="email" placeholder="Enter email"
                  value={email}
                  onChange={(event) => {
                  setEmail(event.target.value);
                  }}
                />
            </div>
            <div>
                <div><label>Password</label></div>
                <input  type="password" placeholder="Enter password"
                  value={password}
                  onChange={(event) => {
                  setPassword(event.target.value);
                  }}
                />
            </div>
                <button type="submit" onClick={signup}>Sign up</button>
        </div>
    )
}

export default Signup;    