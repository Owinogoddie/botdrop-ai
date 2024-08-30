"use client";

import React, { useState } from 'react';

const ChatbotSettingsPage: React.FC = () => {
  const [selectedInterface, setSelectedInterface] = useState<number | null>(null);
  const [primaryColor, setPrimaryColor] = useState('#4F46E5');
  const [secondaryColor, setSecondaryColor] = useState('#10B981');

  const chatInterfaces = [
    { id: 1, name: 'Classic', background: 'bg-orange-100', primary: 'bg-orange-500', secondary: 'bg-orange-200' },
    { id: 2, name: 'Modern', background: 'bg-green-100', primary: 'bg-green-500', secondary: 'bg-green-200' },
    { id: 3, name: 'Minimalist', background: 'bg-gray-100', primary: 'bg-gray-500', secondary: 'bg-gray-200' },
    { id: 4, name: 'Vibrant', background: 'bg-pink-100', primary: 'bg-pink-500', secondary: 'bg-yellow-200' },
    { id: 5, name: 'Dark Mode', background: 'bg-gray-800', primary: 'bg-gray-200', secondary: 'bg-gray-600' },
  ];

  const mockMessages = [
    { sender: 'bot', text: 'Hello! How can I assist you today?' },
    { sender: 'user', text: 'I have a question about your services.' },
    { sender: 'bot', text: 'Of course! I\'d be happy to help. What would you like to know?' },
    { sender: 'user', text: 'Can you tell me about your pricing plans?' },
    { sender: 'bot', text: 'Certainly! We offer three main pricing tiers: Basic, Pro, and Enterprise. Would you like more details on each?' },
  ];

  const ChatInterface: React.FC<{ background: string; primary: string; secondary: string }> = ({ background, primary, secondary }) => (
    <div className={`w-80 h-96 ${background} p-4 rounded-lg shadow-lg`}>
      <div className="bg-white bg-opacity-90 rounded-lg h-full flex flex-col">
        <div className="flex-grow overflow-y-auto p-3">
          {mockMessages.map((message, index) => (
            <div key={index} className={`mb-2 ${message.sender === 'user' ? 'text-right' : ''}`}>
              <span className={`inline-block p-2 rounded-lg ${
                message.sender === 'user' 
                  ? `${primary} text-white` 
                  : `${secondary} text-gray-800`
              }`}>
                {message.text}
              </span>
            </div>
          ))}
        </div>
        <div className="p-3">
          <input 
            type="text" 
            placeholder="Type your message..." 
            className="w-full p-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Chatbot Settings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Choose Chat Interface</h2>
          <div className="grid grid-cols-2 gap-4">
            {chatInterfaces.map((chat) => (
              <button
                key={chat.id}
                className={`p-4 rounded-lg ${chat.background} text-gray-800 font-semibold ${
                  selectedInterface === chat.id ? 'ring-4 ring-orange-500' : ''
                }`}
                onClick={() => setSelectedInterface(chat.id)}
              >
                {chat.name}
              </button>
            ))}
          </div>
          <h2 className="text-2xl font-semibold mt-8 mb-4">Customize Colors</h2>
          <div className="space-y-4">
            <div>
              <label className="block mb-2">Primary Color</label>
              <input 
                type="color" 
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="w-full h-10 rounded"
              />
            </div>
            <div>
              <label className="block mb-2">Secondary Color</label>
              <input 
                type="color" 
                value={secondaryColor}
                onChange={(e) => setSecondaryColor(e.target.value)}
                className="w-full h-10 rounded"
              />
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Preview</h2>
          {selectedInterface && (
            <ChatInterface 
              background={chatInterfaces.find(i => i.id === selectedInterface)!.background}
              primary={chatInterfaces.find(i => i.id === selectedInterface)!.primary}
              secondary={chatInterfaces.find(i => i.id === selectedInterface)!.secondary}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatbotSettingsPage;