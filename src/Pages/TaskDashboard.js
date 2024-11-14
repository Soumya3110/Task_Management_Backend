import React, { useState, useContext } from 'react';
import { TaskContext } from '../Components/Context/task_context';
import logout from "../Assets/Icon/logout.png";
import board from "../Assets/Icon/board.png";
import analytics from "../Assets/Icon/analytics.png";
import setting from "../Assets/Icon/settings.png";
import logo from "../Assets/Icon/logo.png";
import Board from "../Components/Board";
import Analytics from "../Components/Analytics";
import Settings from "../Components/Setting";
import LogoutModal from "../Components/Logout";
import AddTask from '../Components/CreateTask';  // Import the AddTask component
import './TaskDashboard.css';

const TaskDashboard = () => {
  const { tasks, user } = useContext(TaskContext); // Assuming `user` contains the logged-in user's name
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState('');
  const [activeSection, setActiveSection] = useState('board');
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);  // State for AddTask modal

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openAddTaskModal = () => setIsAddTaskOpen(true); // Function to open AddTask modal
  const closeAddTaskModal = () => setIsAddTaskOpen(false); // Function to close AddTask modal

  const handleFilterChange = (e) => setFilter(e.target.value);
  const confirmLogout = () => {
    console.log('User logged out');
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <div className="sidebar">
        <h2><img src={logo} alt="logo"/>Pro Manage</h2>
        <ul>
          <li onClick={() => setActiveSection('board')}>
            <img src={board} alt="board" />Board
          </li>
          <li onClick={() => setActiveSection('analytics')}>
            <img src={analytics} alt="analytics" />Analytics
          </li>
          <li onClick={() => setActiveSection('settings')}>
            <img src={setting} alt="settings" />Settings
          </li>
        </ul>
        <button className="logout-btn" onClick={() => setActiveSection('logout')}>
          <img src={logout} alt="logout"/>Log out
        </button>
      </div>

      {/* Main Dashboard */}
      <div className="dashboard-container">
        {activeSection === 'board' && (
          <Board 
            tasks={tasks} 
            openModal={openModal} 
            filter={filter} 
            handleFilterChange={handleFilterChange} 
            openAddTaskModal={openAddTaskModal}  // Pass the function to Board
          />
        )}
        {activeSection === 'analytics' && <Analytics />}
        {activeSection === 'settings' && <Settings />}
        {activeSection === 'logout' && (
          <LogoutModal confirmLogout={confirmLogout} cancelLogout={() => setActiveSection('board')} />
        )}
      </div>

      {/* Add Task Modal */}
      {isAddTaskOpen && <AddTask closeAddTaskModal={closeAddTaskModal} />}  {/* Conditionally render AddTask */}
    </div>
  );
};

export default TaskDashboard;

