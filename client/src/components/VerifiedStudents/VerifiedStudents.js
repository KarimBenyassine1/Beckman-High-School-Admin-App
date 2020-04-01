import React from 'react';
import Menu from "../Menu"
import Sidebar from "../SideBar/SideBar";
import Card from '@material-ui/core/Card';
import "./VerifiedStudents.css"
import Button from '@material-ui/core/Button';
import RefreshIcon from '@material-ui/icons/Refresh';
import TextField from '@material-ui/core/TextField';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import EditIcon from '@material-ui/icons/Edit';
import TablePagination from '@material-ui/core/TablePagination';
import EditModal from './EditModal.js';
import axios from 'axios';



class VerifiedStudents extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            students: [],
            search: '',
            page: 0,
        }

        this.handleChangePage = this.handleChangePage.bind(this);

    }

    componentDidMount() {
        console.log("component mounted in the VerifiedStudents page");
        var verifiedAccounts;
        axios.get('http://localhost:5000/verified-account-information')
            .then(res => {
                console.log(res);
                verifiedAccounts = res.data;
                this.setState({ students: verifiedAccounts });
            })
            .catch(err => console.log(err));
        console.log("data received from componentDidMount: " + this.state.students);
    }

    updateSearch = (event) => {
        this.setState({
            search: event.target.value.substr(0,
                40)
        })
    }

    handleChangePage = (event, newPage) => {
        this.setState({ page: newPage })
    }

    // called when people click the edit button
    // this is the problem right now, nothing is rendering even though the method is being called
    showEditModal = (e, student) => {
        console.log(student.name);              // console log happens
        return (
            <EditModal student={student}/>      // this doesn't happen
        )
    }

    renderDash() {
        let filteredStudents = this.state.students.filter(
            (student) => {
                return student.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
                    student.shortId.indexOf(this.state.search) !== -1;
            }
        );


        return (
            <div className="backgroundDash">
                <Menu />
                <Sidebar />
                <Card className="verifycard">
                    <p className='p'>Verified Students <span> <Button onClick={() => window.location.reload(false)} color="primary" style={{ position: "relative", left: "637px" }}><RefreshIcon color="primary" />Refresh</Button> </span> </p>
                    <TextField id="standard-basic" label="Search Name or Short ID" value={this.state.search} onChange={this.updateSearch.bind(this)} className="text" />
                    <TableContainer style={{ paddingTop: '30px' }}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>NAME</TableCell>
                                    <TableCell align="right">SHORT ID</TableCell>
                                    <TableCell align="right">LONG ID</TableCell>
                                    <TableCell align="right">GRADE</TableCell>
                                    <TableCell align="right">EDIT</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredStudents.slice(this.state.page * 15, this.state.page * 15 + 15).map(student => (
                                    <TableRow>
                                        <TableCell>
                                            {student.name}
                                        </TableCell>
                                        <TableCell align="right">{student.shortId}</TableCell>
                                        <TableCell align="right">{student.longId}</TableCell>
                                        <TableCell align="right">{student.grade}</TableCell>
                                        <TableCell align="right">
                                            {/* Here is the edit button and the call to showEditModal */}
                                            <Button style={{ position: 'relative', left: '15px' }} onClick={(e) => this.showEditModal(e, student)}><EditIcon color="primary" /></Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        style={{ position: 'relative', right: "810px" }}
                        count={filteredStudents.length}
                        rowsPerPage={15}
                        page={this.state.page}
                        component="div"
                        onChangePage={this.handleChangePage} />
                </Card>
            </div>
        )
    }


    render() {
        return (
            <div>
                {this.renderDash()}
            </div>
        )
    }



}

export default VerifiedStudents;