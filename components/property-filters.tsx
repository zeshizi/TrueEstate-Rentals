"use client"

import type React from "react"
import { Label } from "@/components/ui/label"

interface Filters {
  minValue: number
  maxValue: number
}

interface PropertyFiltersProps {
  filters: Filters
  onFiltersChange: (filters: Filters) => void
}

export const PropertyFilters: React.FC<PropertyFiltersProps> = ({ filters, onFiltersChange }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>

      {/* Price Range */}
      <div>
        <Label className="text-sm font-medium mb-2 block">Price Range</Label>
        <div className="px-3 py-2">
          {/* Dual Range Slider */}
          <div className="relative mb-4">
            <input
              type="range"
              min="0"
              max="10000000"
              step="100000"
              value={filters.minValue}
              onChange={(e) => {
                const newMin = Number(e.target.value)
                const newMax = Math.max(newMin, filters.maxValue)
                onFiltersChange({ ...filters, minValue: newMin, maxValue: newMax })
              }}
              className="absolute w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer wealth-range-slider"
              style={{ background: "transparent" }}
            />
            <input
              type="range"
              min="0"
              max="10000000"
              step="100000"
              value={filters.maxValue}
              onChange={(e) => {
                const newMax = Number(e.target.value)
                const newMin = Math.min(filters.minValue, newMax)
                onFiltersChange({ ...filters, minValue: newMin, maxValue: newMax })
              }}
              className="absolute w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer wealth-range-slider"
              style={{ background: "transparent" }}
            />
            <div className="relative h-3 bg-gray-200 rounded-lg">
              <div
                className="absolute h-3 bg-blue-600 rounded-lg"
                style={{
                  left: `${(filters.minValue / 10000000) * 100}%`,
                  width: `${((filters.maxValue - filters.minValue) / 10000000) * 100}%`,
                }}
              />
            </div>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span className="font-semibold text-blue-600">
              $
              {filters.minValue >= 1000000
                ? `${(filters.minValue / 1000000).toFixed(1)}M`
                : `${Math.round(filters.minValue / 1000)}K`}
            </span>
            <span className="font-semibold text-blue-600">
              $
              {filters.maxValue >= 1000000
                ? `${(filters.maxValue / 1000000).toFixed(1)}M`
                : `${Math.round(filters.maxValue / 1000)}K`}
            </span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .wealth-range-slider::-webkit-slider-thumb {
          appearance: none;
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: #2563eb;
          cursor: pointer;
          border: 3px solid #ffffff;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
          z-index: 10;
        }
        
        .wealth-range-slider::-moz-range-thumb {
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: #2563eb;
          cursor: pointer;
          border: 3px solid #ffffff;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
        }

        /* Enhanced mobile touch targets */
        @media (max-width: 640px) {
          .wealth-range-slider::-webkit-slider-thumb {
            height: 28px;
            width: 28px;
            border: 4px solid #ffffff;
          }
          
          .wealth-range-slider::-moz-range-thumb {
            height: 28px;
            width: 28px;
            border: 4px solid #ffffff;
          }
        }
      `}</style>
    </div>
  )
}
