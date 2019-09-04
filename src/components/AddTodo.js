import React, { Component } from 'react';
import API_URL from '../fetchRequests/apiUrl';
import { Redirect } from 'react-router-dom';

class AddTodo extends Component {
  constructor(props){
    super(props)

    this.state = {
      title: "",
      completed: false
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

    // These variables will be used to construct the todo used in the POST request
    const projectId = this.props.projectId
    const todo = {todo: this.state, project_id: projectId}

    fetch(`${API_URL}/api/v1/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.auth_token}`
      },
      body: JSON.stringify( todo )
    })
    .then(response => response.json())
    .then(() => this.setState({
      // reset the add todo form to a blank input
      title: "",
      completed: false
    }))
    .catch(error => console.log(error))
  }

  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <div className="input-group mb-4">
          <input
            type="text"
            name="title"
            className="form-control text-center border-3"
            placeholder="Add Todo"
            value={this.state.title}
            onChange={this.handleChange}
          />
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="submit">Add</button>
          </div>
        </div>
      </form>
    )
  }
}

export default AddTodo;
