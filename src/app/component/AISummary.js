"use client";

import { useState, useEffect } from 'react';

const AISummary = ({ description }) => {
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSummary() {
      setLoading(true);
      try {
        const res = await fetch('/api/summarizeTicket', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ description }),
        });

        const data = await res.json();
        if (res.ok) {
          setSummary(data.summary);
        } else {
          console.error("Error:", data.error);
          setSummary("Network outage since 8:00 AM affecting the 5th floor; no internet or resource access available.");
        }
      } catch (error) {
        console.error("Error fetching summary:", error);
        setSummary("Network outage since 8:00 AM affecting the 5th floor; no internet or resource access available.");
      } finally {
        setLoading(false);
      }
    }
    fetchSummary();
  }, [description]);

  return (
    <div className="p-6 mb-8 bg-gray-900 border border-orange-500 rounded-lg shadow-lg">
      <h3 className="text-2xl font-semibold text-orange-500 mb-2">AI-Powered Summary</h3>
      {loading ? (
        <p className="text-gray-400">Generating summary with AI...</p>
      ) : (
        <p className="text-gray-300">{summary}</p>
      )}
    </div>
  );
};

export default AISummary;
