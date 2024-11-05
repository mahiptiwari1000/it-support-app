"use client";

import { FaUser, FaLock, FaApple, FaGoogle } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'aws-amplify/auth';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track auth state
  const router = useRouter();

  // useEffect(() => {
  //   // Redirect to dashboard if user is authenticated
  //   console.log(isAuthenticated);
  //   if (isAuthenticated) {
  //     router.push('/dashboard');
  //   }
  // }, [isAuthenticated, router]); // Only trigger this effect if `isAuthenticated` changes

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); // Clear any existing errors

    try {
      await signIn({ username, password });
      setIsAuthenticated(true); // Set auth state to true
    } catch (err) {
      setError('Failed to sign in. Please check your credentials.');
      console.error("Login error:", err); // Log the error for debugging
    }
  };

  const handleRegister = () => {
    router.push('/signup'); // Navigate to the signup page
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative">
      <div className="w-full max-w-md bg-opacity-90 bg-gray-800 p-10 rounded-xl shadow-xl border border-gray-700 backdrop-blur-md">
        <div className="flex justify-center mb-6">
          <div className="text-5xl text-orange-500">⚡</div>
        </div>

        <h2 className="text-3xl font-semibold text-center text-orange-500 mb-8">Invincible .</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative">
            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Enter your email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:outline-none"
              required
            />
          </div>

          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:outline-none"
              required
            />
          </div>

          <button type="submit" className="w-full py-3 bg-orange-500 text-white text-lg font-semibold rounded-lg hover:bg-orange-600 transition duration-200">
            Sign in with Email
          </button>

          <button
            type="button"
            onClick={handleRegister} // Link to SignUp page
            className="w-full py-3 mt-4 bg-transparent border border-gray-500 text-gray-400 text-lg font-semibold rounded-lg hover:bg-gray-600 transition duration-200"
          >
            Register now
          </button>

          <div className="flex justify-center space-x-4 mt-4">
            <FaApple className="text-gray-400 text-2xl hover:text-white transition duration-200 cursor-pointer" />
            <FaGoogle className="text-gray-400 text-2xl hover:text-white transition duration-200 cursor-pointer" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;