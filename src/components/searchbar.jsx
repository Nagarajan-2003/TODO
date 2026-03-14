
import React from 'react';
import './searchbar.css';

const Searchbar = ({ searchTerm, setSearchTerm, setFilterStatus, currentFilter }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '20px auto', width: '80%', maxWidth: '700px', gap: '10px' }}>
      <input
        type='text'
        placeholder='Search tasks...'
        className='search-input'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select
        className='filter-select'
        value={currentFilter}
        onChange={(e) => setFilterStatus(e.target.value)}
      >
        <option value="all">All</option>
        <option value="inprogress">In Progress</option>
        <option value="completed">Completed</option>
        <option value="archived">Archived</option> 
      </select>
    </div>
  );
};

export default Searchbar;