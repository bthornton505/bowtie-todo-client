import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Button from './Button';
import AddTodo from './AddTodo'
import API_URL from '../fetchRequests/apiUrl';
import AllTodos from './AllTodos';
import TodoContainer from './TodoContainer';

class ProjectDetails extends Component {
  state = {
    project: [],
    projectDeleted: false
  }

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

  deleteProject = (event) => {
    const { project } = this.state

    window.alert('Do you want to delete this project?')

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

export default ProjectDetails;
