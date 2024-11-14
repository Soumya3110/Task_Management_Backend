import React, { useState } from 'react';
import nameIcon from "../Assets/Icon/name.png";
import emailIcon from "../Assets/Icon/mail.png";
import lockIcon from "../Assets/Icon/lock.png";
import passOpenIcon from "../Assets/Icon/openeye.png";
import passCloseIcon from "../Assets/Icon/closedeye.png"; 
import './Register.css';

const Register = ({ handleToggle }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
      handleToggle();
    }
  };

  return (
    <div className="register-container">
      <div className="form-container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
            />
            <img className="icon" src={nameIcon} alt="Name Icon" />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>
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
          <div className="form-group">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <img className="icon" src={lockIcon} alt="Lock Icon" />
            <img
              className="eye-icon"
              src={showConfirmPassword ? passCloseIcon : passOpenIcon}
              alt="Toggle Confirm Password Visibility"
              onClick={toggleConfirmPasswordVisibility}
            />
            {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
          </div>
          <button type="submit" className="register-btn">Register</button>
        </form>
        <p>Already have an account?</p>
        <button type="button" onClick={handleToggle} className="toggle-btn">
          Login
        </button>
      </div>
    </div>
  );
};

export default Register;
