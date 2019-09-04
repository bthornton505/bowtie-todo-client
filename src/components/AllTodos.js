import React from 'react';
import Todo from './Todo';

const AllTodos = (props) => {
  const todoList = props.todos.map(todo => {
    return(
      <Todo todo={todo} />
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
