"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useParams } from 'next/navigation';

const TicketOverview = () => {
  const router = useRouter();
  const { ticketId } = useParams();
  const [ticket, setTicket] = useState({
    id: ticketId,
    priority: 'High',
    severity: 'Critical',
    summary: 'Network outage on 5th floor',
    contact: {
      name: 'John Doe',
      email: 'johndoe@example.com',
      phone: '+1 (555) 123-4567',
    },
    attachments: [], // List of attachments
  });

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setTicket((prevTicket) => ({
      ...prevTicket,
      attachments: [...prevTicket.attachments, ...files],
    }));
  };

  const removeAttachment = (index) => {
    setTicket((prevTicket) => ({
      ...prevTicket,
      attachments: prevTicket.attachments.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="w-full max-w-3xl p-10 bg-gray-800 rounded-xl shadow-xl border border-gray-700">
        <h2 className="text-3xl font-semibold text-orange-500 mb-8 text-center">Ticket Overview</h2>

        <h3 className="text-2xl text-orange-500 mb-2">{ticket.summary}</h3>
        <p className="text-gray-400 mb-4">Priority: {ticket.priority} | Severity: {ticket.severity}</p>

        <h4 className="text-xl text-orange-500 mt-6 mb-2">Requestor Contact</h4>
        <p className="text-gray-400">Name: {ticket.contact.name}</p>
        <p className="text-gray-400">Email: <a href={`mailto:${ticket.contact.email}`} className="text-blue-500">{ticket.contact.email}</a></p>
        <p className="text-gray-400">Phone: <a href={`tel:${ticket.contact.phone}`} className="text-blue-500">{ticket.contact.phone}</a></p>

        <div className="mt-6">
          <h4 className="text-xl text-orange-500 mb-2">Attachments</h4>
          <input
            type="file"
            accept="image/*,video/*,audio/*"
            multiple
            onChange={handleFileUpload}
            className="w-full text-gray-200"
          />
          {ticket.attachments.length > 0 && (
            <ul className="mt-4 space-y-2">
              {ticket.attachments.map((file, index) => (
                <li key={index} className="flex items-center justify-between bg-gray-700 p-2 rounded-lg text-gray-200">
                  <span>{file.name}</span>
                  <button
                    onClick={() => removeAttachment(index)}
                    className="text-red-500 hover:text-red-700 text-sm font-semibold"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          onClick={() => router.push(`/ticket/detail/${ticketId}`)}
          className="w-full mt-8 py-3 bg-orange-500 text-white text-lg font-semibold rounded-lg hover:bg-orange-600 transition duration-200"
        >
          Go to Details
        </button>
      </div>
    </div>
  );
};

export default TicketOverview;
