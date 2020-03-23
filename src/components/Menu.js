import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import grey from '@material-ui/core/colors/grey';
import './Menu.css'

export default class Menu extends React.Component {
    render() {
        return (
            <div className="menu">
                <AppBar position="static" color='secondary' >
                    <Toolbar>
                        <Typography variant="h6" style={{ color: grey[50] }} >
                            Beckman Admin
                    </Typography>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }


}