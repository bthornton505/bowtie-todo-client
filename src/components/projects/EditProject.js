import React, { Component } from 'react';
import Button from '../Button';
import { Redirect } from 'react-router-dom';
import { networkRequest } from '../../fetchRequests/requests';

class EditProject extends Component {
  constructor(props){
    super(props)

    this.state = {
      project: this.props.location.state.project,
      title: this.props.location.state.project.title,
      updated: false
    }
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleUpdate = event => {
    event.preventDefault();
    // Use these variables to construct the updated project
    const projectId = this.state.project.id
    const project = {title: this.state.title, userId: this.state.project.userId}
    // Create new fetch request to send updated project to server
    networkRequest(`projects/${projectId}`, 'PATCH', project)
    this.setState({
      updated: true
    })
  }

  render(){
    const { project, updated } = this.state
    // If the project has been updated, redirect to the updated project
    if (updated === true){
      return <Redirect to={`/project/${project.id}`} />
    }

    return(
      <div className="border border-secondary p-4 rounded-lg">
        <h2 className="text-center p-3">Edit Project</h2>
        <hr></hr>
        <form onSubmit={this.handleUpdate}>
          <div className="form-group">
            <label htmlFor="formGroupExampleInput">Project Title</label>
            <input
              name="title"
              type="text"
              className="form-control"
              placeholder={project.title}
              value={this.state.title}
              onChange={this.handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary">Update</button>
          <Button path={`/project/${project.id}`} buttonText={'Back'}/>
        </form>
      </div>
    )
  }
}

export default EditProject;
