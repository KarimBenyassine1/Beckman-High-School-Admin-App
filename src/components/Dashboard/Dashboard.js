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
import { Card, CardTitle } from 'material-ui/Card';
import TextField from '@material-ui/core/TextField'
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CloseIcon from '@material-ui/icons/Close';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import Button from '@material-ui/core/Button';
import RefreshIcon from '@material-ui/icons/Refresh';
import IconButton from '@material-ui/core/IconButton';

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
            numPending: 2,
            filter: '',
        }
    }

    handleChange = (e) => {
        this.setState({
            filter: e.target.value
        })
        console.log(this.state.filter);

        e.preventDefault();
    }


    handleVerify = (student) => {
        let pendingAccounts = this.state.pendingAccounts;
        pendingAccounts.splice(this.state.pendingAccounts.indexOf(student), 1);
        this.setState({
            pendingAccounts: pendingAccounts
        })

        //ADD CODE TO SEND TO API
    }

    handleDecline = (student) => {
        let pendingAccounts = this.state.pendingAccounts;
        pendingAccounts.splice(this.state.pendingAccounts.indexOf(student), 1);
        this.setState({
            pendingAccounts: pendingAccounts
        })

        //ADD CODE TO SEND TO API
    }

    handleRefresh = () => {
        window.location.reload(false);

        //ADD CODE TO SEND TO API
    }

    render() {
        let accounts = this.state.pendingAccounts.filter(
            (account) => {
                return !account.name.toLowerCase().indexOf(this.state.filter.toLowerCase()) ||
                    account.shortId.indexOf(this.state.filter) !== -1;
            }
        );
        let numPending = this.state.numPending;

        return (
            <MuiThemeProvider>
                <div className="dash-background">
                    <Menu />
                    <Sidebar />
                    <IntroductionCard />
                    <div className="right-adjust">
                        <Card className="pending-card">
                            <CardTitle title={numPending} subtitle="Pending Accounts" />
                            <TextField id="standard-basic" className="filter " label="Filter by Name or Short ID" name="filter" onChange={this.handleChange} />
                            <IconButton onClick={this.handleRefresh}  className="refresh" > <RefreshIcon color="primary" /> </IconButton>
                            <TableContainer style={{ paddingTop: '30px' }}>
                                <Table >
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>NAME</TableCell>
                                            <TableCell align="right">SHORT ID</TableCell>
                                            <TableCell align="right">LONG ID</TableCell>
                                            <TableCell align="right">GRADE</TableCell>
                                            <TableCell align="right">ACCEPT/DECLINE</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {accounts.map(student =>
                                            <TableRow className="rows">
                                                <TableCell> {student.name} </TableCell>
                                                <TableCell align="right" > {student.shortId} </TableCell>
                                                <TableCell align="right" > {student.longId} </TableCell>
                                                <TableCell align="right" > {student.grade} </TableCell>
                                                <TableCell align="right" > <IconButton  onClick={() => this.handleVerify(student)}> <VerifiedUserIcon /> </IconButton> <IconButton onClick={() => this.handleDecline(student)}> <CloseIcon /> </IconButton> </TableCell>
                                            </TableRow>,
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Card>
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

//<PendingReviews nb={nbPendingReviews} reviews={pendingReviews} customers={pendingReviewsCustomers} />

export default Dashboard;
