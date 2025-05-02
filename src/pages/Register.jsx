
import React, { useState } from 'react';
import { FaFacebookF, FaApple } from 'react-icons/fa';
import { FcGoogle } from "react-icons/fc";
import axiosInstance from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post('/api/auth/register', formData);
      localStorage.setItem('token', res.data.token);
      alert('Registration successful!');
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.error || 'Registration failed');
    }
  };


  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="flex items-center justify-between px-6 py-4 border-b">
        <div className="flex items-center space-x-2">
          <div className="bg-blue-600 text-white text-lg font-bold rounded-full w-10 h-10 flex items-center justify-center">📅</div>
          <span className="text-2xl font-bold text-gray-800">Listify</span>
        </div>
        <nav className="space-x-6 text-sm font-medium text-gray-800">
          <a href="#">About us</a>
          <a href="#">Contacts</a>
        </nav>
      </header>

      <main className="flex-grow flex items-center justify-center px-4">
        <div className="bg-gray-50 rounded-2xl shadow-md p-10 w-full max-w-md text-center">
          <h2 className="text-2xl font-bold text-blue-600 mb-2">Register</h2>
          <p className="text-gray-600 mb-6">Welcome! Sign up using your social account or email to continue</p>

          <div className="flex justify-center space-x-6 mb-6">
            <button className="bg-[#1b57d7] text-white w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition">
              <FaFacebookF size={20} />
            </button>
            <button className="bg-white  p-2  hover:scale-110 transition "><FcGoogle size={30} /></button>
            <button className=" text-black p-2  hover:scale-110 transition"><FaApple size={30} /></button>
          </div>

          <form onSubmit={handleRegister} className="space-y-4 text-left">
            <div>

              <input type="text" name="name" value={formData.name} onChange={handleChange}
                className="w-full border-b border-gray-400 focus:outline-none py-2" placeholder="Your name" />
            </div>
            <div>

              <input type="email" name="email" value={formData.email} onChange={handleChange}
                className="w-full border-b border-gray-400 focus:outline-none py-2" placeholder="Your email" />
            </div>
            <div>

              <input type="password" name="password" value={formData.password} onChange={handleChange}
                className="w-full border-b border-gray-400 focus:outline-none py-2" placeholder="Password" />
            </div>
            <button type="submit"
              className="mt-4 w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700">
              Register
            </button>
          </form>
          <p className="mt-4 text-sm text-gray-600 text-center">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/login')}
              className="text-blue-600 font-semibold hover:underline"
            >
              Login
            </button>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Register;

