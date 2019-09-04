import React, { Component } from 'react';
import Button from './Button';
import { Redirect } from 'react-router-dom';
import API_URL from '../fetchRequests/apiUrl';
import AddTodo from './AddTodo';

class EditProject extends Component {
  constructor(props){
    super(props)

    this.state = {
      project: this.props.location.state.project,
      title: "",
      // todo: {
      //   title: "",
      //   completed: false
      // },
      // todos: [],
      updated: false
    }
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  // handleTodoChange = event => {
  //   const { name, value } = event.target;
  //   this.setState({
  //     [name]: {
  //       title: value,
  //       completed: false
  //     }
  //   });
  // }

  handleUpdate = event => {
    event.preventDefault();
    const projectId = this.state.project.id
    const project = {title: this.state.title, userId: this.state.project.userId}

    fetch(`${API_URL}/api/v1/projects/${projectId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": 'application/json',
        "Authorization": `Bearer ${localStorage.auth_token}`
      },
      body: JSON.stringify( project )
    })
    .then(response => response.json())
    .then(() => this.setState({
      updated: true
    }))
    .catch(error => console.log(error))

  }

  render(){
    const { project, updated } = this.state

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
