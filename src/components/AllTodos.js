import React from 'react';

const AllTodos = (props) => {
  const todoList = props.todos.map(todos => {
    return(
      <li key={todos.id} className="list-group-item">
        <input type="checkbox" className="form-check-input"/>
        <span className="name">{todos.title}</span>
        <button className="btn btn-danger btn-xs pull-right close" type="submit">
          x
        </button>
      </li>
    )
  })

  return(
    <ul className="text-center list-group">
        {todoList}
    </ul>
  )
}

AllTodos.defaultProps = {
  todos: []
}

export default AllTodos;
