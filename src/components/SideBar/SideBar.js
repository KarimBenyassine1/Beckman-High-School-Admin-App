import React from 'react';
import { MenuItem, Menu } from 'material-ui';
import { MuiThemeProvider } from 'material-ui/styles';
import './SideBar.css';

//import { VisitorIcon } from './visitors';
//import { ReviewIcon } from './reviews';




export default class SideBar extends React.Component {
    render() {
        return (
            <MuiThemeProvider>
                <div className="main">
                    <Menu
                        id="simple-menu"
                        open="true"
                        className="main"
                    >
                        <MenuItem href='/dashboard'> Pending Students </MenuItem>
                        <MenuItem href='/verified-students'> Verified Students </MenuItem>
                        <MenuItem href='/'> Logout </MenuItem>
                    </Menu>
                </div>
            </MuiThemeProvider>
        )
    }
}