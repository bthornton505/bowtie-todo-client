import React from 'react';

const Todo = (props) => {
  return(
    <li key={props.todo.id} className="list-group-item">
      <input
        type="checkbox"
        checked={props.todo.completed}
        onChange={() => props.updateTodo(props.todo.id)}
        className="form-check-input pull-left"
      />
      <label className="h5 form-check-label">{props.todo.title}</label>
      <button
        className="btn btn-danger btn-xs pull-right close"
        type="submit"
        onClick={() => props.removeProjectTodo(props.todo.id)}
      >
        x
      </button>
    </li>
  )
}

export default Todo;
