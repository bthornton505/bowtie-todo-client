import React, { Component } from 'react';
import Routes from './Routes'

// import { checkToken } from './fetchRequests/requests'

class App extends Component {
  constructor(){
    super()

    this.state = {
      loggedIn: !!localStorage.getItem('auth_token')
    }
  }

  handleLoginChange = () => {
    this.setState({
      loggedIn: !this.state.loggedIn
    })
  }

  // componentDidMount = () => {
  //   const isAuthenticated = localStorage.getItem('isAuthenticated')
  //   console.log(isAuthenticated)
  //
  //   if (isAuthenticated === true){
  //     this.setState({
  //       authUser: true
  //     })
  //   }
  // }

  render(){
    // const { user, userId, isAuthenticated } = this.state
    const user = localStorage.getItem('user')
    const userId = localStorage.getItem('userId')

    console.log(this.state.loggedIn)
    return (
      <div className="container w-50 p-3">
        <div className="header">
          <h1 className="text-center p-3">
            To-do App
          </h1>
        </div>

        <Routes
          handleLoginChange={this.handleLoginChange}
          loggedIn={this.state.loggedIn}
          user={user}
          userId={userId}
        />

      </div>
    );
  }
}

export default App;
