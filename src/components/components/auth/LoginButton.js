import React, {useState} from 'react';
import {useAuth} from "react-oidc-context";
import SideBar from "../SideBar";
import {Outlet} from "react-router";
import '../../style/home.css';

const LoginButton = () => {

    const auth = useAuth();
    const [parentHover, setParentHover] = useState(false);

    /*<div className="login-container" style={parentHover ? { backgroundColor : "#f1faee" } : { backgroundColor: "#e63946" }} >*/

    return (
        <div className="login-container" style={parentHover ? { backgroundColor : "#004588" } : { backgroundColor: "#FFDD00" }} >
        <button className="login-btn" onClick={auth.signinRedirect} onMouseOver={() => {setParentHover(true)}} onMouseOut={() => {setParentHover(false)}}>
            Authenticate
        </button>
        <Outlet/>
        </div>
    )
}

export default LoginButton;