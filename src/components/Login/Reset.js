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
        username: '',
        password: '',
        repeatPassword: '',
        clickedSubmit:false,
      }
      
  
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
    }
    

    componentDidMount() {
      ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
          if (value !== this.state.password) {
              return false;
          }
          return true;
      });
    }

    componentWillUnmount() {
      ValidatorForm.removeValidationRule('isPasswordMatch');
    }

    validatorSubmit=()=>{
      if(this.state.username!== ''&&this.state.password!==''&&this.state.repeatPassword!==''&&this.state.password===this.state.repeatPassword){
        return false;
      }else{
        return true;
      }


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
  
  
      event.preventDefault();
    }
  
    renderReset(){
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
                  onChange={this.handleChange}
                  name="username"
                  value={this.state.username}
                  style={{position: 'relative', left: '5px', bottom: '15px', width: '320px', height: '20px'}}
                />
                <TextValidator
                  type="password" 
                  label="New Password"
                  onChange={this.handleChange}
                  name="password"
                  value={this.state.password}
                  style={{position: 'relative', left: "5px", top: '35px', width: '320px', height: '20px'}} />
                <TextValidator
                  type="password" 
                  label="Repeat Password"
                  onChange={this.handleChange}
                  name="repeatPassword"
                  value={this.state.repeatPassword}
                  validators={['isPasswordMatch']}
                  errorMessages={['password mismatch']}
                  style={{position: 'relative', left: "5px", top: '90px', width: '320px', height: '20px'}} />
                <Button type="submit" variant="contained" disabled={this.validatorSubmit()} color="primary" className="reset">
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
  