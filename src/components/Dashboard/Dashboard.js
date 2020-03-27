import React, { Component } from 'react';
//import { AppBarMobile, GET_LIST, GET_MANY } from 'admin-on-rest';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IntroductionCard from './IntroductionCard.js';
//import PendingReviews from './PendingReviews';
//import restClient from '../restClient';
import './Dashboard.css'
import Menu from "../Menu"
import Sidebar from "../SideBar/SideBar";
import PendingAcounts from './PendingAccounts';


class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pendingAccounts: [
                {
                    name: "Saim Ahmad",
                    shortId: "12345",
                    longId: "12345678",
                    grade: "12",
                    id: '1'
                },
                {
                    name: "Not Saim",
                    shortId: "54321",
                    longId: "87654321",
                    grade: "9",
                    id: '2'
                }
            ],
            
        }
    }

    render() {
        return (
            <MuiThemeProvider>
                <div className="dash-background">
                    <Menu />
                    <Sidebar />
                    <IntroductionCard />
                    <div className="right-adjust">
                        <PendingAcounts numPending={this.state.pendingAccounts.length} accounts={this.state.pendingAccounts} />
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

//<PendingReviews nb={nbPendingReviews} reviews={pendingReviews} customers={pendingReviewsCustomers} />

export default Dashboard;
