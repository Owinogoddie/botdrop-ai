import React from 'react';

const LeadsPage = () => {
  const leads = [
    { id: 1, email: 'john@example.com', date: '2024-08-28' },
    { id: 2, email: 'jane@example.com', date: '2024-08-27' },
    { id: 11, email: 'john@example.com', date: '2024-08-28' },
    { id: 21, email: 'jane@example.com', date: '2024-08-27' },
    { id: 12, email: 'john@example.com', date: '2024-08-28' },
    { id: 22, email: 'jane@example.com', date: '2024-08-27' },
    { id: 14, email: 'john@example.com', date: '2024-08-28' },
    { id: 23, email: 'jane@example.com', date: '2024-08-27' },
    // Add more mock data as needed
  ];

  return (
    <div className="p-6 bg-light">
      <h1 className="text-3xl font-bold text-dark mb-6">Leads</h1>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {leads.map((lead) => (
              <tr key={lead.id}>
                <td className="px-6 py-4 whitespace-nowrap">{lead.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{lead.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{lead.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeadsPage;