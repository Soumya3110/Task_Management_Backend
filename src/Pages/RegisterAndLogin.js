// RegisterAndLogin.js
import React, { useState } from 'react';
import Register from '../Components/Register';
import Login from '../Components/Login';
import group from "../Assets/Group.png"
import './RegisterAndLogin.css';

const RegisterAndLogin = () => {
  const [isRegister, setIsRegister] = useState(true);

  const handleToggle = () => {
    setIsRegister(!isRegister);
  };

  return (
    <div className="register-login-container">
      <div className="side-image">
        <div className='circle'></div>
        <img src={group} alt="Group"/>
        <h1>Welcome aboard my friend</h1>
        <p>Just a couple of clicks and we start</p>
      </div>

      <div className="form-section">
        {isRegister ? (
          <Register handleToggle={handleToggle} />
        ) : (
          <Login handleToggle={handleToggle} />
        )}
      </div>
    </div>
  );
};

export default RegisterAndLogin;
