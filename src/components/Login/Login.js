import React from 'react';
import './login.css';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Alerts from "../Login/alert";



class Login extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      username: '',
      password: '',
      loginStatus:'IS_LOGGED',
      clickedSubmit:false,
      error: false,
      users: []
    }
    

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit = (event) => {
    const {username, password}=this.state;
    this.setState({clickedSubmit: true});

      if(username!=="Karim"&&password!=="1234"){
        this.setState({error: true});
      }else{
        alert("correct")
      }

    const obj = {
      loginName: username,
      loginPassword: password
    };  


    event.preventDefault();
  }

  renderLogin(){
    return(
      <div className="background">
        <Box
        boxShadow={3}
        >
          <Card className="card">
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/03/Bpatriots_1.jpg" alt="BHS Logo" style={{paddingLeft:'83px'}} height="175" width="175"/>
            <ValidatorForm
                ref="form"
                onSubmit={this.handleSubmit}
                onError={errors => console.log(errors)}
            >
              <TextValidator
                label="Username"
                onChange={this.handleChange}
                name="username"
                value={this.state.username}
                validators={['required']}
                errorMessages={['this field is required']} 
                style={{position: 'relative', left: '5px', bottom: '15px', width: '320px', height: '20px'}}
                />
              <TextValidator
                type="password" 
                label="Password"
                onChange={this.handleChange}
                name="password"
                value={this.state.password}
                validators={['required']}
                errorMessages={['this field is required']} 
                style={{position: 'relative', left: "5px", top: '35px', width: '320px', height: '20px'}} />
              <Button type="submit" variant="contained" color="primary" className="button" href="/dashboard">
                Sign In
              </Button>
              <a href="/reset-password" className="forgot">Forgot Password?</a>
            </ValidatorForm>
          </Card>
        </Box>
      </div>
    )
  }

  render(){
    const {error, clickedSubmit}=this.state;
  
    if(clickedSubmit){
      if(error){
      return(
        <div>
          <Alerts />
        </div>
      )
      }
    }

    return(
      <div>
        {this.renderLogin()}
      </div> 
    )
  }
}

export default Login;