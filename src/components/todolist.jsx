
import React from 'react';
import TodoItem from './todoitem';

const TodoList = ({ todos, updateTodo, deleteTodo }) => {
  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {todos.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#666' }}>No tasks to display.</p>
      ) : (
        todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            updateTodo={updateTodo}
            deleteTodo={deleteTodo}
          />
        ))
      )}
    </ul>
  );
};

export default TodoList;