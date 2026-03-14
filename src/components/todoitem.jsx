
import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import ArchiveIcon from '@mui/icons-material/Archive'; 
import UnarchiveIcon from '@mui/icons-material/Unarchive'; 

const TodoItem = ({ todo, updateTodo, deleteTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editedText.trim() && editedText !== todo.text) {
      updateTodo(todo.id, { text: editedText.trim() });
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedText(todo.text); 
    setIsEditing(false);
  };

  const handleToggleComplete = () => {
    updateTodo(todo.id, { completed: !todo.completed });
  };

  const handleToggleArchive = () => {
    updateTodo(todo.id, { is_archived: !todo.is_archived });
  };

  return (
    <li style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 15px',
      borderBottom: '1px solid #f0f0f0',
      backgroundColor: todo.completed ? '#e6ffe6' : 'white', 
      borderRadius: '5px',
      marginBottom: '8px',
      transition: 'background-color 0.3s ease',
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggleComplete}
          style={{ marginRight: '10px', transform: 'scale(1.2)' }}
        />
        {isEditing ? (
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            style={{ flexGrow: 1, padding: '8px', borderRadius: '4px', border: '1px solid #007bff' }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSave();
              if (e.key === 'Escape') handleCancelEdit();
            }}
          />
        ) : (
          <span style={{ textDecoration: todo.completed ? 'line-through' : 'none', flexGrow: 1, color: todo.completed ? '#888' : '#333', fontSize: '1rem' }}>
            {todo.text}
          </span>
        )}
      </div>
      <div>
        {isEditing ? (
          <>
            <button onClick={handleSave} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#28a745', marginRight: '5px', padding: '5px' }}>
              <SaveIcon />
            </button>
            <button onClick={handleCancelEdit} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6c757d', padding: '5px' }}>
              <CancelIcon />
            </button>
          </>
        ) : (
          <>
            <button onClick={handleEdit} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ffc107', marginRight: '5px', padding: '5px' }}>
              <EditIcon />
            </button>
            <button onClick={handleToggleArchive} style={{ background: 'none', border: 'none', cursor: 'pointer', color: todo.is_archived ? '#17a2b8' : '#6c757d', marginRight: '5px', padding: '5px' }}>
              {todo.is_archived ? <UnarchiveIcon /> : <ArchiveIcon />} {/* Toggle icon */}
            </button>
          </>
        )}
        <button onClick={() => deleteTodo(todo.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#dc3545', padding: '5px' }}>
          <DeleteIcon />
        </button>
      </div>
    </li>
  );
};

export default TodoItem;