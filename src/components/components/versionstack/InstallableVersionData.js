import '../../style/versionstack.css';
import {useState} from "react";
import {Button} from "@mui/material";
import '../../style/versionstack.css';

const InstallableVersionData = (props) => {
    const [showMore, setShowMore] = useState(false);
    const text = props.blobSas;
    let parsedDate = "";

    function convertUTCDateToLocalDate(date) {
        let dateLocal = new Date(date);
        return new Date(dateLocal.getTime() - dateLocal.getTimezoneOffset() * 60 * 1000);
    }

    if (props.versionDate) {
        const date = new Date(props.versionDate);
        if (!isNaN(date)) {
            parsedDate = convertUTCDateToLocalDate(date).toISOString().split('T')[0];
        }
    }

    console.log("version " + props.id);

    const content = (
        <div className="info-box">
            <span><h1>Installable Version ID: </h1> <p>{props.id}</p></span>
                <span>
                    <h1>BlobSas:</h1>
                    <a href={props.blobSas} target="_blank" rel="noopener noreferrer" download>
                    <Button>
                        Download File
                    </Button>
                </a>
                </span>
                <span><h1>Version Identifier:</h1> <p>{props.versionIdentifier}</p></span>
                <span><h1>File Length:</h1> <p>{props.fileLength + "sd"}</p></span>
                <span><h1>md5Hash:</h1> <p>{props.md5Hash}</p></span>
                <span><h1>Version Date:</h1> <p>{parsedDate}</p></span>
                <span><h1>Full Version:</h1> <p>{props.fullV ? 'Yes' : 'No'}</p></span>
            </div>
    );

    return (
        <div>
            {content}
        </div>
    );
}


export default InstallableVersionData;