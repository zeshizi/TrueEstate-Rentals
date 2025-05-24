import { Header } from "@/components/header"
import { AuthTest } from "@/components/auth/auth-test"

export default function AuthTestPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Authentication Testing</h1>
          <p className="text-gray-600">Test and verify all authentication features are working correctly</p>
        </div>
        <AuthTest />
      </div>
    </div>
  )
}
