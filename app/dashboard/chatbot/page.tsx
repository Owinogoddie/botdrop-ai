import React from 'react';

const ChatbotPage = () => {
  return (
    <div className="p-6 bg-light">
      <h1 className="text-3xl font-bold text-dark mb-6">Chatbot Configuration</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-4">
          <label htmlFor="siteUrl" className="block text-sm font-medium text-gray-700 mb-2">Site URL</label>
          <input type="text" id="siteUrl" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" placeholder="https://yourdomain.com" />
        </div>
        <div className="mb-4">
          <label htmlFor="botType" className="block text-sm font-medium text-gray-700 mb-2">Chatbot Type</label>
          <select id="botType" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
            <option>Lead Generator</option>
            <option>Consulting</option>
            <option>Customer Support</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="customKnowledge" className="block text-sm font-medium text-gray-700 mb-2">Custom Knowledge Base</label>
          <textarea id="customKnowledge" rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Enter custom knowledge for your chatbot..."></textarea>
        </div>
        <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors">Save Configuration</button>
      </div>
    </div>
  );
};

export default ChatbotPage;