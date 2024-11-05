"use client";

import { useRouter } from 'next/navigation';
import { signOut } from 'aws-amplify/auth';
import { useState, useEffect } from 'react';

const Dashboard = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  useEffect(() => {
    // Simulate fetching the authenticated user's information
    setUser({ username: 'InvincibleUser' }); // Replace with actual user data retrieval logic
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative">
      <div className="w-full max-w-md bg-opacity-90 bg-gray-800 p-10 rounded-xl shadow-xl border border-gray-700 backdrop-blur-md text-center">
        <div className="text-5xl text-orange-500 mb-4">⚡</div>
        <h2 className="text-3xl font-semibold text-orange-500 mb-4">Welcome, {user?.username || 'User'}!</h2>
        <p className="text-gray-400 mb-8">You are now on the Dashboard.</p>

        <button
          onClick={handleSignOut}
          className="w-full py-3 bg-orange-500 text-white text-lg font-semibold rounded-lg hover:bg-orange-600 transition duration-200"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
