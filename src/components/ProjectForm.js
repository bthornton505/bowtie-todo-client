import React, { Component } from 'react';
import Button from './Button';

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

    fetch('server', {
      method: "POST",
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify( project )
    })
    .then(response => response.json())
    .catch(error => console.log(error))

    this.setState({
      title: "",
      isCreated: true
    })
  }

  render(){
    return(
      <div className="border border-secondary p-4 rounded-lg">
        <h2 className="text-center p-3">New Project</h2>
        <hr></hr>
        <form>
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
