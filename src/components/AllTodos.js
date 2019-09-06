import React from 'react';
import Todo from './Todo';

const AllTodos = (props) => {
  const todoList = props.todos.map(todo => {
    return(
      <Todo removeProjectTodos={props.removeProjectTodos} updateTodo={props.updateTodo} key={todo.id} todo={todo} />
    )
  })

  return(
    <ul className="list-group">
        {todoList}
    </ul>
  )
}

AllTodos.defaultProps = {
  todos: []
}

export default AllTodos;
