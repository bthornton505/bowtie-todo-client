import React from 'react';
import { Link } from 'react-router-dom'


const AllProjects = (props) => {
   const projectList = props.projects.map(project => {
     return(
       <li key={project.id} className="list-group-item list-group-item-action">
        <Link to={{
          pathname: `/project/${project.title}`,
          state: {
            project: project
          }
        }}>
          {project.title}
        </Link>
       </li>
     )
   })

  return(
    <ul className="text-center list-group list-group-flush">
      {projectList}
    </ul>
  )
}

AllProjects.defaultProps = {
  projects: []
}


export default AllProjects;
