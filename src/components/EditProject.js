import React, { Component } from 'react';
import Button from './Button';
// import { Redirect } from 'react-router-dom';

class EditProject extends Component {
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

  render(){
    const { project } = this.props.location.state
    console.log(project)

    return(
      <div className="border border-secondary p-4 rounded-lg">
        <h2 className="text-center p-3">Edit Project</h2>
        <hr></hr>
        <form>
          <div className="form-group">
            <label htmlFor="formGroupExampleInput">Project Title</label>
            <input
              name="title"
              type="text"
              className="form-control"
              placeholder={project.title}
              value={this.state.title}
              onChange={this.handleChange}
            />
          </div>

          <div className="flex-row">
            <button type="submit" className="btn btn-primary">Update</button>
            <Button path={`/project/${project.id}`} buttonText={'Back'}/>
          </div>
        </form>

      </div>
    )
  }
}

export default EditProject;
