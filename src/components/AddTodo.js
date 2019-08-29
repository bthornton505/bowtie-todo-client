import React, { Component } from 'react';

class AddTodo extends Component {
  constructor(props){
    super(props)

    this.state = {
      title: ""
    }
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  render(){
    return(
      <input
        type="text"
        name="title"
        className="text-center form-control border-0"
        placeholder="Add Todo"
        value={this.state.title}
        onChange={this.handleChange}
      />
    )
  }
}

export default AddTodo;
