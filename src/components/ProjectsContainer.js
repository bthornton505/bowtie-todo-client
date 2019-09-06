import React, { Component } from 'react';
import AllProjects from './AllProjects';
import Button from './Button';
import { Redirect, withRouter } from 'react-router-dom';
import API_URL from '../fetchRequests/apiUrl';
// import { logout } from '../fetchRequests/requests'
const getToken = () => localStorage.getItem('auth_token')

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
        "Authorization": `Bearer ${getToken()}`
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
    // logout()
    localStorage.clear()

    this.setState({
      loggedOut: true
    }, () => this.props.handleLoginChange())
  }

  render() {
    const { loggedOut } = this.state
    if (loggedOut === true) {
      return <Redirect to="/login" />
    }

    const projects = this.state.projects
    console.log(projects)

    return(
      <div className="border border-secondary p-4 rounded-lg">
        <h2 className="text-center p-3">Projects</h2>

        <AllProjects projects={projects} />
        {/* Need to create Project component which will fetch the desired project */}

        <div className="flex-row text-center pt-4">
          <button
            className="text-center m-2 btn btn-primary"
            onClick={this.handleLogout}>Log Out
          </button>
          <Button
            path={'/project/new'}
            buttonText={'New'}
          />
        </div>
      </div>
    )
  }
}

export default withRouter(ProjectsContainer);
