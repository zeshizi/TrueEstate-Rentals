import { AuthStatusVerification } from "@/components/auth/auth-status-verification"

export default function AuthStatusCheckPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Authentication Status</h1>
          <p className="text-gray-600 mt-2">
            Verify that all authentication environment variables are properly configured.
          </p>
        </div>

        <AuthStatusVerification />
      </div>
    </div>
  )
}
