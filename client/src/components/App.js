import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from '../components/Login/Login';
import Reset from '../components/Login/Reset';
import VerifiedStudents from "../components/VerifiedStudents/VerifiedStudents";
import Dashboard from "../components/Dashboard/Dashboard";
import Register from "../components/Registration/newRegister";


const App = () => (
  <BrowserRouter>
    <React.Fragment>
      <Switch>
        <Route path="/" component={Login} exact />
        <Route path="/reset-password" component={Reset} exact />
        <Route path="/register" component={Register} exact />
        <Route path="/dashboard" component={Dashboard} exact />
        <Route path="/verified-students" component={VerifiedStudents} exact />
      </Switch>
    </React.Fragment>
  </BrowserRouter>
)

export default App;