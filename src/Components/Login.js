import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import emailIcon from "../Assets/Icon/mail.png";
import lockIcon from "../Assets/Icon/lock.png";
import passOpenIcon from "../Assets/Icon/openeye.png";
import passCloseIcon from "../Assets/Icon/closedeye.png"; 
import "./Login.css";

const Login = ({ handleToggle }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
      // Call API to handle login
      // If login is successful, redirect to TaskDashboard
      navigate('/taskdashboard'); // Redirect to TaskDashboard
    }
  };

  return (
    <div className="login-container">
      <div className="form-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <img className="icon" src={emailIcon} alt="Email Icon" />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div className="form-group">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <img className="icon" src={lockIcon} alt="Lock Icon" />
            <img
              className="eye-icon"
              src={showPassword ? passCloseIcon : passOpenIcon}
              alt="Toggle Password Visibility"
              onClick={togglePasswordVisibility}
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>
          <button type="submit" className="login-btn">Login</button>
        </form>
        <p>Have no account yet?</p>
        <button type="button" className="toggle-btn" onClick={handleToggle}>
          Register
        </button>
      </div>
    </div>
  );
};

export default Login;
