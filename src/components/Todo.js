import React from 'react';

const Todo = (props) => {
  return(
    <li key={props.todo.id} className="list-group-item">
      <input type="checkbox" className="form-check-input pull-left"/>
      <span className="name">{props.todo.title}</span>
      <button className="btn btn-danger btn-xs pull-right close" type="submit">
        x
      </button>
    </li>
  )
}

export default Todo;
