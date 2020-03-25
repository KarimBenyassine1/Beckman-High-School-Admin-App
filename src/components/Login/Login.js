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
      errors:{
        username: '',
         password: '',
      },
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

  validateForm = e => {
    let valid = true;
    Object.values(e).forEach(
        (val) => val.length > 0 && (valid = false)
    );
    return valid;
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

    if (this.validateForm(this.state.errors)) {
      //do all the login stuff

      /*
            axios.post('http://localhost:6000/register', obj)
              .then(res => console.log(res))
              .catch(err => console.log(err));
            //console.log(this.state.status);
      */
      if (this.state.status) {
          alert("login successful")
      } else {
          alert("an instance of your username already exist in the system. Please try logging in again.")
      }
  }

    event.preventDefault();
  }

  
  



  emptyOrNot=()=>{
    if(this.state.username!== ''&&this.state.password!==''){
      if(this.state.users.some(user=>user.loginUser!==this.state.username)){
        return true;
      }
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
            <form
                ref="form"
                onSubmit={this.handleSubmit}
                onError={errors => console.log(errors)}
            >
              <TextField
                label="Username"
                onChange={this.handleChange}
                name="username"
                value={this.state.username}
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
              <Button type="submit" variant="contained" color="primary" disabled={this.emptyOrNot()} className="button" href="/dashboard">
                Sign In
              </Button>
              <p style={{fontSize:"16px", position:'relative', top: '100px', left: '50px', color: 'gray'}}>Not Registered?<span><a href ="/register" style={{color:'blue', textDecoration: 'none'}}> Create an account</a></span></p>
            </form>
          </Card>
        </Box>
      </div>
    )
  }

  render(){
    /*if(clickedSubmit){
      if(error){
      return(
        <div>
          <Alerts />
        </div>
      )
      }
    }*/
    
    return(
      <div>
        {this.renderLogin()}
      </div> 
    )
  }
}

export default Login;
