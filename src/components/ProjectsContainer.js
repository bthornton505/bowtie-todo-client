import React, { Component } from 'react';
import Projects from './Projects';

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
        <h2 className="p-3">Projects</h2>

        <Projects projects={projects} />
      </div>
    )
  }
}

export default ProjectsContainer;
