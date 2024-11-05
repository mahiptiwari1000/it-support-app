"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useParams } from 'next/navigation';

const TicketDetail = () => {
  const router = useRouter();
  const { ticketId } = useParams();
  const [ticket, setTicket] = useState({
    id: ticketId,
    priority: 'High',
    severity: 'Critical',
    summary: 'Network outage on 5th floor',
    description: 'The network has been down since morning. Several employees are affected.',
    contact: 'John Doe - johndoe@example.com',
    status: 'Assign',
    resolution: '',
  });
  const [progress, setProgress] = useState('');

  const handleStatusChange = (newStatus) => {
    setTicket((prevTicket) => ({
      ...prevTicket,
      status: newStatus,
    }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    console.log("File uploaded:", file); // Handle file upload logic
  };

  const saveProgress = () => {
    console.log("Progress saved:", progress);
    setProgress('');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="w-full max-w-3xl p-10 bg-gray-800 rounded-xl shadow-xl border border-gray-700">
        <h2 className="text-3xl font-semibold text-orange-500 mb-8 text-center">Ticket Details</h2>

        <h3 className="text-2xl text-orange-500 mb-2">{ticket.summary}</h3>
        <p className="text-gray-400 mb-4">Priority: {ticket.priority} | Severity: {ticket.severity}</p>
        <p className="text-gray-400 mb-4">{ticket.description}</p>
        <p className="text-gray-400 mb-4">Requestor Contact: {ticket.contact}</p>

        <h4 className="text-xl text-orange-500 mt-6 mb-2">Status: {ticket.status}</h4>
        <select
          value={ticket.status}
          onChange={(e) => handleStatusChange(e.target.value)}
          className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200"
        >
          <option>Assign</option>
          <option>In Progress</option>
          <option>Pending</option>
          <option>Resolved</option>
          <option>Closed</option>
        </select>

        <div className="mt-6">
          <h4 className="text-xl text-orange-500 mb-2">Progress Updates</h4>
          <textarea
            value={progress}
            onChange={(e) => setProgress(e.target.value)}
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 placeholder-gray-500"
            placeholder="Add progress update"
          ></textarea>
          <button
            onClick={saveProgress}
            className="w-full mt-4 py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Save Progress
          </button>
        </div>

        <div className="mt-6">
          <h4 className="text-xl text-orange-500 mb-2">Attach Files</h4>
          <input type="file" onChange={handleFileUpload} className="w-full text-gray-200"/>
        </div>

        <button
          onClick={() => router.back()}
          className="w-full mt-8 py-3 bg-orange-500 text-white text-lg font-semibold rounded-lg hover:bg-orange-600 transition duration-200"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default TicketDetail;
