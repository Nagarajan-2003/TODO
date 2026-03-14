
import React from 'react'
import AddTaskIcon from '@mui/icons-material/AddTask';

const Header = ({ apidata, onLogout }) => {
  return (
    <header>
        <div className='home-header-container'>
            <div>
            <h1 className='header-logo-txt'>TODO</h1>
        </div>
        <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
            <button className='new-task-btn'>
                <span><AddTaskIcon fontSize='large' /></span>{" "} New Task
            </button>
            <button className='new-task-btn' onClick={onLogout} style={{ backgroundColor: '#dc3545', color: 'white', border: 'none' }}>
                Logout
            </button>
        </div>
        </div>
    </header>
  )
}

export default Header