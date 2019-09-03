import React, { Component } from 'react';
import AllProjects from './AllProjects';
import Button from './Button';
import { Redirect, withRouter } from 'react-router-dom';
import API_URL from '../fetchRequests/apiUrl';
import { logout } from '../fetchRequests/requests'

class ProjectsContainer extends Component {
  constructor(){
    super()

    this.state = {
      projects: [],
      loggedOut: false
    }
  }

  componentDidMount = () => {
    fetch(`${API_URL}/api/v1/projects`, {
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${localStorage.auth_token}`
      }
    })
    .then(response => response.json())
    .then(projects => {
      this.setState({
        projects: projects
      })
    })
    .catch(error => console.log(error))
  }

  handleLogout = event => {
    event.preventDefault();
    logout()
    this.setState({
      loggedOut: true
    })
  }

  render() {
    if (this.state.loggedOut) {
      return <Redirect to="/login" />
    }
    const projects = this.state.projects
    console.log(projects)

    return(
      <div className="border border-secondary p-4 rounded-lg">
        <h2 className="text-center p-3">Projects</h2>

        <AllProjects projects={projects} />

        <div className="flex-row text-center pt-4">
          <button
            className="text-center m-2 btn btn-primary"
            onClick={this.handleLogout}>Log Out
          </button>
          <Button
            path={'/project/new'}
            buttonText={'New'}
            onClick={this.handleLogout}
          />
        </div>
      </div>
    )
  }
}

export default withRouter(ProjectsContainer);
