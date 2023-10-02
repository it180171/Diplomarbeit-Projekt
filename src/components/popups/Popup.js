import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { BsInfoCircle } from "react-icons/bs";
import '../style/popup.css';
import {useState} from "react";

const Popup = (props) => {
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Dialog
                fullScreen={false}
                open={props.open}
                onClose={handleClose}
                PaperProps={{ style: {
                        minHeight: '30%',
                        minWidth: '40%'
                    }}}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title" style={{ fontSize: '2rem', display: 'flex',
                justifyContent: 'center', alignItems: 'center' }}>
                    {"Info Box"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText
                        style={{ fontSize: '1.5rem',
                                 textAlign: 'center' }}>
                        {props.title}
                    </DialogContentText>
                </DialogContent>
                <DialogActions style={{ margin: '0 1vw 1.5vh 0'}}>
                    <Button style={{ fontSize: '1.2rem' }} autoFocus onClick={props.setFalse}>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Popup;