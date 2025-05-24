"use client"

import { useState } from "react"
import { useRouter } from "next/router"
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid"
import { Tab } from "@headlessui/react"
import { Listbox } from "@headlessui/react"

const propertyTypes = [
  { id: 1, name: "House", value: "house" },
  { id: 2, name: "Apartment", value: "apartment" },
  { id: 3, name: "Condo", value: "condo" },
  { id: 4, name: "Townhouse", value: "townhouse" },
]

const bedroomsOptions = [
  { id: 0, name: "Any", value: 0 },
  { id: 1, name: "1", value: 1 },
  { id: 2, name: "2", value: 2 },
  { id: 3, name: "3", value: 3 },
  { id: 4, name: "4+", value: 4 },
]

const bathroomsOptions = [
  { id: 0, name: "Any", value: 0 },
  { id: 1, name: "1", value: 1 },
  { id: 2, name: "2", value: 2 },
  { id: 3, name: "3", value: 3 },
  { id: 4, name: "4+", value: 4 },
]

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ")
}

export function ZillowInspiredHero() {
  const router = useRouter()
  const [searchLocation, setSearchLocation] = useState("")
  const [activeTab, setActiveTab] = useState("house")
  const [priceRange, setPriceRange] = useState([200000, 1500000])
  const [bedrooms, setBedrooms] = useState(0)
  const [bathrooms, setBathrooms] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = async () => {
    setIsLoading(true)

    // Log the actual values instead of "Object"
    console.log("🔍 Search initiated with filters:", {
      location: searchLocation,
      propertyType: activeTab,
      priceMin: priceRange[0],
      priceMax: priceRange[1],
      bedrooms: bedrooms,
      bathrooms: bathrooms,
    })

    try {
      const searchParams = new URLSearchParams({
        location: searchLocation,
        type: activeTab,
        priceMin: priceRange[0].toString(),
        priceMax: priceRange[1].toString(),
        bedrooms: bedrooms.toString(),
        bathrooms: bathrooms.toString(),
      })

      console.log("📡 API call:", `/api/search?${searchParams.toString()}`)

      const response = await fetch(`/api/search?${searchParams.toString()}`)
      const data = await response.json()

      console.log("✅ Search results:", data)

      // Navigate to search results
      router.push(`/search?${searchParams.toString()}`)
    } catch (error) {
      console.error("❌ Search error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative bg-gray-50 overflow-hidden">
      <div className="relative pt-6 pb-16 sm:pb-24">
        <main className="mt-8 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
          <div className="sm:text-center lg:text-left">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block xl:inline">Find your dream</span>{" "}
              <span className="block text-indigo-600 xl:inline">home</span>
            </h1>
            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
              Use our advanced search tool to find the perfect property for you. We have listings all over the country,
              so you're sure to find something you love.
            </p>
            <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
              <div className="rounded-md shadow">
                <a
                  href="#"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                >
                  Get started
                </a>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3">
                <a
                  href="#"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
                >
                  Live demo
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
          src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
          alt=""
        />
      </div>

      {/* Search Section */}
      <div className="bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                Find Your Next Home
              </h2>
            </div>
          </div>
          <div className="mt-4">
            {/* Search Input */}
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="text"
                name="search"
                id="search"
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                placeholder="Enter an address, neighborhood, city, or ZIP code"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
              />
            </div>
          </div>

          {/* Filters */}
          <div className="mt-4 grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-4 md:grid-cols-4">
            {/* Property Type */}
            <div>
              <Tab.Group>
                <Tab.List className="flex space-x-1 rounded-xl bg-blue-100 p-1">
                  {propertyTypes.map((type) => (
                    <Tab
                      key={type.id}
                      className={({ selected }) =>
                        classNames(
                          "w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-xl",
                          "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                          selected ? "bg-white shadow" : "text-blue-100 hover:bg-white/[0.12] hover:text-white",
                        )
                      }
                      onClick={() => setActiveTab(type.value)}
                    >
                      {type.name}
                    </Tab>
                  ))}
                </Tab.List>
              </Tab.Group>
            </div>

            {/* Price Range */}
            <div>
              <label htmlFor="price-range" className="block text-sm font-medium text-gray-700">
                Price Range (Millions)
              </label>
              <input
                type="range"
                id="price-range-min"
                name="price-range-min"
                min="0"
                max="1500000"
                step="10000"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([Number.parseInt(e.target.value), priceRange[1]])}
                className="mt-1 w-full"
              />
              <input
                type="range"
                id="price-range-max"
                name="price-range-max"
                min="0"
                max="1500000"
                step="10000"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
                className="mt-1 w-full"
              />
              <div className="flex justify-between text-sm text-gray-600 mt-1">
                <span>${(priceRange[0] / 1000000).toFixed(1)}M</span>
                <span>${(priceRange[1] / 1000000).toFixed(1)}M</span>
              </div>
            </div>

            {/* Bedrooms */}
            <div>
              <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700">
                Bedrooms
              </label>
              <Listbox value={bedrooms} onChange={setBedrooms}>
                <div className="relative mt-1">
                  <Listbox.Button className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm py-2 pl-3 pr-10 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    <span className="block truncate">
                      {bedroomsOptions.find((option) => option.value === bedrooms)?.name || "Any"}
                    </span>
                    <span className="absolute inset-y-0 right-0 flex items-center pointer-events-none">
                      {/* Heroicon: Chevron-down */}
                      <svg
                        className="h-5 w-5 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </Listbox.Button>

                  <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                    {bedroomsOptions.map((option) => (
                      <Listbox.Option
                        key={option.id}
                        className={({ active }) =>
                          classNames(
                            active ? "text-white bg-indigo-600" : "text-gray-900",
                            "cursor-default select-none relative py-2 pl-3 pr-9",
                          )
                        }
                        value={option.value}
                      >
                        {({ selected, active }) => (
                          <>
                            <span className={classNames(selected ? "font-semibold" : "font-normal", "block truncate")}>
                              {option.name}
                            </span>

                            {selected ? (
                              <span
                                className={classNames(
                                  active ? "text-white" : "text-indigo-600",
                                  "absolute inset-y-0 right-0 flex items-center pr-4",
                                )}
                              >
                                {/* Heroicon: Check */}
                                <svg
                                  className="h-5 w-5"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  aria-hidden="true"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </div>
              </Listbox>
            </div>

            {/* Bathrooms */}
            <div>
              <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700">
                Bathrooms
              </label>
              <Listbox value={bathrooms} onChange={setBathrooms}>
                <div className="relative mt-1">
                  <Listbox.Button className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm py-2 pl-3 pr-10 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    <span className="block truncate">
                      {bathroomsOptions.find((option) => option.value === bathrooms)?.name || "Any"}
                    </span>
                    <span className="absolute inset-y-0 right-0 flex items-center pointer-events-none">
                      {/* Heroicon: Chevron-down */}
                      <svg
                        className="h-5 w-5 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </Listbox.Button>

                  <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                    {bathroomsOptions.map((option) => (
                      <Listbox.Option
                        key={option.id}
                        className={({ active }) =>
                          classNames(
                            active ? "text-white bg-indigo-600" : "text-gray-900",
                            "cursor-default select-none relative py-2 pl-3 pr-9",
                          )
                        }
                        value={option.value}
                      >
                        {({ selected, active }) => (
                          <>
                            <span className={classNames(selected ? "font-semibold" : "font-normal", "block truncate")}>
                              {option.name}
                            </span>

                            {selected ? (
                              <span
                                className={classNames(
                                  active ? "text-white" : "text-indigo-600",
                                  "absolute inset-y-0 right-0 flex items-center pr-4",
                                )}
                              >
                                {/* Heroicon: Check */}
                                <svg
                                  className="h-5 w-5"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  aria-hidden="true"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </div>
              </Listbox>
            </div>
          </div>

          {/* Search Button */}
          <div className="mt-6">
            <button
              onClick={handleSearch}
              className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
              disabled={isLoading}
            >
              {isLoading ? "Searching..." : "Search"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ZillowInspiredHero
