import React from 'react';
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import { MenuItem, Menu } from 'material-ui';
import { MuiThemeProvider } from 'material-ui/styles';
import './SideBar.css';

//import { VisitorIcon } from './visitors';
//import { ReviewIcon } from './reviews';

const items = [
    // { name: 'customers', icon: <VisitorIcon /> },
    //{ name: 'reviews', icon: <ReviewIcon /> },
];


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
                        <MenuItem> Reviews </MenuItem>
                        <MenuItem href='/'> Logout </MenuItem>
                    </Menu>
                </div>
            </MuiThemeProvider>
        )
    }
}