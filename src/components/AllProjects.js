import React from 'react';
import { Link } from 'react-router-dom'


const AllProjects = (props) => {
   const projectList = props.projects.map(project => {
     return(
       <li className="list-group-item list-group-item-action">
        <Link to={{
          pathname: `/project/${project.name}`
        }}>
          {project.name}
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

export default AllProjects;
