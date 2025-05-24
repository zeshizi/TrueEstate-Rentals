import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-6">
            <strong>Last updated:</strong> {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>
            <p className="text-gray-600 mb-4">
              We collect information you provide directly to us, such as when you create an account, use our services,
              or contact us for support.
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Account information (name, email, company details)</li>
              <li>Search queries and usage patterns</li>
              <li>Communication preferences</li>
              <li>Payment information (processed securely by third parties)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. How We Use Your Information</h2>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Provide and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>Send technical notices and support messages</li>
              <li>Respond to your comments and questions</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Data Security</h2>
            <p className="text-gray-600 mb-4">
              We implement appropriate security measures to protect your personal information:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>AES-256-GCM encryption for data storage</li>
              <li>TLS 1.3 encryption for data transmission</li>
              <li>Regular security audits and monitoring</li>
              <li>Access controls and authentication</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Contact Us</h2>
            <p className="text-gray-600">If you have any questions about this Privacy Policy, please contact us at:</p>
            <div className="bg-gray-50 p-4 rounded-lg mt-4">
              <p className="text-gray-600">
                <strong>Email:</strong> privacy@trueestate.com
                <br />
                <strong>Address:</strong> 123 Real Estate Ave, Suite 100, New York, NY 10001
              </p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
