import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import Button from '../Button';
import API_URL from '../../fetchRequests/apiUrl';
import TodoContainer from '../todos/TodoContainer';

class ProjectDetails extends Component {
  state = {
    project: [],
    projectDeleted: false
  }

  // Here we request the individual project
  componentDidMount = () => {
    const projectId = this.props.match.params.id

    fetch(`${API_URL}/api/v1/projects/${projectId}`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${localStorage.auth_token}`
      }
    })
    .then(response => response.json())
    .then(project => this.setState({
      project: project
    }))
    .catch(error => console.log(error))
  }

  // This function handles deleting the project
  deleteProject = (event) => {
    const { project } = this.state

    fetch(`${API_URL}/api/v1/projects/${project.id}`, {
      method: "DELETE",
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${localStorage.auth_token}`
      }
    })
    .then(response => response.json())
    .then(() => {
      this.setState({
        projectDeleted: true
      })
    })
    .catch(error => console.log(error))
  }

  // This function handles updating the projects todos without mutating state directly
  addOrRemoveTodo = (todos) => {
    this.setState({
      project: Object.assign({}, this.state.project, {
        ...this.state.project,
        todos
      })
    })
  }

  render(){
    const { project, projectDeleted } = this.state

    if (projectDeleted === true){
      return <Redirect to="/projects" />
    }

    return(
      <div className="border border-secondary p-4 rounded-lg">
        <h2 className="text-center p-3">{project.title}</h2>

        <TodoContainer addOrRemoveTodo={this.addOrRemoveTodo} project={project} />

        <div className="flex-row text-center pt-4">
          <Button path={'/projects'} buttonText={'Back'}/>
          <Button path={`/project/${project.id}/edit`}
            state={project}
            buttonText={'Rename'}
          />
          <button type="submit" className="m-2 btn btn-primary" onClick={this.deleteProject}>
            Delete
          </button>
        </div>
      </div>
    )
  }
}

export default withRouter(ProjectDetails);
