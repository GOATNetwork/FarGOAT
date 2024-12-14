"use client"

import React, { useState } from 'react';

const Page = () => {

  const [supportType, setSupportType] = useState<string>('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');


  const handleSupportTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSupportType(e.target.value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle the feedback submission logic here
    alert(`Feedback submitted:
    Name: ${name}
    Email: ${email}
    Support Type: ${supportType}
    Description: ${description}
    Feedback: ${feedback}`);
    setName('');
    setEmail('');
    setSupportType('');
    setDescription('');
    setFeedback(''); // Clear the feedback input after submission
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4">Support</h1>
      <p className="text-center mb-6">We value your time. Please provide your details and let us know what support you need.</p>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        
        {/* Name Input */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium mb-2">Your Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            placeholder="Enter your name"
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-2">Your Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your email"
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Support Type Options */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Select the type of support you need:</label>
          <div className="flex flex-col space-y-2">
            <label>
              <input
                type="radio"
                value="Docs"
                checked={supportType === 'Docs'}
                onChange={handleSupportTypeChange}
                className="mr-2"
              />
              Docs
            </label>
            <label>
              <input
                type="radio"
                value="Grants"
                checked={supportType === 'Grants'}
                onChange={handleSupportTypeChange}
                className="mr-2"
              />
              Grants
            </label>
            <label>
              <input
                type="radio"
                value="Incubator"
                checked={supportType === 'Incubator'}
                onChange={handleSupportTypeChange}
                className="mr-2"
              />
              Incubator
            </label>
            <label>
              <input
                type="radio"
                value="Career"
                checked={supportType === 'Career'}
                onChange={handleSupportTypeChange}
                className="mr-2"
              />
              Career
            </label>
          </div>
        </div>

        {/* Description Input */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium mb-2">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Describe your issue or request"
            rows="4"
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          ></textarea>
        </div>



        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 bg-[#FFFF00] text-black rounded-md hover:bg-[#FFFF00]"
        >
          Ask Support
        </button>
      </form>
    </div>
  );
};

export default Page;
