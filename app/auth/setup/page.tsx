import { Header } from "@/components/header"
import { OAuthSetupGuide } from "@/components/auth/oauth-setup-guide"

export default function AuthSetupPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">OAuth Setup Guide</h1>
          <p className="text-gray-600">Configure Google OAuth for TrueEstate authentication</p>
        </div>
        <OAuthSetupGuide />
      </div>
    </div>
  )
}
