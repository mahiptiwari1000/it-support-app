"use client";

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import AISummary from '../component/AISummary';

const TicketDetail = () => {
  const router = useRouter();
  const { ticketId } = useParams();
  const [suggestedResponse, setSuggestedResponse] = useState('');
  const [ticket, setTicket] = useState({
    id: ticketId,
    status: 'In Progress',
    description: 'The network has been down since 8:00 AM, affecting all users on the 5th floor. No internet access or network resources available.',
    progress: 'Checked network cables and found them intact. Next step is to inspect the main server room for potential issues.',
    resolution: 'Identified and replaced faulty switch in server room. Network is now operational.',
    messages: [
      { sender: 'Assignee', content: 'Please provide details on how the issue started.', timestamp: '2023-11-04 10:30 AM' },
      { sender: 'Requestor', content: 'It started suddenly this morning. No changes made to the setup.', timestamp: '2023-11-04 10:45 AM' },
      { sender: 'Assignee', content: 'Thank you. Checking the server room now.', timestamp: '2023-11-04 11:00 AM' },
    ],
    logs: [
      { timestamp: '2023-11-04 9:00 AM', description: 'Status changed to "Assign"' },
      { timestamp: '2023-11-04 10:15 AM', description: 'Status changed to "In Progress"' },
      { timestamp: '2023-11-04 10:45 AM', description: 'Status changed to "Pending"' },
      { timestamp: '2023-11-04 11:30 AM', description: 'Status changed to "Resolved"' },
    ],
  });
  const [newMessage, setNewMessage] = useState('');

  // Fetch suggested response from API route
  useEffect(() => {
    async function fetchSuggestedResponse() {
      try {
        const res = await fetch('/api/suggestedResponse', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ issueDescription: ticket.description }),
        });

        const data = await res.json();
        if (res.ok) {
          setSuggestedResponse(data.suggestion);
        } else {
          console.error("Error:", data.error);
          setSuggestedResponse("Please confirm that all network cables are securely connected on the affected floor. Check connections in the server room, including routers and switches. If issues persist, restart the affected hardware and run diagnostics on the network configuration.");
        }
      } catch (error) {
        console.error("Error fetching suggested response:", error);
        setSuggestedResponse("Please confirm that all network cables are securely connected on the affected floor. Check connections in the server room, including routers and switches. If issues persist, restart the affected hardware and run diagnostics on the network configuration.");
      }
    }
    fetchSuggestedResponse();
  }, [ticket.description]);

  const addLogEntry = (newStatus) => {
    const logEntry = { timestamp: new Date().toLocaleString(), description: `Status changed to "${newStatus}"` };
    setTicket((prevTicket) => ({ ...prevTicket, logs: [...prevTicket.logs, logEntry] }));
  };

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setTicket((prevTicket) => ({ ...prevTicket, status: newStatus }));
    addLogEntry(newStatus);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = { sender: 'Assignee', content: newMessage, timestamp: new Date().toLocaleString() };
      setTicket((prevTicket) => ({ ...prevTicket, messages: [...prevTicket.messages, message], status: 'Pending' }));
      addLogEntry('Pending');
      setNewMessage('');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="w-full max-w-3xl p-10 bg-gray-800 rounded-xl shadow-xl border border-gray-700">
        <h2 className="text-3xl font-semibold text-orange-500 mb-8 text-center">Ticket Details</h2>

        {/* AI Summary Feature */}
        <AISummary description={ticket.description} />
        {/* Detail Description */}
        <h4 className="text-xl text-orange-500 mb-2">Issue Description</h4>
        <p className="text-gray-400 mb-6">{ticket.description}</p>

        {/* Suggested Response */}
        <div className="p-6 mb-8 bg-gray-900 border border-blue-500 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold text-blue-500 mb-2">AI Suggested Response</h3>
          <p className="text-gray-400">{suggestedResponse || 'Loading suggested response...'}</p>
        </div>

        {/* Current Status Dropdown */}
        <h4 className="text-xl text-orange-500 mb-2">Current Status</h4>
        <select
          value={ticket.status}
          onChange={handleStatusChange}
          className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200"
        >
          <option>Assign</option>
          <option>In Progress</option>
          <option>Pending</option>
          <option>Resolved</option>
          <option>Closed</option>
        </select>

        {/* Progress Field */}
        <div className="mt-6">
          <h4 className="text-xl text-orange-500 mb-2">Progress Updates</h4>
          <textarea
            value={ticket.progress}
            onChange={(e) => setTicket({ ...ticket, progress: e.target.value })}
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:outline-none"
            placeholder="Add progress update here"
          ></textarea>
        </div>

        {/* Resolution Field */}
        <div className="mt-6">
          <h4 className="text-xl text-orange-500 mb-2">Resolution</h4>
          <textarea
            value={ticket.resolution}
            onChange={(e) => setTicket({ ...ticket, resolution: e.target.value })}
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:outline-none"
            placeholder="Enter resolution details here"
          ></textarea>
        </div>

          {/* Message History and Communication */}
        <div className="mt-6">
          <h4 className="text-xl text-orange-500 mb-2">Message History</h4>
          <div className="space-y-4 bg-gray-700 p-4 rounded-lg max-h-64 overflow-y-auto">
            {ticket.messages.length > 0 ? (
              ticket.messages.map((message, index) => (
                <div key={index} className="text-gray-200">
                  <p className="text-sm text-gray-400 mb-1">{message.sender} | {message.timestamp}</p>
                  <p>{message.content}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No messages yet.</p>
            )}
          </div>

          {/* Message Input */}
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="w-full mt-4 p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:outline-none"
            placeholder="Type your message here"
          ></textarea>
          <button
            onClick={handleSendMessage}
            className="w-full mt-2 py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Send Message & Mark as Pending
          </button>
        </div>

        {/* Status Log */}
        <div className="mt-6">
          <h4 className="text-xl text-orange-500 mb-2">Status Log</h4>
          <div className="space-y-4 bg-gray-700 p-4 rounded-lg max-h-64 overflow-y-auto">
            {ticket.logs.length > 0 ? (
              ticket.logs.map((log, index) => (
                <div key={index} className="text-gray-200">
                  <p className="text-sm text-gray-400 mb-1">{log.timestamp}</p>
                  <p>{log.description}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No status changes logged.</p>
            )}
          </div>
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