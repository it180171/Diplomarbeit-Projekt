import {useAuth} from "react-oidc-context";
import SideBar from "../SideBar";
import React, {useEffect, useState} from "react";
import '../../style/navbar.css';
import Home from "../../pages/Home";


function LogoutButton() {

    const auth = useAuth();
    const[isAuth, setIsAuth] = useState(true);

    useEffect(() => {
        setIsAuth(isAuth);
    }, [auth.isAuthenticated])

    const handleClick = () => {
        auth.removeUser().then(r => console.log(r));
        window.location.replace('http://localhost:3000/login');
    }

    return (
        <div onClick={() => handleClick()}>
            <button className="logout-btn">
                Log out
            </button>
        </div>
    )
}

export default LogoutButton