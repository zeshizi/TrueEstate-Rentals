import { ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800">Welcome to Our Real Estate Platform</h1>
        <p className="mt-2 text-lg text-gray-600">Find your dream home with ease.</p>
      </header>

      <main className="container mx-auto px-4">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Featured Properties</h2>
          {/* Placeholder for featured properties */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="text-xl font-semibold text-gray-700">Property 1</h3>
              <p className="text-gray-600">Description of property 1.</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="text-xl font-semibold text-gray-700">Property 2</h3>
              <p className="text-gray-600">Description of property 2.</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="text-xl font-semibold text-gray-700">Property 3</h3>
              <p className="text-gray-600">Description of property 3.</p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Search for Properties</h2>
          {/* Placeholder for search form */}
          <form className="flex items-center space-x-4">
            <input type="text" placeholder="Enter location..." className="px-4 py-2 border rounded-md w-full" />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Search</button>
          </form>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Contact Us</h2>
          {/* Placeholder for contact information */}
          <p className="text-gray-600">Contact us for any inquiries or assistance.</p>
        </section>
      </main>

      <footer className="text-center mt-8">
        <p className="text-gray-500">&copy; 2023 Real Estate Platform. All rights reserved.</p>
      </footer>

      <div className="fixed bottom-0 left-0 w-full flex justify-center p-4">
        <div className="text-center bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-md">
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-200 border-2 border-blue-600 hover:border-blue-700"
          >
            View Properties
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}

import { Button } from "@/components/ui/button"
