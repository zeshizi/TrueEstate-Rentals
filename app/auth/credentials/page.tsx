import { Header } from "@/components/header"
import { OAuthCredentialsSetup } from "@/components/auth/oauth-credentials-setup"

export default function CredentialsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Google OAuth Setup</h1>
          <p className="text-gray-600">Configure your Google OAuth credentials for TrueEstate authentication</p>
        </div>
        <OAuthCredentialsSetup />
      </div>
    </div>
  )
}
