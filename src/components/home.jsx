
import React, { useState, useEffect, useCallback } from 'react';
import Header from './header';
import './home.css';
import Searchbar from './searchbar';
import TodoList from './todolist';
import TodoForm from './todoform';

const Home = ({ onLogout }) => {
  const [todos, setTodos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [archivedCount, setArchivedCount] = useState(0);

  const getAuthHeaders = useCallback(() => {
    const token = localStorage.getItem('authToken');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  }, []);

  const fetchTodos = useCallback(async () => {
    try {
      const response = await fetch('https://todo-w0i2.onrender.com/api/todos/', {
        headers: getAuthHeaders()
      });
      if (response.ok) {
        const data = await response.json();
        setTodos(data.results);
      } else if (response.status === 401 || response.status === 403) {
        onLogout();
      } else {
        console.error('Failed to fetch todos:', response.statusText);
      }
    } catch (error) {
      console.error('Network error during fetch todos:', error);
    }
  }, [getAuthHeaders, onLogout]);

  const fetchArchivedCount = useCallback(async () => {
    try {
      const response = await fetch('https://todo-w0i2.onrender.com/api/todos/?archived=true', {
        headers: getAuthHeaders()
      });
      if (response.ok) {
        const data = await response.json();
        setArchivedCount(data.count); 
      } else if (response.status === 401 || response.status === 403) {
        onLogout();
      } else {
        console.error('Failed to fetch archived count:', response.statusText);
      }
    } catch (error) {
      console.error('Network error during fetch archived count:', error);
    }
  }, [getAuthHeaders, onLogout]);


  useEffect(() => {
    fetchTodos();
    fetchArchivedCount();
  }, [fetchTodos, fetchArchivedCount, filterStatus]);

  const addTodo = useCallback(async (text) => {
    try {
      const response = await fetch('https://todo-w0i2.onrender.com/api/todos/', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ text, completed: false, is_archived: false }),
      });
      if (response.ok) {
        fetchTodos();
        fetchArchivedCount();
      } else if (response.status === 401 || response.status === 403) {
        onLogout();
      } else {
        console.error('Failed to add todo:', response.statusText);
      }
    } catch (error) {
      console.error('Network error during add todo:', error);
    }
  }, [getAuthHeaders, onLogout, fetchTodos, fetchArchivedCount]);

  const updateTodo = useCallback(async (id, updatedFields) => {
    try {
      const response = await fetch(`https://todo-w0i2.onrender.com/api/todos/${id}/`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify(updatedFields),
      });
      if (response.ok) {
        setTodos(prevTodos =>
          prevTodos.map(todo =>
            todo.id === id ? { ...todo, ...updatedFields } : todo
          )
        );
        fetchTodos();
        fetchArchivedCount();
      } else if (response.status === 401 || response.status === 403) {
        onLogout();
      } else {
        console.error('Failed to update todo:', response.statusText);
      }
    } catch (error) {
      console.error('Network error during update todo:', error);
    }
  }, [getAuthHeaders, onLogout, fetchTodos, fetchArchivedCount]);

  const deleteTodo = useCallback(async (id) => {
    try {
      const response = await fetch(`https://todo-w0i2.onrender.com/api/todos/${id}/`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      if (response.ok) {
        setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
        fetchArchivedCount();
      } else if (response.status === 401 || response.status === 403) {
        onLogout();
      } else {
        console.error('Failed to delete todo:', response.statusText);
      }
    } catch (error) {
      console.error('Network error during delete todo:', error);
    }
  }, [getAuthHeaders, onLogout, fetchArchivedCount]);

  const displayedTodos = todos.filter(todo => {
    const matchesSearch = todo.text && todo.text.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = (
      filterStatus === 'all' ||
      (filterStatus === 'completed' && todo.completed) ||
      (filterStatus === 'inprogress' && !todo.completed) ||
      (filterStatus === 'archived' && todo.is_archived)
    );
    if (filterStatus === 'archived') {
        return matchesSearch && matchesFilter;
    }
    return matchesSearch && matchesFilter && !todo.is_archived; // Only show non-archived for other filters
  });

  const homeData = {
    state: {
      completed: todos.filter(todo => todo.completed).length,
      inprogress: todos.filter(todo => !todo.completed).length,
      total: todos.length,
      archived: archivedCount,
    },
  };

  const handleFilterChange = async (status) => {
    setFilterStatus(status);
    if (status === 'archived') {
      try {
        const response = await fetch('https://todo-w0i2.onrender.com/api/todos/?archived=true', {
          headers: getAuthHeaders()
        });
        if (response.ok) {
          const data = await response.json();
          // --- CRUCIAL LINE 2: This *should* be 'data.results' because your API is paginated ---
          setTodos(data.results);
        } else if (response.status === 401 || response.status === 403) {
          onLogout();
        } else {
          console.error('Failed to fetch archived todos:', response.statusText);
        }
      } catch (error) {
        console.error('Network error during fetch archived todos:', error);
      }
    } else {
      fetchTodos(); // Fetch all non-archived tasks when not in 'archived' filter
    }
  };

  return (
    <div className="todo-app">
      <Header apidata={homeData} onLogout={onLogout} />
      <div className="stats-container">
        <div className={`stat-card ${filterStatus === 'all' ? 'active' : ''}`} onClick={() => handleFilterChange('all')}>
          <h3>All</h3>
          <p>{homeData.state.total}</p>
        </div>
        <div className={`stat-card ${filterStatus === 'completed' ? 'active' : ''}`} onClick={() => handleFilterChange('completed')}>
          <h3>Completed</h3>
          <p>{homeData.state.completed}</p>
        </div>
        <div className={`stat-card ${filterStatus === 'inprogress' ? 'active' : ''}`} onClick={() => handleFilterChange('inprogress')}>
          <h3>In Progress</h3>
          <p>{homeData.state.inprogress}</p>
        </div>
        <div className={`stat-card ${filterStatus === 'archived' ? 'active' : ''}`} onClick={() => handleFilterChange('archived')}>
          <h3>Archived</h3>
          <p>{homeData.state.archived}</p>
        </div>
      </div>
      <Searchbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setFilterStatus={handleFilterChange}
        currentFilter={filterStatus}
      />
      <TodoForm addTodo={addTodo} />
      <TodoList
        todos={displayedTodos}
        updateTodo={updateTodo}
        deleteTodo={deleteTodo}
      />
    </div>
  );
};

export default Home;
