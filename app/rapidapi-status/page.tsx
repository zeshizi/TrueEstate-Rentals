import { RapidAPIStatusDashboard } from "@/components/rapidapi-status-dashboard"

export default function RapidAPIStatusPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">⚡ RapidAPI Status Dashboard</h1>
        <p className="text-gray-600">Monitor your People Data Labs and Global Company Data API integrations</p>
      </div>
      <RapidAPIStatusDashboard />
    </div>
  )
}
