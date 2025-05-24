import { Header } from "@/components/header"
import { AuthSuccess } from "@/components/auth/auth-success"

export default function AuthSuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AuthSuccess />
      </div>
    </div>
  )
}
