import { Header } from "@/components/header"
import { DeploymentVerification } from "@/components/auth/deployment-verification"

export default function VerifyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Deployment Verification</h1>
          <p className="text-gray-600">Verify that all systems are working correctly after environment setup</p>
        </div>
        <DeploymentVerification />
      </div>
    </div>
  )
}
