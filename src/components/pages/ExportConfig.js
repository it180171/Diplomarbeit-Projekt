
import * as React from 'react';
import { useQuery } from "react-query";
import ReactJson from 'react-json-view'
import { Button } from "@mui/material";
import '../style/export.css';
import { AlertSnackbars } from '../components/ExportData';
import { download, fetchExportData } from '../components/ExportData';
import { FaDownload } from "react-icons/fa";
import LoadingProgress from '../components/LoadingProgress';

const ExportConfig = () => {
  let { data, status } = useQuery('config', fetchExportData);

  if (status === 'loading') {
    return <div className='loadingBox'><LoadingProgress /></div>
  }
  if (status === 'error' || data.status != 200 || data === null) {
    return <AlertSnackbars type='error' text={data.status == 401 ? 'You have to log in for this functionallity.' : 'Something went wrong, please try it later.'} />
  }
  data = data.data;
  return (
    <div className="box exportBox">
      <ReactJson className="jsonView" src={data} enableClipboard={false} displayDataTypes={false} />
      <div className="btnBox">
        <Button onClick={() => { console.log(data); download(data) }} className="btn" variant="contained" endIcon={<FaDownload />}>Download</Button>
      </div>
    </div>
  )
}

export default ExportConfig;