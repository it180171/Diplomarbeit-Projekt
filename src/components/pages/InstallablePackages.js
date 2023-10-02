import { Outlet } from "react-router";
import '../style/installablepackage.css';
import InstallablePackagesData from "../components/InstallablePackages/InstallablePackagesData";
import { useQuery } from "react-query";
import LoadingProgress from '../components/LoadingProgress';
import { AlertSnackbars } from '../components/ExportData';

const InstallablePackages = () => {


    const url = 'https://azwe-app-dev-dfdsin.azurewebsites.net/api/';
    let httpOptions = {
        method: 'GET',
        headers: {
            Authorization: localStorage.getItem('access_token')
        }
    };
    async function fetchVersionData() {

        const iv = await (await (fetch(url + 'Admin/InstallablePackages', httpOptions))).json();
        return iv;
    }

    const { data, status } = useQuery('iv', fetchVersionData);

    if (status === 'loading') {
        return <div className='loadingBox'><LoadingProgress /></div>
    }
    if (status === 'error' || data === null) {
        return <AlertSnackbars type='error' text={data.status == 401 ? 'You have to log in for this functionallity.' : 'Something went wrong, please try it later.'} />
    }

    console.log(data);
    console.log(status)

    return (
       <div className="main">
             <div className="container">
                <h1>InstallablePackages </h1>
                <InstallablePackagesData />

                {
                    data.map((d) => (
                        <div key={d.id}>
                            <p className='versionName'>{d.name}</p>
                        </div>
                    ))
                }

            </div>
            <Outlet /> 
        </div>
        
    )
};

export default InstallablePackages;