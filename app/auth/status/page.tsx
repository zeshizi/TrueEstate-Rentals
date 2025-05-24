import { Header } from "@/components/header"
import { AuthStatusEnhanced } from "@/components/auth/auth-status-enhanced"

export default function AuthStatusPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Authentication Status</h1>
          <p className="text-gray-600">Monitor and test your authentication configuration</p>
        </div>
        <AuthStatusEnhanced />
      </div>
    </div>
  )
}
