import axios from "axios";
import { useState } from "react";

export default axios.create({
    baseURL:'http://localhost:8080',
    headers:{"ngrok-skip-browser-warning": "true",
             "Authorization":`Bearer ${sessionStorage.getItem("token")}`}
})