import { useState } from 'react';
import axiosInstance from '../api/axiosInstance';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setMessage('Login successful!');
    } catch (err: any) {
      setMessage(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-dark mb-6 text-center">Welcome Back</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            name="email" type="email" placeholder="Email" onChange={handleChange} required
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            name="password" type="password" placeholder="Password" onChange={handleChange} required
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            className="bg-primary text-white py-2 rounded-lg font-medium hover:opacity-90 transition"
          >
            Login
          </button>
        </form>
        {message && <p className="text-center mt-4 text-sm text-gray-600">{message}</p>}
      </div>
    </div>
  );
}

export default Login;