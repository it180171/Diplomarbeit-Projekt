import {Outlet} from "react-router";
import {useQuery} from "react-query";
import CircularProgress from "@mui/material/CircularProgress";
import {AlertSnackbars} from '../components/ExportData';
import '../style/versionstack.css';
import Popup from "../popups/Popup";
import {BsInfoCircle} from "react-icons/bs";
import {useContext, useEffect, useState} from "react";
import PopupVersionInfo from "../popups/PopupVersionInfo";
import '../components/models/Models';
import {TokenContext} from "../../App";

const Versionstack = () => {

    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [currentId, setCurrentId] = useState(311);
    const [versionData, setVersionData] = useState(null);

    const token = useContext(TokenContext);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setIsActive(false);
    };

    const handleClickOpen1 = (props) => {
        console.log("test");
        setOpen1(!open1);
        console.log(props.id);
        if(props.id !== undefined) {
            console.log(props.id);
            setCurrentId(props.id);
            return props.id;
        }
    };

    const handleClose1 = () => {
        setOpen1(!open1);
    };

    const url = 'https://azwe-app-dev-dfdsin.azurewebsites.net/api/';
    let httpOptions = {
        method: 'GET',
        headers: {
            Authorization: localStorage.getItem('access_token')
        }
    };

    async function fetchVersionData() {
        try {
            const response = await fetch(url + 'InstallableQuery/InstallableVersions/GetVersionInfos/de', httpOptions);
    
            if (!response.ok) {
                console.error(`Request failed with status ${response.status}`);
                return 'error';
            }
    
            const iv = await response.json();
            console.log(iv);
    
            const deltaDataPromises = [];
            const arr = []; // To keep track of processed versionIndexes
    
            for (let d of iv) {
                for (let child of d.children) {
                    for (let i of child.installableDeltaVersions) {
                        const versionIndex = i.versionIndex;
    
                        // Check if versionIndex is not in the arr (no duplicate)
                        if (!arr.includes(versionIndex)) {
                            arr.push(versionIndex); // Mark as processed
                            const d = fetch(url + `InstallableQuery/InstallableVersions/${versionIndex}`, httpOptions).then((response) => {
                                if (!response.ok) {
                                    console.error(`Request failed with status ${response.status}`);
                                    return null;
                                }
                                return response.json();
                            });
                            deltaDataPromises.push(d);
                        }
                    }
                }
            }
    
            const deltaData = await Promise.all(deltaDataPromises);
            console.log(deltaData);
    
            return deltaData;
        } catch (error) {    
            console.error(error);
            return 'error';
        }
    }
    
    


    const {data, status} = useQuery('vs', fetchVersionData);

    useEffect(() => {
        console.log("useEffect1");
        if(data !== undefined) {
            console.log("test1")
            setVersionData(data.filter((d) => d.id === currentId)[0]);
            if(versionData !== null) {
                console.log("test2");
            }
        }
    }, [currentId, data])

    useEffect(() => {
        console.log("useEffect2");
        console.log(versionData);
    }, [versionData])


    if (status === 'loading') {
        console.log('loading');
        return <div className="box loadingBox"><CircularProgress className="loading"/></div>
    }
    if (status === 'error' || data === 'error' || data === null || data === undefined) {
        console.log('error');
        return <AlertSnackbars type='error' text='Error message'/>
    }
    if (status === 'success') {
        console.log("success")
    }

    /*const DetailComponent = () => {
        console.log('component');
        return (
            <div>
            <div className="details">
                <Popup title="Installable Version Info.
                SGSDSFSFSDFSF" open={open1} setFalse={() => {handleClose1()}} />
                <h2>DFD</h2>
            </div>
          {  data.map((d) => (
                <div key={d.id}>
                    <p>{d.name}</p>
                    <p>{d.fileName}</p>
                    <p>{d.blobSas}</p>
                    <p>{d.versionIdentifier}</p>
                    <p>{d.fileLength}</p>
                    <p>{d.versionDate}</p>
                </div>
    
            ))
          }
            </div>
        )
    }*/

    return (
        <div className="box">
            <div className="popup-info">
                <h1>Installable Version Info</h1>
                <div className="info-icon-box">
                    <BsInfoCircle className="info-icon" size="40" onClick={handleClickOpen} />
                </div>
                <h2>Click for more information!</h2>
                <Popup title="Installable Version Info.
            Click the boxes below for more detailed information!" open={open} setFalse={() => {handleClose()}} />
            </div>
            <div className='installerVersions'>
            {status === 'success' && data.length > 0 ? (
                    data.map((d) => (
                        <div onClick={() => handleClickOpen1(d)} key={d.id}>
                            <p className='versionName'>{d.name}</p>
                        </div>
                    ))
                ) : (
                    // Display a loading indicator or message while data is loading
                    status === 'loading' ? (
                        <div>Loading...</div>
                    ) : (
                        <div>No data available</div>
                    )
                )}

                <PopupVersionInfo id={currentId}
                                  blobSas={versionData && versionData.blobSas}
                                  versionIdentifier={versionData && versionData.versionIdentifier}
                                  fileLength={versionData && versionData.fileLength}
                                  md5Hash={versionData && versionData.md5Hash}
                                  versionDate={versionData && versionData.versionDate}
                                  fullV={versionData && versionData.fullV}
                                  title={`Version Info for '${versionData && versionData.name}'`}
                                  open={open1} setFalse={() => {handleClose1()}} />  

                <Outlet/>
            </div>
        </div>
    )


};

export default Versionstack;