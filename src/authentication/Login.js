import React, { Component } from 'react';
import Button from '../components/Button';
import { Redirect } from 'react-router-dom';
// import API_URL from '../fetchRequests/apiUrl';

import { authenticate } from '../fetchRequests/requests'

class Login extends Component {
  constructor(){
    super()

    this.state = {
      email: "",
      password: "",
      submitted: false
    }
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const credentials = this.state

    authenticate(credentials)

    this.setState({
      submitted: true
    });
  }

  render(){
    const { submitted } = this.state
    // const authToken = localStorage.auth_token

    if (submitted === true){
      return <Redirect to="/projects" />
    }

    return(
      <div className="border border-secondary p-4 rounded-lg">
        <h2 className="text-center p-3">
          Login
        </h2>
        <hr></hr>
        <form onSubmit={this.handleSubmit}>
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
          <button type="submit" className="btn btn-primary">Login</button>
          <Button path={'/'} buttonText={'Back'}/>
        </form>
      </div>
    )
  }
}

export default Login;
