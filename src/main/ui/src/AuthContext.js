import { createContext } from "react";
function noop(){}

export const Authcontext = createContext({
    token:null,
    login:noop,
    logout:noop,
    isAuthenticated:false
})