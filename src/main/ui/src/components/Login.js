import React, { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from '../api/axiosConfig';
import { Authcontext } from "../AuthContext";
import "./Login.css"
import './Inputs.css'
import { animate } from "../clickanim";

const Login = () =>{
    const auth = useContext(Authcontext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const {isClicked, handleClick} = animate();

    const login = async() =>{
        try{
            const request = api.post("/api/auth/signin", {
                email,
                password
            }).then(
                function(response) {
                    console.log(response.data.token);
                    auth.login(response.data.token);
                    console.log(sessionStorage.getItem("token"));
                    navigate("/home")
                })
        }catch(err){
            console.log(err);
        }
    }

    return(
        <div className="form">
            <h3>Login</h3>
            <div className="custom-input">
                <div><label className="custom-label">Email</label></div>
                <input className="custom-field" style={{width:"30%", alignSelf:"center"}} type="email" placeholder="Enter email"
                  value={email}
                  onChange={(event) => {
                  setEmail(event.target.value);
                  }}
                />
            </div>
            <div className="custom-input">
                <div><label className="custom-label">Password</label></div>
                <input className="custom-field" style={{width:"30%", alignSelf:"center"}} type="password" placeholder="Enter password"
                  value={password}
                  onChange={(event) => {
                  setPassword(event.target.value);
                  }}
                />
            </div>
                <button type="submit" className={`button ${isClicked ? "clicked" : ""}`} onClick={()=>handleClick(login)}>Login</button>
                <p>Don't have an account? <a href="http://localhost:3000/signup">Sign Up</a></p>
        </div>
    )
}

export default Login;    