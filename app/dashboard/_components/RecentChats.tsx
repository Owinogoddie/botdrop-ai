const recentChats = [
    { id: 1, name: 'John Doe', message: 'I need help with my account', time: '5 min ago' },
    { id: 2, name: 'Jane Smith', message: 'How do I integrate the chatbot?', time: '15 min ago' },
    { id: 3, name: 'Bob Johnson', message: 'Can you explain the pricing?', time: '1 hour ago' },
  ]
  
  export default function RecentChats() {
    return (
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Chats</h3>
        </div>
        <ul className="divide-y divide-gray-200">
          {recentChats.map((chat) => (
            <li key={chat.id} className="px-4 py-4 sm:px-6">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-gray-500">
                    <span className="text-sm font-medium leading-none text-white">{chat.name.split(' ').map(n => n[0]).join('')}</span>
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{chat.name}</p>
                  <p className="text-sm text-gray-500 truncate">{chat.message}</p>
                </div>
                <div className="flex-shrink-0 text-sm text-gray-500">{chat.time}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }