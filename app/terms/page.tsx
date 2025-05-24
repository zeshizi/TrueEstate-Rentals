import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-6">
            <strong>Last updated:</strong> {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-600">
              By accessing and using TrueEstate, you accept and agree to be bound by the terms and provision of this
              agreement.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Use License</h2>
            <p className="text-gray-600 mb-4">
              Permission is granted to temporarily access TrueEstate for personal, non-commercial transitory viewing
              only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Modify or copy the materials</li>
              <li>Use the materials for commercial purposes or public display</li>
              <li>Attempt to reverse engineer any software</li>
              <li>Remove any copyright or proprietary notations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Data Usage</h2>
            <p className="text-gray-600 mb-4">TrueEstate provides access to public records and data. Users agree to:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Use data responsibly and ethically</li>
              <li>Comply with all applicable laws and regulations</li>
              <li>Not use data for harassment or illegal purposes</li>
              <li>Respect privacy rights of individuals</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Account Responsibilities</h2>
            <p className="text-gray-600 mb-4">Users are responsible for:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Maintaining account security</li>
              <li>All activities under their account</li>
              <li>Providing accurate information</li>
              <li>Notifying us of unauthorized access</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Disclaimer</h2>
            <p className="text-gray-600">
              The materials on TrueEstate are provided on an 'as is' basis. TrueEstate makes no warranties, expressed or
              implied, and hereby disclaims all other warranties including, without limitation, implied warranties or
              conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual
              property or other violation of rights.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Limitations</h2>
            <p className="text-gray-600">
              In no event shall TrueEstate or its suppliers be liable for any damages (including, without limitation,
              damages for loss of data or profit, or due to business interruption) arising out of the use or inability
              to use TrueEstate, even if TrueEstate or an authorized representative has been notified orally or in
              writing of the possibility of such damage.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Contact Information</h2>
            <p className="text-gray-600">Questions about the Terms of Service should be sent to us at:</p>
            <div className="bg-gray-50 p-4 rounded-lg mt-4">
              <p className="text-gray-600">
                <strong>Email:</strong> legal@trueestate.com
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
