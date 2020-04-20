import React from 'react';
import './Reset.css';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import axios from 'axios';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Collapse from '@material-ui/core/Collapse';


class Reset extends React.Component {
    constructor(props){
      super(props)
  
      this.state = {
        username: '',
        password: '',
        repeatPassword: '',
        clickedSubmit:false,
        open: false,
        status: null
      }
      
  
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.closingAlert=this.closingAlert.bind(this);
    }
    

    componentDidMount() {
      ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
          if (value !== this.state.password) {
              return false;
          }
          return true;
      });
      ValidatorForm.addValidationRule('isPassword', (value) => {
        if (value.length<=5) {
            return false;
        }
        return true;
    });
    }

    componentWillUnmount() {
      ValidatorForm.removeValidationRule('isPasswordMatch');
      ValidatorForm.removeValidationRule('isPassword');
    }

    validatorSubmit=()=>{
      if(this.state.username!== ''&&this.state.password!==''&&this.state.repeatPassword!==''&&this.state.password===this.state.repeatPassword){
        return false;
      }else{
        return true;
      }


    }

    closingAlert = (event)=>{
      this.setState(
        {
          open: false,
          status: null
        }
      )
    }
  

    handleChange = (event) => {
      this.setState({[event.target.name]: event.target.value});
    }
  
    handleSubmit = (event) => {
      const { username, password}=this.state;
      this.setState({clickedSubmit: true});
  
  
      const obj = {
        userEmail: username,
        loginPassword: password,
      };  

      var status;
      axios.post('http://localhost:5000/reset-password', obj)
        .then(res => {
          console.log(res);
          status = res.data;
          this.setState({ 
            status: status,
            open: true});
          console.log(this.state.status);
        })
        .catch(err => console.log(err));

  
      event.preventDefault();
    }
  
    renderReset(){
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
          Changed Password Successfully
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
        Username not found
      </Alert>
      </Collapse>
          }
          <div className="background">
            <Box
            boxShadow={3}
            >
              <Card className="card2">
              <Typography style={{position:'relative', top:'10px', left:"5px"}} className="2" color="textSecondary" gutterBottom>
                    Reset Your Password
                </Typography>
                <ValidatorForm
                    style={{position:"relative", top:"140px"}}
                    ref="form"
                    onSubmit={this.handleSubmit}
                >
                  <TextValidator
                    label="Email"
                    onChange={this.handleChange}
                    name="username"
                    value={this.state.username}
                    style={{position: 'relative', left: '5px', bottom: '50px', width: '320px'}}
                  />
                  <TextValidator
                    type="password" 
                    label="New Password"
                    onChange={this.handleChange}
                    name="password"
                    value={this.state.password}
                    validators={['isPassword']}
                    errorMessages={['password must be greater than 5 characters']}
                    style={{position: 'relative', left: "5px", top: '55px', width: '320px', height: '20px'}} />
                  <TextValidator
                    type="password" 
                    label="Repeat Password"
                    onChange={this.handleChange}
                    name="repeatPassword"
                    value={this.state.repeatPassword}
                    validators={['isPasswordMatch']}
                    errorMessages={['password mismatch']}
                    style={{position: 'relative', left: "5px", top: '100px', width: '320px', height: '20px'}} />
                  <CardContent style={{position: 'relative', right: "63px", bottom: '30px'}}>
                    <Button type="submit" variant="contained" disabled={this.validatorSubmit()} color="primary" className="reset">
                      Reset Password
                    </Button>
                  </CardContent>
                </ValidatorForm>
              </Card>
            </Box>
          </div>
        </div>
      )
    }
  
    render(){
      return(
        <div>
          {this.renderReset()}
        </div> 
      )
    }
  }
  
  export default Reset;
  