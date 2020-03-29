import React from 'react';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Fade from '@material-ui/core/Fade';
import CloseIcon from '@material-ui/icons/Close';


export default function Alerts() {
    const [checked, setChecked] = React.useState(true);

    return (
        <div>
            <Fade in={checked}>
                <Alert
                action={
                    <IconButton
                    aria-label="close"
                    color="error"
                    size="small"
                    onClick={() => {
                        setChecked(false);
                    }}
                    >
                    <CloseIcon fontSize="error" />
                    </IconButton>
                }
                severity="error"
                >
                Invalid username or password!!
                </Alert>
            </Fade>
        </div>    
    )
}