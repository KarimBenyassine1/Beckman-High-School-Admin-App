import React from 'react';
import './Reset.css';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

class Reset extends React.Component {
    constructor(props){
      super(props)
  
      this.state = {
        user: {
            email: '',
            ResetPassword: '',
            confirmedPassword: '',
        },
        clickedSubmit:false,
      }
      
  
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
    }
  
  
    handleChange = (event) => {
        const { user } = this.state;
        user[event.target.name] = event.target.value;
        this.setState({ user });
    }
  
    handleSubmit = (event) => {
      const { email, ResetPassword, confirmedPassword}=this.state;
      this.setState({clickedSubmit: true});
  
  
      const obj = {
        userEmail: email,
        password: ResetPassword,
        newPassword: confirmedPassword
      };  
  
  
      event.preventDefault();
    }
  
    renderReset(){
        const {user}=this.state;
      return(
        <div className="background">
          <Box
          boxShadow={3}
          >
            <Card className="card2">
                <a  href="/" style={{color:'black'}}> <ArrowBackIcon style={{position:"relative", bottom:"130px", left:"2px"}}/></a>
              <img src="https://upload.wikimedia.org/wikipedia/commons/0/03/Bpatriots_1.jpg" alt="BHS Logo" style={{paddingLeft:'57px'}} height="175" width="175"/>
              <ValidatorForm
                  ref="form"
                  onSubmit={this.handleSubmit}
                  onError={errors => console.log(errors)}
              >
                <TextValidator
                  label="Email"
                  name="username"
                  value={user.email}
                  validators={['required']}
                  errorMessages={['this field is required']} 
                  style={{position: 'relative', left: '5px', bottom: '15px', width: '320px', height: '20px'}}
                  />
                <TextValidator
                  type="password" 
                  label="Password"
                  name="password"
                  value={user.ResetPassword}
                  validators={['required']}
                  errorMessages={['this field is required']} 
                  style={{position: 'relative', left: "5px", top: '35px', width: '320px', height: '20px'}} />
                <TextValidator
                  type="password" 
                  label="Repeat Password"
                  name="repeatPassword"
                  value={user.confirmedPassword}
                  validators={['required']}
                  errorMessages={['this field is required']} 
                  style={{position: 'relative', left: "5px", top: '90px', width: '320px', height: '20px'}} />
                <Button type="submit" variant="contained" color="primary" className="reset">
                  Submit
                </Button>
              </ValidatorForm>
            </Card>
          </Box>
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
  