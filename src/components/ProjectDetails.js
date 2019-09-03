import React from 'react';
import Button from './Button';
import AddTodo from './AddTodo'

const ProjectDetails = (props) => {
  const { project } = props.location.state
  console.log(project)
  return(
    <div className="border border-secondary p-4 rounded-lg">
      <h2 className="text-center p-3">{project.title}</h2>

      <AddTodo />

      <ul className="text-center list-group list-group-flush">
        <li className="list-group-item list-group-item-action">todo #1</li>
        <li className="list-group-item list-group-item-action">todo #2</li>
        <li className="list-group-item list-group-item-action">todo #3</li>
      </ul>

      <div className="flex-row text-center pt-4">
        <Button path={'/projects'} buttonText={'Back'}/>
        <Button path={'/project/:title/edit'} buttonText={'Edit'}/>
      </div>
    </div>
  )
}

export default ProjectDetails;
