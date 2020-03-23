import React, { Component } from 'react';
//import { AppBarMobile, GET_LIST, GET_MANY } from 'admin-on-rest';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IntroductionCard from './IntroductionCard.js';
//import PendingReviews from './PendingReviews';
//import restClient from '../restClient';
import './Dashboard.css'
import Menu from "../Menu"
import Sidebar from "../SideBar/SideBar";


class Dashboard extends Component {
    state = {};

    render() {
        const { } = this.state;
        return (
            <MuiThemeProvider>
                <div> 
                    <Menu />
                    <Sidebar />
                        <IntroductionCard />
                    <div className="welcome-card">
                        pending review thing
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

//<PendingReviews nb={nbPendingReviews} reviews={pendingReviews} customers={pendingReviewsCustomers} />

export default Dashboard;
