import React, { useContext } from "react";
import { Authcontext } from "../AuthContext";
import './Navbar.css'
import { Link, useNavigate } from "react-router-dom";
import api from '../api/axiosConfig';

const Navbar = () =>{

    const navigate = useNavigate();
    const auth = useContext(Authcontext);

    const logout = async() =>{
        try{
            const request = api.post("/api/logout",{},{headers:{Authorization:`Bearer ${sessionStorage.getItem("token")}`}})
            .then(
                function(response) {
                    console.log(response)
                    auth.logout();
                    navigate("/login")
                })
        }catch(err){
            console.log(err);
        }
    }
    return(
        <nav className="navbar">
            <Link to="/home" className="navbar-logo">Home</Link>
            <ul className="navbar-list">
                <li><Link to="/addtask">Add task</Link></li>
                <li><button className="logout-button" onClick={logout}>Logout</button></li>
            </ul>
        </nav>
    )
}

export default Navbar;