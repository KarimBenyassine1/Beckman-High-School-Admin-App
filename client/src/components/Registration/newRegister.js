import React from 'react';
import './Registration.css';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Collapse from '@material-ui/core/Collapse';


const schools = [
    {
        value: 'Arnold O. Beckman High School',
        label: "Beckman High School"
    },
    {
        value: 'Fake High School',
        label: "Fake High School"
    }
]


class Register extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        email: "",
        user: "",
        password: "",
        confirmpassword: "",
        school: "",
        errors:false,
        status: null,
        open: false
    };
      
  
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.closingAlert=this.closingAlert.bind(this);
    }
    

    closingAlert = (event)=>{
      this.setState(
        {
          open: false,
          status: null
        }
      )
    }

    componentDidMount() {
      ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
          if (value !== this.state.password) {
              return false;
          }
          return true;
      });
      ValidatorForm.addValidationRule('isPassword', (value) => {
        if (value.length<=6) {
            return false;
        }
        return true;
    });

    ValidatorForm.addValidationRule('UsernameLength', (value) => {
        if (value.length<=5) {
            return false;
        }
        return true;
      });
  }


    componentWillUnmount() {
      ValidatorForm.removeValidationRule('isPasswordMatch');
      ValidatorForm.removeValidationRule('isPassword');
      ValidatorForm.removeValidationRule('UsernameLength');
    }

    validatorSubmit=()=>{
        if(this.state.email!== ''&&this.state.password!==''&&this.state.confirmpassword!==''&&this.state.user!==''&&this.state.school!==''){
            return false;
          }else{
            return true;
          }
    }


    handleChange = (event) => {
      this.setState({[event.target.name]: event.target.value});
    }
  
    handleSubmit = (e) => {
      e.preventDefault();
      const obj = {
        email: this.state.email,
        user: this.state.user,
        password: this.state.password,
        confirmpassword: this.state.confirmpassword,
        school: this.state.school
      }
      console.log(obj)

        var status;
        axios.post('http://localhost:5000/register', obj)
          .then(res => {
            console.log(res);
            status = res.data;
            this.setState({ 
              status: status,
              open: true
             });
            console.log(this.state.status);
          })
          .catch(err => console.log(err));
      
    }
  
    renderReg(){
      return(
        <div>
          {this.state.status
          ? <Collapse in={this.state.open}>
          <Alert 
          severity="success"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={this.closingAlert}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          >
          Registration Successful
        </Alert>
        </Collapse>

        :<Collapse in={this.state.open}>
        <Alert 
        severity="error"
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={this.closingAlert}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        >
        An instance of your school or email already exist in the system. Please try registering again with different credentials
      </Alert>
      </Collapse>
          }
          <div className="background">
            <Box
            boxShadow={3}
            >
              <Card className="card">
              <CardContent>
                  <Typography style={{position:'relative', top:'10px', left:"5px"}} className="2" color="textSecondary" gutterBottom>
                      Register your Account
                  </Typography>
                  <ValidatorForm
                      style={{position:"relative", top:"20px"}}
                      ref="form"
                      onSubmit={this.handleSubmit}
                      onError={errors => console.log(errors)}>
                      <TextField
                                  id="standard-select-currency"
                                  select
                                  label="School"
                                  value={this.state.school}
                                  name="school"
                                  onChange={this.handleChange}
                                  helperText="Select a school"
                                  style={{position: 'relative', left: '5px', bottom: '10px', width: '320px'}}
                              >
                                  {schools.map(option => (
                                      <MenuItem key={option.value} value={option.value}>
                                          {option.label}
                                      </MenuItem>
                                  ))}
                      </TextField>
                      <TextValidator
                      fullWidth={true}
                      label="Email"
                      onChange={this.handleChange}
                      name="email"
                      validators={['isEmail']} errorMessages={['email is not valid']}
                      value={this.state.email}
                      style={{position: 'relative', left: '5px', bottom: '10px', width: '320px', height: '20px'}}
                      />
                      <TextValidator
                      label="Username"
                      onChange={this.handleChange}
                      name="user"
                      validators={['UsernameLength']}
                      errorMessages={['Username must be longer than 5 characters']}
                      value={this.state.user}
                      style={{position: 'relative', left: "5px", top: '35px', width: '320px', height: '20px'}} />
                      <TextValidator
                      type="password" 
                      label="Password"
                      onChange={this.handleChange}
                      name="password"
                      validators={['isPassword']}
                      errorMessages={['Password must be longer than 6 characters']}
                      value={this.state.password}
                      style={{position: 'relative', left: "5px", top: '80px', width: '320px', height: '20px'}} />
                      <TextValidator
                      fullWidth={true}
                      type="password" 
                      label="Repeat Password"
                      onChange={this.handleChange}
                      name="confirmpassword"
                      value={this.state.confirmpassword}
                      validators={['isPasswordMatch']}
                      errorMessages={['password mismatch']}
                      style={{position: 'relative', left: "5px", top: '130px', width: '320px', height: '20px'}} />
                  </ValidatorForm>
                  </CardContent>
                  <Button type="submit" variant="contained" color="primary" disabled={this.validatorSubmit()} onClick={this.handleSubmit} style={{position: 'relative', left: '135px', top: '185px'}}>
                  Submit
                </Button>
                <p style={{fontSize:"16px", position:'relative', top: '190px', left: '50px', color: 'gray'}}>Already have an Account?<span><a href ="/" style={{color:'blue', textDecoration: 'none'}}> Sign In</a></span></p>
              </Card>
            </Box>
          </div>
        </div>
      )
    }
  
    render(){
      return(
        <div>
          {this.renderReg()}
        </div> 
      )
    }
  }
  
  export default Register;
  