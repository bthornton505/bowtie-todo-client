import React, { Component } from 'react';
import API_URL from '../../fetchRequests/apiUrl';
import AllTodos from './AllTodos';
import { networkRequest } from '../../fetchRequests/requests';

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

  // This function updates whether a todo has been completed or not
  updateTodo = (id) => {
    // first we find the index of the todo within its project
    const todoIndex = this.props.project.todos.findIndex(todo => todo.id === id)
    // We create a new version of the todo with its updated attribute
    const todo = Object.assign({}, this.props.project.todos[todoIndex], {
      ...this.props.project.todos[todoIndex],
      completed: !(this.props.project.todos[todoIndex].completed)
    })
    // We create a variable to hold all of the projects todos
    const todos = Object.assign([], this.props.project.todos)
    // We take our new todo and update the specific index with its new value
    todos[todoIndex] = todo
    // Once the todo is properly constructed we send it in our fetch request to the server
    networkRequest(`todos/${id}`, 'PATCH', todo)
    // Lastly, we update the state of our ProjectDetails component which then,
    // updates the AllTodos component
    this.props.addOrRemoveTodo(todos)
  }

  // This function handles adding Todos
  addProjectTodo = ({ id, title, project_id, completed }) => {
    // We construct our newTodo with the server response data
    const newTodo = [{ id, title, project_id, completed }]
    // We then update the state of our ProjectDetails component which then,
    // updates the AllTodos component
    this.props.addOrRemoveTodo(
      (this.props.project.todos || []).concat(newTodo)
    )
  }

  // This function handles deleting a projects todos
  removeProjectTodo = (id) => {
    // We send our Delete Fetch request with the todo id
    networkRequest(`todos/${id}`, 'DELETE')
    // Then construct an updated version of the projects todos
    const newTodos = this.props.project.todos.filter(todo => todo.id !== id)
    // We then update the state of our ProjectDetails component which then,
    // updates the AllTodos component
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
      this.addProjectTodo(response.todo)
      this.setState({
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

        <AllTodos removeProjectTodo={this.removeProjectTodo} updateTodo={this.updateTodo} todos={this.props.project.todos}/>
      </div>
    )
  }
}

export default TodoContainer;
