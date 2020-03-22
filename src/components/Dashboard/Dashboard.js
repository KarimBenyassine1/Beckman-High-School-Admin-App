import React from 'react';
import Menu from "../Menu"
import Card from '@material-ui/core/Card';
import "./Dashboard.css"
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
import Pagination from '@material-ui/lab/Pagination';


class Dashboard extends React.Component {
    constructor(props){
        super(props)
    
        this.state = {
            students: [
                {
                    name: "Karim Benyassine",
                    shortId: "12345",
                    longId: '240012452',
                    grade: "12"
                },
                {
                    name: "Alex Rea",
                    shortId: "67890",
                    longId: '945982334',
                    grade: "12"
                },
                {
                    name: "Saim Ahmad",
                    shortId: "94735",
                    longId: '697711443',
                    grade: "12"
                },
                {
                    name: "Jay Ni",
                    shortId: "67452",
                    longId: '167379456',
                    grade: "12"
                },
                {
                    name: "Alex Pham",
                    shortId: "72572",
                    longId: '834223562',
                    grade: "12"
                },
                {
                    name: "Shehzad Mansuri",
                    shortId: "08345",
                    longId: '447237934',
                    grade: "12"
                },
                {
                    name: "Vincent Le",
                    shortId: "07684",
                    longId: '346583958',
                    grade: "12"
                },
                {
                    name: "Jimmy Jimmyson",
                    shortId: "35876",
                    longId: '123748468',
                    grade: "12"
                },
                {
                    name: "Timmy Timmyson",
                    shortId: "98765",
                    longId: '3938357835',
                    grade: "12"
                },
                {
                    name: "Tommy Tommyson",
                    shortId: "45678",
                    longId: '757452383',
                    grade: "12"
                },
                {
                    name: "Bobby Bobbyson",
                    shortId: "74532",
                    longId: '876543345',
                    grade: "12"
                },
                {
                    name: "Jenny Jennyson",
                    shortId: "24234",
                    longId: '693855823',
                    grade: "12"
                },
                {
                    name: "Simp Simpson",
                    shortId: "24884",
                    longId: '125939449',
                    grade: "12"
                },
                {
                    name: "GRrr GRrson",
                    shortId: "86434",
                    longId: '264664264',
                    grade: "12"
                },
                {
                    name: "Tss Tsson",
                    shortId: "85866",
                    longId: '223435534',
                    grade: "12"
                },
            ],
            search:'',
            page: 1,
            setPage: 1
        }

        this.handleChange = this.handleChange.bind(this);
      }

    updateSearch=(event)=>{
        this.setState({search: event.target.value.substring(0, 
            40)})
    }
    
    handleChange = (event) => {
        this.setState({setPage: event.target.value})
      };

    renderDash(){
        let filteredStudents=this.state.students.filter(
            (student)=>{
                return student.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 || 
                student.shortId.indexOf(this.state.search) !==-1;
            }
        );

        return(
            <div className="backgroundDash">
                <Menu /> 
                    <Card className="verifycard">
                        <p className='p'>Verified Students <span> <Button onClick={() => window.location.reload(false)} color="primary" style={{position:"relative", left:"775px"}}><RefreshIcon color="primary" />Refresh</Button> </span> </p>
                        <TextField id="standard-basic" label="Search Name or Short ID" value={this.state.search} onChange={this.updateSearch.bind(this)} className="text"/>
                        <TableContainer style={{paddingTop:'30px'}}>
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
                                {filteredStudents.map(student => (
                                    <TableRow>
                                    <TableCell>
                                        {student.name}
                                    </TableCell>
                                    <TableCell align="right">{student.shortId}</TableCell>
                                    <TableCell align="right">{student.longId}</TableCell>
                                    <TableCell align="right">{student.grade}</TableCell>
                                    <TableCell align="right"><Button style={{position:'relative', left:'15px'}}><EditIcon color="primary"/></Button></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        </TableContainer>
                        <Pagination style={{position:'relative', left:'770px', top:"10px"}} count={10} />
                    </Card>
            </div>
        )
    }


    render(){
        return(
            <div>
                {this.renderDash()}
            </div>
        )
    }



}

export default Dashboard;