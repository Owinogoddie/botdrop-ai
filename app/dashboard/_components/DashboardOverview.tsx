import { FiUsers, FiMessageCircle, FiBarChart } from 'react-icons/fi'

const stats = [
  { name: 'Total Leads', stat: '1,234', icon: FiUsers, color: 'bg-orange-500' },
  { name: 'Chats Today', stat: '56', icon: FiMessageCircle, color: 'bg-green-500' },
  { name: 'Conversion Rate', stat: '12%', icon: FiBarChart, color: 'bg-yellow-500' },
]

export default function DashboardOverview() {
  return (
    <div>
      <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Overview</h3>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((item) => (
          <div key={item.name} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className={`flex-shrink-0 ${item.color} rounded-md p-3`}>
                  <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{item.name}</dt>
                    <dd className="text-lg font-semibold text-gray-900">{item.stat}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}