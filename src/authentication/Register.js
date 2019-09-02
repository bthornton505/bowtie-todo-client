import React, { Component } from 'react';
import Button from '../components/Button';

import { signup } from '../fetchRequests/requests'

class Register extends Component {
  constructor(){
    super()

    this.state = {
      username: "",
      email: "",
      password: ""
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
    const user = this.state

    signup(user)

    this.setState({
      username: "",
      email: "",
      password: ""
    })
  }

  render(){
    return(
      <div className="border border-secondary p-4 rounded-lg">
        <h2 className="text-center p-3">
          Sign Up
        </h2>
        <hr></hr>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="formGroupExampleInput">Username</label>
            <input
              name="username"
              type="text"
              className="form-control"
              placeholder="Username"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="formGroupExampleInput">Email</label>
            <input
              name="email"
              type="text"
              className="form-control"
              placeholder="Email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="formGroupExampleInput">Password</label>
            <input
              name="password"
              type="password"
              className="form-control"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">Signup</button>
          <Button path={'/'} buttonText={'Back'}/>
        </form>
      </div>
    )
  }
}

export default Register;
