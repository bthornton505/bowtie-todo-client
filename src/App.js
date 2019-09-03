import React, { Component } from 'react';
import Routes from './Routes'

import { checkToken } from './fetchRequests/requests'

class App extends Component {

  // componentWillMount = () => {
  //   const authToken = localStorage.auth_token
  //   const { isAuthenticated } = this.state
  //
  //   if (isAuthenticated !== undefined) {
  //     checkToken(authToken)
  //   } else {
  //     this.history.push('/login')
  //   }
  // }

  render(){
    // const { user, userId, isAuthenticated } = this.state
    const isAuthenticated = localStorage.getItem('auth_token')
    const user = localStorage.getItem('user')
    const userId = localStorage.getItem('userId')

    return (
      <div className="container w-50 p-3">
        <h1 className="text-center p-3">
          To-do App
        </h1>

        <Routes
          isAuthenticated={isAuthenticated}
          user={user}
          userId={userId}
        />

      </div>
    );
  }
}

export default App;
