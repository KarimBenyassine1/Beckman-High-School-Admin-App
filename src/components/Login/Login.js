import React from 'react';
import './login.css';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
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
      errors:false,
      users: [
        { 
          id:1,
          loginUser: "Karim",
          loginPass: "1234"
        }
      ]
    }
    
    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    ValidatorForm.addValidationRule('isUsernameValid', () => {
        if (this.state.users.some(user=>user.loginUser!==this.state.username)) {
            return false;
        }
        return true;
    });
  }

  componentWillUnmount() {
    ValidatorForm.removeValidationRule('isUsernameValid');
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit = (event) => {
    const {username, password}=this.state;
    this.setState({clickedSubmit: true});

    const obj = {
      loginName: username,
      loginPassword: password
    };  

    if(this.state.password==='1'){
      this.setState({errors: true});
    }else{
    this.setState({errors: false});
    }
    console.log(this.state.errors)

    if(!this.state.errors){
      //axios.post()
      window.location.href="/dashboard"
    }else{
      alert("Incorrect Username or Password!")
    }

    event.preventDefault();
  }

 



  emptyOrNot=()=>{
    if(this.state.username!== ''&&this.state.password!==''){
      return false;
    }else{
      return true;
    }
  }

  
  renderLogin(){
    return(
      <div className="background">
        <Box
        boxShadow={3}
        >
          <Card style={{width: "350px", height: "410px"}}>
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
                validators={['isUsernameValid']}
                errorMessages={['Username does not exist']}
                style={{position: 'relative', left: '5px', bottom: '15px', width: '320px', height: '20px'}}
                />
              <TextField
                type="password" 
                label="Password"
                onChange={this.handleChange}
                name="password"
                value={this.state.password}
                style={{position: 'relative', left: "5px", top: '35px', width: '320px', height: '20px'}} />
              <a href="/reset-password" className="forgot">Forgot Password?</a>
              <Button type="submit" variant="contained" color="primary" disabled={this.emptyOrNot()} className="button">
                Sign In
              </Button>
              <p style={{fontSize:"16px", position:'relative', top: '100px', left: '50px', color: 'gray'}}>Not Registered?<span><a href ="/register" style={{color:'blue', textDecoration: 'none'}}> Create an account</a></span></p>
            </ValidatorForm>
          </Card>
        </Box>
      </div>
    )
  }

  render(){    
    return(
      <div>
        {this.renderLogin()}
      </div> 
    )
  }
}

export default Login;
