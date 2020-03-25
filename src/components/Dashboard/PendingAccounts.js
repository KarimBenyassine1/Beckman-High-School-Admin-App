import React from 'react';
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

const styles = {
    titleLink: { textDecoration: 'none', color: '#000' },
    card: { borderLeft: 'solid 4px #f44336', flex: 1, marginRight: '1em' },
    icon: { float: 'right', width: 64, height: 64, padding: 16, color: '#f44336' },
};

const location = { pathname: 'reviews', query: { filter: JSON.stringify({ status: 'pending' }) } };

function handleVerify() {
    console.log("verify");
}

function handleDecline() {
    console.log("decline");
}

export default ({ accounts = [], numPending }) => (
    <Card className="pending-card">
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
                        <TableRow>
                            <TableCell> {student.name} </TableCell>
                            <TableCell align="right" > {student.shortId} </TableCell>
                            <TableCell align="right" > {student.longId} </TableCell>
                            <TableCell align="right" > {student.grade} </TableCell>
                            <TableCell align="right" > <Button style={{width: '20px'}} onClick={handleVerify}> <VerifiedUserIcon /> </Button> <Button onClick={handleDecline}> <CloseIcon /> </Button></TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    </Card>
);

//pending section should show a student's name, 