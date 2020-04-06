import React, { useState } from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CloseIcon from '@material-ui/icons/Close';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import Button from '@material-ui/core/Button';
import './Dashboard.css'


function handleVerify(_this) {
    console.log("verify");

}

function handleDecline() {
    console.log("decline");
}

function handleChange(e) {

}

export default ({ accounts = [], numPending }) => (
    <div>
        <CardTitle title={numPending} subtitle="Pending Accounts" />
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
                            <TableCell align="right" > <Button style={{ width: '20px' }} onClick={handleVerify(this)}> <VerifiedUserIcon /> </Button> <Button onClick={handleDecline}> <CloseIcon /> </Button></TableCell>
                        </TableRow>,
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    </div>
);

//pending section should show a student's name, 