import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import LandingPage from './components/LandingPage';
import Register from './authentication/Register';
import Login from './authentication/Login';
import ProjectsContainer from './components/projects/ProjectsContainer';
import ProjectForm from './components/projects/ProjectForm';
import ProjectDetails from './components/projects/ProjectDetails';
import EditProject from './components/projects/EditProject';

const Routes = (props) => {

  return(
    <Router>
      <Switch>
        {/* Guest routes before logging in */}
        <Route exact path="/" component={() => props.loggedIn ? <Redirect to="/projects"/> : <LandingPage />} />
        <Route path="/signup" render={() => props.loggedIn ? <Redirect to="/projects"/> : <Register handleLoginChange={props.handleLoginChange}/>} />
        <Route path="/login" render={() => props.loggedIn ? <Redirect to="/projects"/> : <Login handleLoginChange={props.handleLoginChange} />} />

        {/* User routes after logging in */}
        <Route exact path="/projects" render={() => props.loggedIn ? <ProjectsContainer handleLoginChange={props.handleLoginChange}/> : <Redirect to="/login"/> } />
        <Route exact path="/project/new" component={() => props.loggedIn ? <ProjectForm /> : <Redirect to="/login"/>} />
        <Route exact path="/project/:id" component={() => props.loggedIn ? <ProjectDetails /> : <Redirect to="/login"/>}/>
        <Route exact path="/project/:id/edit" component={() => props.loggedIn ? <EditProject /> : <Redirect to="/login"/>} />
      </Switch>
    </Router>
  )
}

export default Routes;
