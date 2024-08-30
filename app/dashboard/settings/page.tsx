import React from 'react';

const SettingsPage = () => {
  return (
    <div className="p-6 bg-light">
      <h1 className="text-3xl font-bold text-dark mb-6">Settings</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input type="email" id="email" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Change Password</label>
          <input type="password" id="password" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
        <h2 className="text-xl font-semibold mb-4 mt-8">Notification Preferences</h2>
        <div className="flex items-center mb-4">
          <input type="checkbox" id="emailNotifications" className="mr-2" />
          <label htmlFor="emailNotifications" className="text-sm text-gray-700">Receive email notifications</label>
        </div>
        <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors">Save Settings</button>
      </div>
    </div>
  );
};

export default SettingsPage;