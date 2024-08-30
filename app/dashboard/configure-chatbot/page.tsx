import React from 'react';

const ConfigureChatbotPage = () => {
  return (
    <div className="p-6 bg-light">
      <h1 className="text-3xl font-bold text-dark mb-6">Configure Your Chatbot</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-4">
          <label htmlFor="botName" className="block text-sm font-medium text-gray-700 mb-2">Chatbot Name</label>
          <input type="text" id="botName" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" placeholder="My Awesome Chatbot" />
        </div>
        <div className="mb-4">
          <label htmlFor="welcomeMessage" className="block text-sm font-medium text-gray-700 mb-2">Welcome Message</label>
          <input type="text" id="welcomeMessage" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Hello! How can I assist you today?" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Chatbot Capabilities</label>
          <div className="space-y-2">
            <div className="flex items-center">
              <input type="checkbox" id="leadGeneration" className="mr-2" />
              <label htmlFor="leadGeneration">Lead Generation</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="customerSupport" className="mr-2" />
              <label htmlFor="customerSupport">Customer Support</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="productRecommendations" className="mr-2" />
              <label htmlFor="productRecommendations">Product Recommendations</label>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Chatbot Appearance (Pro Plan)</label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
            <option>Classic</option>
            <option>Modern</option>
            <option>Minimalist</option>
            <option>Vibrant</option>
          </select>
        </div>
        <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors">Save Configuration</button>
      </div>
    </div>
  );
};

export default ConfigureChatbotPage;