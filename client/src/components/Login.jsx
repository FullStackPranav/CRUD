import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate =useNavigate()
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
      const res = await axios.post('http://localhost:5000/api/users/login', formData);
      const{name,phone}=res.data
      localStorage.setItem('userName', name)
      localStorage.setItem('userPhone', phone)
      console.log("Login Response:", res.data)
      
      setMessage('Login successful');
      setFormData({ email: '', password: '' });
      navigate('/userdashboard')
    } catch (error) {
      setMessage(error.response?.data?.message || 'Login failed');
    }
  };

  

  return (
    <>
      <section className="py-26 bg-white">
        <div className="container px-4 mx-auto">
          <div className="max-w-lg mx-auto py-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-2">Sign in</h2>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block mb-2 font-extrabold" htmlFor="">Email</label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="inline-block w-full p-4 leading-6 text-lg font-extrabold placeholder-indigo-900 bg-white shadow border-2 border-indigo-900 rounded"
                  type="email"
                  placeholder="email"
                />
              </div>
              <div className="mb-6">
                <label className="block mb-2 font-extrabold" htmlFor="">Password</label>
                <input
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="inline-block w-full p-4 leading-6 text-lg font-extrabold placeholder-indigo-900 bg-white shadow border-2 border-indigo-900 rounded"
                  type="password"
                  placeholder="**********"
                />
              </div>
              <div className="flex flex-wrap -mx-4 mb-6 items-center justify-between">
                <div className="w-full lg:w-auto px-4 mb-4 lg:mb-0">
                  <label>
                    <input type="checkbox" />
                    <span className="ml-1 font-extrabold">Remember me</span>
                  </label>
                </div>
                <div className="w-full lg:w-auto px-4">
                  <a className="inline-block font-extrabold hover:underline" href="#">Forgot your password?</a>
                </div>
              </div>
              <button
                className="inline-block w-full py-4 px-6 mb-6 text-center text-lg leading-6 text-white font-extrabold bg-indigo-800 hover:bg-indigo-900 border-3 border-indigo-900 shadow rounded transition duration-200"
                type="submit"
              >
                Sign in
              </button>
              <p className="text-center font-extrabold">
                Don&rsquo;t have an account? <a className="text-red-500 hover:underline" href="/register">Sign up</a>
              </p>
              {message && <p className="text-center mt-4 font-bold text-red-600">{message}</p>}
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
