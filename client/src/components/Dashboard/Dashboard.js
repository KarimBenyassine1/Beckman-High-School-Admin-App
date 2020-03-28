import React, { Component, useState } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IntroductionCard from './IntroductionCard.js';
import './Dashboard.css'
import Menu from "../Menu"
import Sidebar from "../SideBar/SideBar";
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
import RefreshIcon from '@material-ui/icons/Refresh';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';

class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pendingAccounts: [],
            rowColor: [],
            filter: '',
        }
    }


    componentDidMount() {
        console.log("component mounted in the Dashboard");
        var pendingAccount;
        axios.get('http://localhost:5000/pending-account-information')
            .then(res => {
                console.log(res);
                pendingAccount = res.data;
                this.setState({ pendingAccounts: pendingAccount });
            })
            .catch(err => console.log(err));
        console.log("data received from componentDidMount: " + this.state.pendingAccounts);
    
        let rowColor = this.state.rowColor;
        for(var i = 0; i < this.state.pendingAccounts.length; i++){
            rowColor.push('white')
        }
    
    }

    handleChange = (e) => {
        this.setState({ filter: e.target.value });
        console.log(this.state.filter);
    }


    handleVerify = (student) => {
        const obj = this.state.pendingAccounts[this.state.pendingAccounts.indexOf(student)];
        console.log(obj);

        axios.post('http://localhost:5000/verify-pending-account', obj)
            .then(res => console.log(res))
            .catch(err => console.log(err));

        axios.post('http://localhost:5000/delete-pending-account-information', student)
            .then(res => console.log(res))
            .catch(err => console.log(err));

    }

    handleDecline = (student) => {
        axios.post('http://localhost:5000/delete-pending-account-information', student)
            .then(res => console.log(res))
            .catch(err => console.log(err));
        //this.declineStudent(student)
    }

    declineStudent = (student) => {
        const { name, shortId, longId, grade } = student
        let pendingAccounts = this.state.pendingAccounts
        pendingAccounts[this.state.pendingAccounts.indexOf(student)].name = "STUDENT DECLINED"
        this.setState({ pendingAccounts: pendingAccounts })
    }

    handleRefresh = () => {
        //No extra code is needed because refreshing the screen calls the componentDidMount() function
        window.location.reload(false);
    }

    render() {
        let accounts = this.state.pendingAccounts.filter(
            (account) => {
                return account.name.toLowerCase().indexOf(this.state.filter.toLowerCase()) !== -1 ||
                    account.shortId.indexOf(this.state.filter) !== -1;
            }
        );


        return (
            <MuiThemeProvider>
                <div className="dash-background">
                    <Menu />
                    <Sidebar />
                    <IntroductionCard />
                    <div className="right-adjust">
                        <Card className="pending-card">
                            <CardTitle title={this.state.pendingAccounts.length} subtitle="Pending Accounts" />
                            <TextField id="standard-basic" className="filter" value={this.state.filter} label="Filter by Name or Short ID" name="filter" onChange={this.handleChange} />
                            <IconButton onClick={() => window.location.reload(false)} className="refresh" > <RefreshIcon color="primary" /> </IconButton>
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
                                            <TableRow className="rows" style={{backgroundColor: 'white' }}>
                                                <TableCell> {student.name} </TableCell>
                                                <TableCell align="right" > {student.shortId} </TableCell>
                                                <TableCell align="right" > {student.longId} </TableCell>
                                                <TableCell align="right" > {student.grade} </TableCell>
                                                <TableCell align="right" > <IconButton onClick={() => this.handleVerify(student)}> <VerifiedUserIcon /> </IconButton> <IconButton onClick={() => this.handleDecline(student)}> <CloseIcon /> </IconButton> </TableCell>
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

export default Dashboard;
