import React from 'react';
import Todo from './Todo';

const AllTodos = (props) => {
  const todoList = props.todos.map(todo => {
    return(
      <Todo removeProjectTodo={props.removeProjectTodo} updateTodo={props.updateTodo} key={todo.id} todo={todo} />
    )
  })

  return(
    <ul className="list-group list-group-flush">
        {todoList}
    </ul>
  )
}

AllTodos.defaultProps = {
  todos: []
}

export default AllTodos;
