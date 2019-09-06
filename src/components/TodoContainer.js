import React, { Component } from 'react';
import API_URL from '../fetchRequests/apiUrl';
import AddTodo from './AddTodo';
import AllTodos from './AllTodos';
import { networkRequest } from '../fetchRequests/requests';

class TodoContainer extends Component {
  constructor(){
    super()

    this.state = {
      title: "",
    }
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  updateTodo = (id) => {
    const todoIndex = this.props.project.todos.findIndex(todo => todo.id === id)
    const todo = Object.assign({}, this.props.project.todos[todoIndex], {
      ...this.props.project.todos[todoIndex],
      completed: !(this.props.project.todos[todoIndex].completed)
    })
    networkRequest(`/todos/${id}`, 'PATCH', todo)
    const todos = Object.assign([], this.props.project.todos)
    todos[todoIndex] = todo
    this.props.addOrRemoveTodo(todos)
  }

  addProjectTodos = ({ id, title, project_id, completed }) => {
    const newTodos = [{ id, title, project_id, completed }]
    this.props.addOrRemoveTodo(
      (this.props.project.todos || []).concat(newTodos)
    )
  }

  removeProjectTodos = (id) => {
    networkRequest(`/todos/${id}`, 'DELETE')
    const newTodos = this.props.project.todos.filter(todo => todo.id !== id)
    this.props.addOrRemoveTodo(newTodos)
  }

  handleSubmit = event => {
    event.preventDefault()

    // These variables will be used to construct the todo used in the POST request
    const projectId = this.props.project.id
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
    .then((response) => {
      this.addProjectTodos(response)
      this.setState({
      // reset the add todo form to a blank input
        title: "",
      })
    })
    .catch(error => console.log(error))
  }

  render(){
    return(
      <div>
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

        <AllTodos removeProjectTodos={this.removeProjectTodos} updateTodo={this.updateTodo} todos={this.props.project.todos}/>
      </div>
    )
  }
}

export default TodoContainer;
