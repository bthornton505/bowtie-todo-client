import React from 'react';

const ProjectDetails = () => {
  // const { project } = this.props.match.params

  return(
    <div className="border border-secondary p-4 rounded-lg">
      <h2 className="p-3">Project Name</h2>

      <ul className="list-group list-group-flush">
        <li className="list-group-item list-group-item-action">todo #1</li>
        <li className="list-group-item list-group-item-action">todo #2</li>
        <li className="list-group-item list-group-item-action">todo #3</li>
      </ul>
    </div>
  )
}

export default ProjectDetails;
