import DashboardOverview from "./_components/DashboardOverview";
import LeadGeneration from "./_components/LeadGeneration";
import RecentChats from "./_components/RecentChats";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      <DashboardOverview />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <RecentChats />
        <LeadGeneration />
      </div>
    </div>
  )
}