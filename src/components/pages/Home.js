import { Outlet } from "react-router";
import '../style/home.css';
import { Link } from "react-router-dom";

import { FaFileDownload } from "react-icons/fa";
import { ImStack } from "react-icons/im";
import { AiFillFolderAdd } from "react-icons/ai";
import { MdImportExport } from "react-icons/md";
import SideBar from "../components/SideBar";

const Home = () => {
    return (
        <div className="menuContainer">
            <div className="innerBox">
                <Link className="nav-link" to="/installablePackages">
                    <HomeMenuItem text="Installable Packages" icon={<FaFileDownload />} />
                </Link>
                <Link className="nav-link" to="/import">

                    <HomeMenuItem text="Export & Import" icon={<MdImportExport />} />
                </Link>
                <Link className="nav-link" to="/versionstack">
                    <HomeMenuItem text="View Versionstack" icon={<ImStack />} />
                </Link>
                <Link className="nav-link" to="/installables">

                    <HomeMenuItem text="Installables" icon={<AiFillFolderAdd />} />
                </Link>

            </div>
        </div>
    )
}

function HomeMenuItem({ text, icon }) {
    return (
        <div>
            <h2>{text}</h2>
            {icon}
        </div>
    );
}

export function HomeButton() {
    return (
        <Link to="/">
            <div className="wrapper">
                <p className="tooltip">Home</p>
                <Outlet />
            </div>
        </Link>
    )
}

export default Home;