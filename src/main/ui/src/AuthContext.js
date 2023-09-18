import { createContext } from "react";
function noop(){}

export const Authcontext = createContext({
    tasks:null,
    searchData:null,
    updateSearch:noop,
    fetchTasks:noop,
    token:null,
    login:noop,
    logout:noop,
    handleClick:noop,
    isClicked:false,
    isAuthenticated:false
})