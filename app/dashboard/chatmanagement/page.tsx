'use client'
import React, { useState } from 'react';

interface Message {
  sender: 'customer' | 'bot' | 'agent';
  text: string;
  timestamp: string;
}

interface Chat {
  id: number;
  customer: string;
  email: string;
  messages: Message[];
  date: string;
  status: 'Open' | 'Closed';
}

const ChatManagementPage: React.FC = () => {
  // Mock data for chats
  const [chats, setChats] = useState<Chat[]>([
    {
      id: 1,
      customer: 'John Doe',
      email: 'john@example.com',
      messages: [
        { sender: 'customer', text: 'Hello, I have a question about your service.', timestamp: '14:25' },
        { sender: 'bot', text: 'Hello! I\'d be happy to help. What would you like to know?', timestamp: '14:26' },
        { sender: 'customer', text: 'What are your pricing plans?', timestamp: '14:28' },
        { sender: 'bot', text: 'We offer three plans: Basic, Pro, and Enterprise. The Basic plan starts at $9.99/month, Pro at $29.99/month, and Enterprise has custom pricing. Would you like more details on any specific plan?', timestamp: '14:29' },
        { sender: 'customer', text: 'Thank you for your help!', timestamp: '14:30' },
      ],
      date: '2024-08-28',
      status: 'Closed',
    },
    {
      id: 2,
      customer: 'Jane Smith',
      email: 'jane@example.com',
      messages: [
        { sender: 'customer', text: 'Hi, I\'m interested in your service.', timestamp: '15:40' },
        { sender: 'bot', text: 'Hello Jane! Welcome to BotDrop AI. How can I assist you today?', timestamp: '15:41' },
        { sender: 'customer', text: 'Can you tell me more about your pricing?', timestamp: '15:45' },
      ],
      date: '2024-08-28',
      status: 'Open',
    },
  ]);

  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [newMessage, setNewMessage] = useState<string>('');

  const handleChatSelect = (chat: Chat) => {
    setSelectedChat(chat);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedChat && selectedChat.status === 'Open') {
      const updatedChats: Chat[] = chats.map(chat => {
        if (chat.id === selectedChat.id) {
          return {
            ...chat,
            messages: [...chat.messages, { sender: 'agent', text: newMessage, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]
          };
        }
        return chat;
      });
      setChats(updatedChats);
      const updatedSelectedChat = updatedChats.find(chat => chat.id === selectedChat.id);
      setSelectedChat(updatedSelectedChat || null);
      setNewMessage('');
    }
  };

  return (
    <div className="bg-light min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-dark mb-8">Chat Management</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-1 bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold mb-4">Recent Chats</h2>
            <ul>
              {chats.map((chat) => (
                <li 
                  key={chat.id}
                  className={`p-3 mb-2 rounded-md cursor-pointer ${
                    selectedChat && selectedChat.id === chat.id
                      ? 'bg-primary text-white'
                      : 'hover:bg-gray-100'
                  }`}
                  onClick={() => handleChatSelect(chat)}
                >
                  <p className="font-semibold">{chat.customer}</p>
                  <p className="text-sm truncate">{chat.messages[chat.messages.length - 1].text}</p>
                  <div className="flex justify-between text-xs mt-1">
                    <span>{chat.date}</span>
                    <span className={`px-2 py-1 rounded-full ${
                      chat.status === 'Open' ? 'bg-secondary text-white' : 'bg-gray-200'
                    }`}>
                      {chat.status}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-2 bg-white rounded-lg shadow-md p-4">
            {selectedChat ? (
              <div className="flex flex-col h-full">
                <h2 className="text-xl font-semibold mb-4">Chat with {selectedChat.customer}</h2>
                <div className="flex-grow bg-gray-100 rounded-md p-4 overflow-y-auto mb-4">
                  {selectedChat.messages.map((message, index) => (
                    <div key={index} className={`mb-2 ${message.sender === 'customer' ? 'text-right' : ''}`}>
                      <div className={`inline-block p-2 rounded-lg ${
                        message.sender === 'customer' ? 'bg-primary text-white' : 'bg-white'
                      }`}>
                        <p>{message.text}</p>
                        <p className="text-xs mt-1 opacity-75">{message.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex">
                  <input 
                    type="text" 
                    value={newMessage}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewMessage(e.target.value)}
                    placeholder="Type your message..." 
                    className="flex-grow border rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    disabled={selectedChat.status !== 'Open'}
                  />
                  <button 
                    onClick={handleSendMessage}
                    className="bg-primary text-white px-4 py-2 rounded-r-md hover:bg-opacity-90 transition-colors"
                    disabled={selectedChat.status !== 'Open'}
                  >
                    Send
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-center text-gray-500">Select a chat to view details</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatManagementPage;