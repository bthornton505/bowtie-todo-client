import React from 'react';

const Todos = (props) => {
  const todoList = props.todos.map(todo => {
    return(
      <li key={todo.id} className="list-group-item list-group-item-action">
        {todo.title}
      </li>
    )
  });

  return(
    <ul className="text-center list-group list-group-flush">
      {todoList}
    </ul>
  )
}

export default Todos;
