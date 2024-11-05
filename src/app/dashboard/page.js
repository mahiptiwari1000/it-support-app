"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { signOut } from 'aws-amplify/auth';

const Dashboard = () => {
  const router = useRouter();
  const [tickets, setTickets] = useState([
    {
      id: 1,
      priority: 'High',
      severity: 'Critical',
      summary: 'Network outage on 5th floor',
      contact: 'John Doe - johndoe@example.com',
    },
    // Add more tickets as needed
  ]);

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const openTicket = (ticketId) => {
    router.push(`/ticket/${ticketId}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="w-full max-w-4xl p-10 bg-gray-800 rounded-xl shadow-xl border border-gray-700">
        <h2 className="text-3xl font-semibold text-orange-500 mb-8 text-center">Ticket Dashboard</h2>

        <div className="space-y-4">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="p-4 bg-gray-700 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-orange-500">{ticket.summary}</h3>
              <p className="text-gray-400">Priority: {ticket.priority} | Severity: {ticket.severity}</p>
              <p className="text-gray-400">Requestor Contact: {ticket.contact}</p>
              <button
                onClick={() => openTicket(ticket.id)}
                className="mt-2 text-sm font-semibold text-blue-500 hover:text-blue-300 transition duration-150"
              >
                View Details
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={handleSignOut}
          className="w-full mt-8 py-3 bg-orange-500 text-white text-lg font-semibold rounded-lg hover:bg-orange-600 transition duration-200"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
