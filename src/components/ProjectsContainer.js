import React, { Component } from 'react';
import AllProjects from './AllProjects';
import Button from './Button';

class ProjectsContainer extends Component {
  state = {
    projects: [],
  }

  componentDidMount() {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=3')
      .then(response => response.json())
      .then(projects => {
        this.setState({
          projects: projects.results
        })
      })
      .catch(error => console.log(error))
  }

  render() {
    const projects = this.state.projects

    return(
      <div className="border border-secondary p-4 rounded-lg">
        <h2 className="text-center p-3">Projects</h2>

        <AllProjects projects={projects} />

        <div className="flex-row text-center pt-4">
          <Button path={'/project/new'} buttonText={'New'}/>
        </div>
      </div>
    )
  }
}

export default ProjectsContainer;
