import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import LandingPage from './components/LandingPage';
import Register from './authentication/Register';
import Login from './authentication/Login';
import ProjectsContainer from './components/ProjectsContainer';
import ProjectForm from './components/ProjectForm';
import ProjectDetails from './components/ProjectDetails';

const Routes = (props) => {

  const guestViews = (
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route path="/signup" component={Register} />
      <Route path="/login" component={Login} />
    </Switch>
  )

  const userViews = (
    <Switch>
      <Route exact path="/projects" component={ProjectsContainer} />
      <Route path="/project/new" component={ProjectForm} />
      <Route path="/project/:name" component={ProjectDetails}/>
    </Switch>
  )

  return(
    <Router>
      {props.isAuthenticated ? userViews : guestViews}
    </Router>
  )
}

export default Routes;
