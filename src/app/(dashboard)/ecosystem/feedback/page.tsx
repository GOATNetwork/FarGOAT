"use client"

import React, { useState } from 'react';

const Page = () => {
  const [feedback, setFeedback] = useState('');

  const handleFeedbackChange = (e:any) => {
    setFeedback(e.target.value);
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    // Handle the feedback submission logic here
    alert('Feedback submitted: ' + feedback);
    setFeedback(''); // Clear the feedback input after submission
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4">Feedback</h1>
      <p className="text-center mb-6">We value your feedback. Please provide your thoughts below.</p>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <textarea
          value={feedback}
          onChange={handleFeedbackChange}
          placeholder="Write your feedback here..."
          rows="6"
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        ></textarea>

        <button
          type="submit"
          className="w-full py-2 bg-[#FFFF00] text-black rounded-md hover:bg-[#FFFF00]"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Page;