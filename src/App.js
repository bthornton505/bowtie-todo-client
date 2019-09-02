import React, { Component } from 'react';
import Routes from './Routes'

import { checkToken } from './fetchRequests/requests'

class App extends Component {
  state = {
    user: {},
    isAuthenticated: false
  }

  componentDidMount = () => {
    const authToken = localStorage.auth_token
    console.log(authToken)

    if (authToken) {
      return checkToken(authToken)
    }
  }

  render(){
    return (
      <div className="container w-50 p-3">
        <h1 className="text-center p-3">
          To-do App
        </h1>

        <Routes user={this.state.user} isAuthenticated={this.state.isAuthenticated}/>

      </div>
    );
  }
}

export default App;
