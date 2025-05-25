import { Star } from "lucide-react"

export default function SearchPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-5">Search Results</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Example Property Card - Repeat for each search result */}
        <div className="border rounded-lg shadow-md p-4">
          <img
            src="https://via.placeholder.com/400x200"
            alt="Property"
            className="w-full h-48 object-cover rounded-md mb-3"
          />
          <h2 className="text-xl font-semibold mb-2">Property Title</h2>
          <p className="text-gray-700 mb-2">Address: 123 Main St, Anytown, USA</p>
          <p className="text-gray-700 mb-2">Price: $1,000,000</p>
          <p className="text-gray-700 mb-2">Owner: John Doe</p>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span>4.7 (23 reviews)</span>
          </div>
        </div>
        {/* End Example Property Card */}

        {/* Example Property Card - Repeat for each search result */}
        <div className="border rounded-lg shadow-md p-4">
          <img
            src="https://via.placeholder.com/400x200"
            alt="Property"
            className="w-full h-48 object-cover rounded-md mb-3"
          />
          <h2 className="text-xl font-semibold mb-2">Another Property</h2>
          <p className="text-gray-700 mb-2">Address: 456 Oak Ave, Anytown, USA</p>
          <p className="text-gray-700 mb-2">Price: $750,000</p>
          <p className="text-gray-700 mb-2">Owner: Jane Smith</p>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span>4.7 (23 reviews)</span>
          </div>
        </div>
        {/* End Example Property Card */}
      </div>
    </div>
  )
}
