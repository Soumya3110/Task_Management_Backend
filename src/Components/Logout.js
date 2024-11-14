import React from 'react';
import './Logout.css';

const Logout = ({ confirmLogout, cancelLogout }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Are you sure you want to log out?</h3>
        <button onClick={confirmLogout}>Yes</button>
        <button onClick={cancelLogout}>No</button>
      </div>
    </div>
  );
};

export default Logout;
