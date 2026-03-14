
import React, { useState } from 'react';
import './searchbar.css';

const TodoForm = ({ addTodo }) => {
  const [newTodo, setNewTodo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTodo.trim()) {
      addTodo(newTodo.trim());
      setNewTodo('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', justifyContent: 'center', margin: '20px auto', width: '80%', maxWidth: '700px', gap: '10px' }}>
      <input
        type="text"
        placeholder="Add a new task..."
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        className='add-task-input'
        style={{ flexGrow: 1 }}
      />
      <button type="submit" className='add-task-btn'>
        Add Task
      </button>
    </form>
  );
};

export default TodoForm;