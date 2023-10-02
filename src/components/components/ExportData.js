import FileSaver from "file-saver";

import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export async function download(data = null) {
  if (data === null) {
      data = await fetchExportData();
      data = data.data;
  }

  const blob = new Blob([JSON.stringify(data)], { type: 'application/json;charset=utf-8' });
  FileSaver.saveAs(blob, "config.json");
}

const url = 'https://azwe-app-dev-dfdsin.azurewebsites.net/api/';
export async function fetchExportData() {
  let status = -1;
  try {
    let httpOptions = {
      method: 'GET',
      headers: {
        Authorization: localStorage.getItem('access_token')
      }
    };

    let packages = fetch(url + 'Admin/InstallablePackages', httpOptions);
    let descriptions = fetch(url + 'Admin/InstallablePackageDescriptions', httpOptions);
    let installables = fetch(url + 'Admin/InstallablePackages', httpOptions);
    let syncTemplates = fetch(url + 'Admin/InstallableSyncTemplates', httpOptions);
    let executablePaths = fetch(url + 'InstallableQuery/InstallableExecutablePaths', httpOptions);

    packages = await (await packages).json();
    descriptions = await (await descriptions).json();
    installables = await (await installables).json();
    syncTemplates = await (await syncTemplates).json();
    executablePaths = await (await executablePaths).json();

    return await Promise.resolve({
      status: 200,
      data: {
        packages,
        descriptions,
        installables,
        syncTemplates,
        executablePaths
      }
    });


  } catch (error) {
    return { status: 500 };
  }
}

export const AlertSnackbars = ({ type, text }) => {
  const [open, setOpen] = React.useState(true);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Stack style={{ position: "fixed" }} spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>{text}</Alert>
      </Snackbar>
    </Stack>
  );
}