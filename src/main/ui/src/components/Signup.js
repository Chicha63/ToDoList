import React, { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from '../api/axiosConfig';
import "./Inputs.css"
import { Authcontext } from "../AuthContext";
import { animate } from "../clickanim";

const Signup = () =>{
    const {isClicked, handleClick} = animate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const auth = useContext(Authcontext);
    const signup = async() =>{
        try{
            const request = api.post("/api/auth/signup", {
                email,
                password
            }).then(
                function(response) {
                auth.login(response.data.token);
                navigate("/login");
            });
        }catch(err){
            console.log(err);
        }
    }

    return(
        <div className="form">
            <h3>Sign up</h3>
            <div className="custom-input">
                <div><label className="custom-label">Email</label></div>
                <input className="custom-field" type="email" style={{width:"30%", alignSelf:"center"}} placeholder="Enter email"
                  value={email}
                  onChange={(event) => {
                  setEmail(event.target.value);
                  }}
                />
            </div>
            <div className="custom-input">
                <div><label className="custom-label">Password</label></div>
                <input className="custom-field" type="password" style={{width:"30%", alignSelf:"center"}} placeholder="Enter password"
                  value={password}
                  onChange={(event) => {
                  setPassword(event.target.value);
                  }}
                />
            </div>
            <button type="submit" className={`button ${isClicked ? "clicked" : ""}`} onClick={()=>handleClick(signup)}>Sign Up</button>
                <p>Back to <a href="http://localhost:3000/login">Login</a></p>
        </div>
    )
}

export default Signup;    