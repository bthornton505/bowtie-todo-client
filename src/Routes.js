import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import LandingPage from './components/LandingPage';
import Register from './authentication/Register';
import Login from './authentication/Login';
import ProjectsContainer from './components/projects/ProjectsContainer';
import ProjectForm from './components/projects/ProjectForm';
import ProjectDetails from './components/projects/ProjectDetails';
import EditProject from './components/projects/EditProject';

const Routes = (props) => {

  const guestViews = (
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route path="/signup" render={() => <Register handleLoginChange={props.handleLoginChange}/>} />
      <Route path="/login" render={() => <Login handleLoginChange={props.handleLoginChange} />} />
    </Switch>
  )

  const userViews = (
    <Switch>
      <Route exact path="/projects" render={() => <ProjectsContainer handleLoginChange={props.handleLoginChange}/>} />
      <Route exact path="/project/new" component={ProjectForm} />
      <Route exact path="/project/:id" component={ProjectDetails}/>
      <Route exact path="/project/:id/edit" component={EditProject} />
    </Switch>
  )

  return(
    <Router>
      {props.loggedIn ? userViews : guestViews}
    </Router>
  )
}

export default Routes;
