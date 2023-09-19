import React, { useContext, useState } from "react";
import { Authcontext } from "../AuthContext";
import './styles/Navbar.css'
import { Link, useNavigate } from "react-router-dom";
import api from '../api/axiosConfig';

const Navbar = () => {
    const navigate = useNavigate();

    const auth = useContext(Authcontext);

    const logout = async () => {
        const request = api.post("/api/logout", {}, { headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` } })
            .then(function (response) {
                console.log(response)
                auth.logout();
                navigate("/login")
            }).catch(function(error){
                if(error.response.status == "401"){
                    auth.logout();
                    navigate("/login");
                }
            })
    }

    const handleSearchInputChange = (e) => {
        auth.updateSearch(e.target.value);
        auth.fetchTasks();
    }

    const handleSearchInputFocus = () => {
        auth.updateSearch("");
        auth.fetchTasks();
    }
    
    return (
        <nav className="navbar">
            <Link to="/home" className="navbar-logo">Task Manager</Link>
            <ul className="navbar-list">
                <li className="search-bar">
                    <input
                        type="text"
                        placeholder="Search"
                        value={auth.searchData}
                        onChange={handleSearchInputChange}
                        onFocus={handleSearchInputFocus}
                    />
                    <i className="search-button">&#128269;</i>
                </li>
                <li><Link to="/addtask">Add Task</Link></li>
                <li><button className="logout-button" onClick={logout}>Logout</button></li>
            </ul>
        </nav>
    )
}

export default Navbar;