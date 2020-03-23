import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import grey from '@material-ui/core/colors/grey';

export default class Menu extends React.Component{
    render(){
        return(
            <div>
                <AppBar position="static" color='secondary'>
                    <Toolbar>
                    <IconButton edge="start" style={{color:grey[50]}} aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" style={{color:grey[50], fontSize:"25px"}} >
                        Beckman Admin
                    </Typography>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }


}