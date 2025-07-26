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
    <section className="py-26 bg-white">
      <div className="container px-4 mx-auto">
        <div className="max-w-lg mx-auto py-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-2">Sign up</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block mb-2 font-extrabold">Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="inline-block w-full p-4 leading-6 text-lg font-extrabold placeholder-indigo-900 bg-white shadow border-2 border-indigo-900 rounded"
                type="text"
                placeholder="Your name"
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 font-extrabold">Email</label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="inline-block w-full p-4 leading-6 text-lg font-extrabold placeholder-indigo-900 bg-white shadow border-2 border-indigo-900 rounded"
                type="email"
                placeholder="Your email"
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 font-extrabold">Phone</label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="inline-block w-full p-4 leading-6 text-lg font-extrabold placeholder-indigo-900 bg-white shadow border-2 border-indigo-900 rounded"
                type="tel"
                placeholder="Your phone"
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 font-extrabold">Password</label>
              <input
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="inline-block w-full p-4 leading-6 text-lg font-extrabold placeholder-indigo-900 bg-white shadow border-2 border-indigo-900 rounded"
                type="password"
                placeholder="**********"
              />
            </div>
            <button
              className="inline-block w-full py-4 px-6 mb-6 text-center text-lg leading-6 text-white font-extrabold bg-indigo-800 hover:bg-indigo-900 border-3 border-indigo-900 shadow rounded transition duration-200"
              type="submit"
            >
              Sign up
            </button>
            <p className="text-center font-extrabold">
              Already have an account? <a className="text-red-500 hover:underline" href="/">Login</a>
            </p>
            {message && <p className="text-center mt-4 font-bold text-red-600">{message}</p>}
          </form>
        </div>
      </div>
    </section>
  );
}
