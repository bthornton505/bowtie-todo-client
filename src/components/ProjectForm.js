import React, { Component } from 'react';
import Button from './Button';
import { Redirect } from 'react-router-dom';
import API_URL from '../fetchRequests/apiUrl';

class ProjectForm extends Component {
  constructor(props){
    super(props)

    this.state = {
      title: "",
      isCreated: false
    }
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit = event => {
    event.preventDefault()
    const project = this.state

    fetch(`${API_URL}/api/v1/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.auth_token}`
      },
      body: JSON.stringify( project )
    })
    .then(response => response.json())
    .then(() => this.setState({
      title: "",
      isCreated: true
    }))
    .catch(error => console.log(error))
  }

  render(){
    const { isCreated } = this.state

    if (isCreated === true) {
      return <Redirect to="/projects" />
    }

    return(
      <div className="border border-secondary p-4 rounded-lg">
        <h2 className="text-center p-3">New Project</h2>
        <hr></hr>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="formGroupExampleInput">Project Title</label>
            <input
              name="title"
              type="text"
              className="form-control"
              id="formGroupExampleInput"
              placeholder="Add Title"
              value={this.state.title}
              onChange={this.handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
          <Button path={'/projects'} buttonText={'Back'}/>
        </form>

      </div>
    )
  }
}

export default ProjectForm;
