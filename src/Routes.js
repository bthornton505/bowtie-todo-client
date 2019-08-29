import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Register from './authentication/Register';
import Login from './authentication/Login';
import ProjectsContainer from './components/ProjectsContainer';
import ProjectForm from './components/ProjectForm';
import ProjectDetails from './components/ProjectDetails';

const Routes = () => {

  const guestViews = (
    <Switch>
      <Route exact path="/signup" component={Register} />
      <Route exact path="/login" component={Login} />
    </Switch>
  )

  const userViews = (
    <Switch>
      <Route exact path="/signup" component={Register} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/" component={ProjectsContainer} />
      <Route exact path="/project/new" component={ProjectForm} />
      <Route exact path="/project/:name" component={ProjectDetails}/>
    </Switch>
  )

  return(
    <Router>
      {userViews}
    </Router>
  )
}

export default Routes;
