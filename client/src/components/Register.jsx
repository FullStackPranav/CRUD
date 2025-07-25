import React, { useState } from 'react';
import axios from 'axios';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/users/register', formData);
      setMessage('Registration successful!');
      setFormData({ name: '', email: '', phone: '', password: '' });
    } catch (error) {
      setMessage(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div>
      <h2>User registration</h2>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='name'
          placeholder='Name'
          value={formData.name}
          onChange={handleChange}
        /><br></br>
        <input
          type='text'
          name='email'
          placeholder='Email'
          value={formData.email}
          onChange={handleChange}
        /><br></br>
        <input
          type='text'
          name='phone'
          placeholder='Phone'
          value={formData.phone}
          onChange={handleChange}
        /><br></br>
        <input
          type='password'
          name='password'
          placeholder='Password'
          value={formData.password}
          onChange={handleChange}
        /><br></br>
        <button type='submit'>Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}