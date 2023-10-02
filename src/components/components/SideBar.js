import {FaFileDownload} from "react-icons/fa";
import {ImStack} from "react-icons/im";
import {AiFillFolderAdd} from "react-icons/ai";
import {BiExport, BiImport, BiReset} from "react-icons/bi";
import '../style/navbar.css';
import {Link, useLocation} from "react-router-dom";
import DokaLogo from '../../img/doka.jpg';

import * as React from 'react';
import {useEffect, useState} from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {download} from "./ExportData";
import LogoutButton from "./auth/LogoutButton";
import ResetCachePopup from "../popups/ResetCachePopup";
import '../style/notification.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';


const SideBar = () => {

    const location = useLocation();

    const [bgcolor1, setBgColor1] = useState('#FFDD00');
    const [bgcolor2, setBgColor2] = useState('#FFDD00');
    const [bgcolor3, setBgColor3] = useState('#FFDD00');
    const [bgcolor4, setBgColor4] = useState('#FFDD00');
    const [bgcolor5, setBgColor5] = useState('#FFDD00');

    const [color1, setColor1] = useState('#004588');
    const [color2, setColor2] = useState('#004588');
    const [color3, setColor3] = useState('#004588');
    const [color4, setColor4] = useState('#004588');
    const [color5, setColor5] = useState('#004588');

    const [open, setOpen] = useState(false);

    useEffect(() => {
        setBgColor1('#FFDD00');
        setBgColor2('#FFDD00');
        setBgColor3('#FFDD00');
        setBgColor4('#FFDD00');
        setBgColor5('#FFDD00');

        setColor1('#004588');
        setColor2('#004588');
        setColor3('#004588');
        setColor4('#004588');
        setColor5('#004588');


        switch (window.location.pathname) {
            case '/installablePackages':
                setBgColor1('#004588');
                setColor1('#FFDD00');
                break;
            case '/import':
                setBgColor2('#004588');
                setColor2('#FFDD00');
                break;
            case '/export':
                setBgColor3('#004588');
                setColor3('#FFDD00');
                break;
            case '/versionstack':
                setBgColor4('#004588');
                setColor4('#FFDD00');
                break;
            case '/installables':
                setBgColor5('#004588');
                setColor5('#FFDD00');
                break;
        }
        // console.log(window.location.pathname);
    }, [location]);

    const createNotification = (type) => {
        return () => {
            switch (type) {
                case 'success':
                    NotificationManager.success('Successfully reset cache', 'Success', 5000);
                    break;
                case 'error':
                    NotificationManager.error('Could not reset cache', 'Error', 5000);
                    break;
            }
        };
    };

    const requestOptions = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            AccessControlAllowHeaders: "*",
            body: JSON.stringify({title: 'React POST Request Example'}),
            Authorization: localStorage.getItem('access_token')
        }
    };
    async function resetCache2() {
        const response = await fetch('https://azwe-app-dev-dfdsin.azurewebsites.net/api/Admin/ResetCache', requestOptions);
        if(!(response.status === 204)) {
            createNotification('error');
            console.log("Could not reset cache");
            return;
        }
        createNotification('success');
        console.log("Successfully reset cache");
        setOpen(false);
        return await response.json();
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const ExportMenu = () => {
        const [anchorEl, setAnchorEl] = React.useState(null);
        const open = Boolean(anchorEl);

        const handleClick = (event) => {
            setAnchorEl(event.currentTarget);
        };

        const handleClose = () => {
            setAnchorEl(null);
        };

        return (
            <div>
                <div style={{ backgroundColor: `${bgcolor3}`,
                    color: `${color3}`}}
                     onClick={handleClick}
                     onMouseOver={handleClick}

                     id="demo-positioned-button"
                     aria-owns={anchorEl ? "simple-menu" : undefined}
                     aria-controls={open ? 'demo-positioned-menu' : undefined}
                     aria-haspopup="true"
                >
                    <SideBarIcon title={"Export"} icon={<BiExport size="40" />} />
                </div>

                <Menu
                    className="exportMenu"
                    id="demo-positioned-menu"
                    aria-labelledby="demo-positioned-button"
                    anchorEl={anchorEl}
                    open={open}
                    disableScrollLock={true}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center'
                    }}
                    MenuListProps={{
                        onMouseLeave: handleClose
                    }}
                >
                    <MenuItem onClick={() => download()} >Save Now</MenuItem>
                    <Link className="nav-link" to="/export">
                        <MenuItem onClick={handleClose}>View First</MenuItem>
                    </Link>

                </Menu>
            </div>
        );
    }

    return (
        <div className="nav-container fixed top-0 right-0 h-full w-1/5 m-0
                        flex flex-col
                        text-white shadow-lg font-bold">


            <Link to="/">
                <img className="doka-logo" src={DokaLogo} alt="Doka" />
            </Link>
            <Link className="nav-link" to="/installablePackages" style={{ backgroundColor: `${bgcolor1}`,
                color: `${color1}`}}>
                <SideBarIcon title={"Installable Packages"} icon={<FaFileDownload size="40" />} />
            </Link>
            <Link className="nav-link" to="/import" style={{ backgroundColor: `${bgcolor2}`,
                color: `${color2}`}}>
                <SideBarIcon title={"Import"} icon={<BiImport size="40" />}/>
            </Link>
            {/* <Link className="nav-link" to="/export"> */}
            {/* <SideBarIcon title={"Export"} icon={<BiExport size="40" />} /> */}
            <ExportMenu />
            {/* </Link> */}
            <Link className="nav-link" to="/versionstack" style={{ backgroundColor: `${bgcolor4}`,
                color: `${color4}`}}>
                <SideBarIcon title={"View Versionstack"} icon={<ImStack size="40" />} />
            </Link>
            <Link className="nav-link" to="/installables" style={{ backgroundColor: `${bgcolor5}`,
                color: `${color5}`}}>
                <SideBarIcon title={"Installables"} icon={<AiFillFolderAdd size="40" />} />
            </Link>
            <div className="reset-box">
                <p className="resetTitle">Reset Cache</p>
                <span className="reset"><BiReset className="reset-btn" size="60" onClick={() => {handleClickOpen()}} /></span>
                <ResetCachePopup title="Are you sure you want to reset the Cache?" open={open} setFalse={() => {handleClose()}}
                                 resetCache={() => {resetCache2().then(r => {r.status === '204' ? console.log('Successfully reset cache') : console.log('Could not reset cache') })}} />
            </div>
            <Link className="nav-link" to="/login">
                <LogoutButton/>
            </Link>
           {/*<div className="alert-box">
                <NotificationContainer />
             </div>*/} 
        </div>
    );
};

const SideBarIcon = ({ title, icon }) => (
    <div className="sidebar-icon p-8 active:bg-sky-400 flex flex-row md:shrink-0">
        <p className="title">{title}</p><p className="icon">{icon}</p>
    </div>
);



export default SideBar;