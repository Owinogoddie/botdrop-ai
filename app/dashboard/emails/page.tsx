import React from 'react';

const EmailsPage = () => {
  const emails = [
    { id: 1, email: 'john@example.com', selected: false },
    { id: 2, email: 'jane@example.com', selected: false },
    // Add more mock data as needed
  ];

  return (
    <div className="p-6 bg-light">
      <h1 className="text-3xl font-bold text-dark mb-6">Email Management</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Your Email List</h2>
          <div className="max-h-64 overflow-y-auto">
            {emails.map((email) => (
              <div key={email.id} className="flex items-center mb-2">
                <input type="checkbox" id={`email-${email.id}`} className="mr-2" />
                <label htmlFor={`email-${email.id}`}>{email.email}</label>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Compose Email</h2>
          <textarea className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" rows={6} placeholder="Compose your email here..."></textarea>
        </div>
        <div className="flex justify-between">
          <button className="bg-secondary text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors">Select All</button>
          <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors">Send Email</button>
        </div>
      </div>
    </div>
  );
};

export default EmailsPage;