import React, { Component } from 'react';
import './Registration.css'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem';



const currencies = [
    {
        value: 'Arnold O. Beckman High School',
        label: "Beckman High School"
    },
    {
        value: 'Fake High School',
        label: "Fake High School"
    }
]

//this is so that it can validate your email
const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

class SimpleCard extends Component {
    //const SimpleCard = () => {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            user: "",
            password: "",
            confirmpassword: "",
            school: "",
            errors: {
                email: '',
                user: '',
                password: '',
                confirmpassword: '',
                school: 'Select a school!'
            }
        };
    }

    validateForm = e => {
        let valid = true;
        Object.values(e).forEach(
            (val) => val.length > 0 && (valid = false)
        );
        return valid;
    }

    handleSubmit = e => {
        e.preventDefault();
        const obj = {
            email: this.state.email,
            user: this.state.user,
            password: this.state.password,
            confirmpassword: this.state.confirmpassword,
            school: this.state.school
        }
        console.log(obj)

        if (this.validateForm(this.state.errors)) {
            //do all the registration stuff

            /*
                  axios.post('http://localhost:6000/register', obj)
                    .then(res => console.log(res))
                    .catch(err => console.log(err));
                  //console.log(this.state.status);
            */
            if (this.state.status) {
                alert("login successful")
            } else {
                alert("an instance of your school or email already exist in the system. Please try registering again with different credentials")
            }
        } else {
            // handle what to do if registration is not valid
            alert("Please fill out the proper registration information before submitting this information");
        }
    }


    handleChange = e => {
        const { name, value } = e.target;
        let errors = this.state.errors;

        switch (name) {
            case 'email':
                errors.email = validEmailRegex.test(value)
                    ? ''
                    : 'Email is invalid!'
                break;

            case 'user':
                errors.user =
                    value.length < 5
                        ? 'Your username must be greater than 5 characters long!'
                        : ''
                break;

            case 'password':
                errors.password =
                    value.length < 6
                        ? 'Your password must be greater than 6 characters long!'
                        : ''
                errors.confirmpassword =
                    value != this.state.confirmpassword
                        ? 'The password you entered do not match!'
                        : ''
                break;

            case 'confirmpassword':
                errors.confirmpassword =
                    value != this.state.password
                        ? 'The password you entered do not match!'
                        : ''
                break;

            case 'school':
                errors.school =
                    value.length > 0
                        ? ''
                        : 'Select a school!'
                break;
        }

        this.setState({
            errors, [name]: value
        })

        console.log(this.state.errors);
    }

    render() {
        const school = this.state.school;
        const { errors } = this.state;
        return (
            <div className="background">
                <Card className="card">
                    <CardContent>
                        <Typography className="2" color="textSecondary" gutterBottom>
                            Register Your Account
                        </Typography>
                        <form className="text-field" onSubmit={this.handleSubmit}>
                            <TextField
                                id="standard-select-currency"
                                select
                                label="School"
                                value={school}
                                name="school"
                                onChange={this.handleChange}
                                fullWidth={true}
                                helperText="Select a school"
                                noValidate
                            >
                                {currencies.map(option => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField id="standard-basic" label="Email" name="email" fullWidth={true} onChange={this.handleChange} />
                            {errors.email.length > 0 && <span className="error"> {errors.email} </span>}
                            <TextField id="standard-basic" label="Username" name="user" fullWidth={true} onChange={this.handleChange} />
                            {errors.user.length > 0 && <span className="error"> {errors.user} </span>}
                            <TextField id="standard-basic" label="Password" name="password" type="password" fullWidth={true} onChange={this.handleChange} />
                            {errors.password.length > 0 && <span className="error"> {errors.password} </span>}
                            <TextField id="standard-basic" label="Confirm Password" name="confirmpassword" type="password" fullWidth={true} onChange={this.handleChange} noValidate />
                            {errors.confirmpassword.length > 0 && <span className="error" > {errors.confirmpassword} </span>}
                            <CardActions>
                                <Button size="small" variant="contained" color="primary" type="submit" style={{postion:'relative', right: '8px', top:'10px'}}> Register </Button>
                                <Button size="small" variant="contained" color="primary" style={{postion:'relative', top:'10px'}} href='/'> Already have an account? </Button>
                            </CardActions>
                        </form>
                    </CardContent>
                </Card>
            </div>
        );
    }
}



export default SimpleCard;