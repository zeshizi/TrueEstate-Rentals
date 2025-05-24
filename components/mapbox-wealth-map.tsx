"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Layers, Navigation, Eye, Crown, Star, ChevronDown, ChevronUp, Settings } from "lucide-react"

interface Property {
  id: string
  lat: number
  lng: number
  address: string
  value: number
  ownerWealth: number
  ownerName: string
  confidence: "High" | "Medium" | "Low"
  propertyType: string
  featured?: boolean
  state: string
  city: string
}

interface MapboxWealthMapProps {
  properties: Property[]
  onPropertySelect: (property: Property | null) => void
  filters: any
}

// Comprehensive property data for all 50 states + DC
const ALL_STATE_PROPERTIES: Property[] = [
  // Alabama
  {
    id: "al_1",
    lat: 33.5186,
    lng: -86.8104,
    address: "123 Historic Mansion Drive",
    city: "Birmingham",
    state: "AL",
    value: 2800000,
    ownerWealth: 45000000,
    ownerName: "Southern Heritage Trust",
    confidence: "High",
    propertyType: "mansion",
    featured: false,
  },
  {
    id: "al_2",
    lat: 32.3617,
    lng: -86.2792,
    address: "456 Capitol Hill Estate",
    city: "Montgomery",
    state: "AL",
    value: 1900000,
    ownerWealth: 35000000,
    ownerName: "Alabama Holdings LLC",
    confidence: "Medium",
    propertyType: "estate",
    featured: false,
  },

  // Alaska
  {
    id: "ak_1",
    lat: 61.2181,
    lng: -149.9003,
    address: "456 Wilderness Lodge Road",
    city: "Anchorage",
    state: "AK",
    value: 4500000,
    ownerWealth: 85000000,
    ownerName: "Arctic Holdings Corp",
    confidence: "High",
    propertyType: "lodge",
    featured: true,
  },
  {
    id: "ak_2",
    lat: 64.8378,
    lng: -147.7164,
    address: "789 Northern Lights Estate",
    city: "Fairbanks",
    state: "AK",
    value: 3200000,
    ownerWealth: 65000000,
    ownerName: "Midnight Sun Holdings",
    confidence: "Medium",
    propertyType: "estate",
    featured: false,
  },

  // Arizona
  {
    id: "az_1",
    lat: 33.4942,
    lng: -111.9261,
    address: "789 Desert Mountain Estate",
    city: "Scottsdale",
    state: "AZ",
    value: 7200000,
    ownerWealth: 125000000,
    ownerName: "Desert Luxury Holdings",
    confidence: "High",
    propertyType: "estate",
    featured: true,
  },
  {
    id: "az_2",
    lat: 33.4484,
    lng: -112.074,
    address: "456 Phoenix Desert Ridge",
    city: "Phoenix",
    state: "AZ",
    value: 4800000,
    ownerWealth: 95000000,
    ownerName: "Southwest Holdings",
    confidence: "High",
    propertyType: "mansion",
    featured: false,
  },

  // Arkansas
  {
    id: "ar_1",
    lat: 36.3729,
    lng: -94.2088,
    address: "321 Ozark Mountain Road",
    city: "Bentonville",
    state: "AR",
    value: 4200000,
    ownerWealth: 95000000,
    ownerName: "Retail Dynasty Holdings",
    confidence: "High",
    propertyType: "estate",
    featured: false,
  },

  // California
  {
    id: "ca_1",
    lat: 34.0736,
    lng: -118.4004,
    address: "456 Beverly Hills Drive",
    city: "Beverly Hills",
    state: "CA",
    value: 25000000,
    ownerWealth: 450000000,
    ownerName: "Entertainment Mogul Inc",
    confidence: "High",
    propertyType: "mansion",
    featured: true,
  },
  {
    id: "ca_2",
    lat: 34.0259,
    lng: -118.7798,
    address: "789 Pacific Coast Highway",
    city: "Malibu",
    state: "CA",
    value: 18500000,
    ownerWealth: 320000000,
    ownerName: "Celebrity Holdings Trust",
    confidence: "High",
    propertyType: "estate",
    featured: true,
  },
  {
    id: "ca_3",
    lat: 37.4419,
    lng: -122.143,
    address: "1234 University Ave",
    city: "Palo Alto",
    state: "CA",
    value: 22000000,
    ownerWealth: 15000000000,
    ownerName: "Tech Billionaire Holdings",
    confidence: "High",
    propertyType: "estate",
    featured: true,
  },
  {
    id: "ca_4",
    lat: 38.2975,
    lng: -122.286,
    address: "567 Napa Valley Vineyard",
    city: "Napa",
    state: "CA",
    value: 18500000,
    ownerWealth: 380000000,
    ownerName: "Wine Dynasty Holdings",
    confidence: "High",
    propertyType: "vineyard",
    featured: false,
  },
  {
    id: "ca_5",
    lat: 37.7749,
    lng: -122.4194,
    address: "890 Pacific Heights",
    city: "San Francisco",
    state: "CA",
    value: 16800000,
    ownerWealth: 850000000,
    ownerName: "Tech Venture Capital",
    confidence: "High",
    propertyType: "mansion",
    featured: false,
  },

  // Colorado
  {
    id: "co_1",
    lat: 39.1911,
    lng: -106.8175,
    address: "654 Aspen Mountain Road",
    city: "Aspen",
    state: "CO",
    value: 15200000,
    ownerWealth: 280000000,
    ownerName: "Alpine Holdings Group",
    confidence: "High",
    propertyType: "lodge",
    featured: true,
  },
  {
    id: "co_2",
    lat: 39.6403,
    lng: -106.3742,
    address: "321 Vail Ski Resort",
    city: "Vail",
    state: "CO",
    value: 12800000,
    ownerWealth: 485000000,
    ownerName: "Mountain Resort Holdings",
    confidence: "High",
    propertyType: "lodge",
    featured: false,
  },

  // Connecticut
  {
    id: "ct_1",
    lat: 41.0534,
    lng: -73.5387,
    address: "987 Greenwich Gold Coast",
    city: "Greenwich",
    state: "CT",
    value: 12500000,
    ownerWealth: 650000000,
    ownerName: "Wall Street Titan",
    confidence: "High",
    propertyType: "estate",
    featured: true,
  },

  // Delaware
  {
    id: "de_1",
    lat: 39.7391,
    lng: -75.5398,
    address: "234 Wilmington Corporate Plaza",
    city: "Wilmington",
    state: "DE",
    value: 4200000,
    ownerWealth: 180000000,
    ownerName: "Chemical Dynasty Trust",
    confidence: "High",
    propertyType: "penthouse",
    featured: false,
  },

  // Florida
  {
    id: "fl_1",
    lat: 25.7907,
    lng: -80.13,
    address: "567 Miami Beach Ocean Drive",
    city: "Miami Beach",
    state: "FL",
    value: 9800000,
    ownerWealth: 340000000,
    ownerName: "International Real Estate Mogul",
    confidence: "High",
    propertyType: "penthouse",
    featured: false,
  },
  {
    id: "fl_2",
    lat: 26.142,
    lng: -81.7948,
    address: "234 Naples Luxury Estate",
    city: "Naples",
    state: "FL",
    value: 7800000,
    ownerWealth: 285000000,
    ownerName: "Retirement Luxury Holdings",
    confidence: "High",
    propertyType: "estate",
    featured: false,
  },
  {
    id: "fl_3",
    lat: 24.5551,
    lng: -81.78,
    address: "890 Key West Oceanfront",
    city: "Key West",
    state: "FL",
    value: 6200000,
    ownerWealth: 185000000,
    ownerName: "Caribbean Holdings LLC",
    confidence: "Medium",
    propertyType: "villa",
    featured: false,
  },

  // Georgia
  {
    id: "ga_1",
    lat: 33.8688,
    lng: -84.3717,
    address: "890 Atlanta Buckhead Estate",
    city: "Atlanta",
    state: "GA",
    value: 6800000,
    ownerWealth: 195000000,
    ownerName: "Southern Capital Group",
    confidence: "High",
    propertyType: "mansion",
    featured: false,
  },
  {
    id: "ga_2",
    lat: 32.0835,
    lng: -81.0998,
    address: "567 Savannah Historic Estate",
    city: "Savannah",
    state: "GA",
    value: 4200000,
    ownerWealth: 165000000,
    ownerName: "Southern Heritage Holdings",
    confidence: "High",
    propertyType: "mansion",
    featured: false,
  },

  // Hawaii
  {
    id: "hi_1",
    lat: 20.6947,
    lng: -156.4444,
    address: "123 Maui Oceanfront Estate",
    city: "Wailea",
    state: "HI",
    value: 22000000,
    ownerWealth: 580000000,
    ownerName: "Pacific Paradise Holdings",
    confidence: "High",
    propertyType: "estate",
    featured: true,
  },
  {
    id: "hi_2",
    lat: 21.3099,
    lng: -157.8581,
    address: "456 Diamond Head Estate",
    city: "Honolulu",
    state: "HI",
    value: 18500000,
    ownerWealth: 425000000,
    ownerName: "Island Holdings Trust",
    confidence: "High",
    propertyType: "estate",
    featured: false,
  },

  // Idaho
  {
    id: "id_1",
    lat: 43.6963,
    lng: -114.3574,
    address: "456 Sun Valley Ski Estate",
    city: "Sun Valley",
    state: "ID",
    value: 8500000,
    ownerWealth: 185000000,
    ownerName: "Mountain Holdings Corp",
    confidence: "High",
    propertyType: "lodge",
    featured: false,
  },

  // Illinois
  {
    id: "il_1",
    lat: 41.8986,
    lng: -87.6233,
    address: "789 Chicago Gold Coast",
    city: "Chicago",
    state: "IL",
    value: 8900000,
    ownerWealth: 285000000,
    ownerName: "Windy City Holdings",
    confidence: "High",
    propertyType: "penthouse",
    featured: false,
  },
  {
    id: "il_2",
    lat: 42.2587,
    lng: -87.8406,
    address: "456 Lake Forest Estate",
    city: "Lake Forest",
    state: "IL",
    value: 6800000,
    ownerWealth: 385000000,
    ownerName: "Chicago Finance Dynasty",
    confidence: "High",
    propertyType: "estate",
    featured: false,
  },

  // Indiana
  {
    id: "in_1",
    lat: 39.7684,
    lng: -86.1581,
    address: "321 Indianapolis Racing Estate",
    city: "Indianapolis",
    state: "IN",
    value: 3200000,
    ownerWealth: 85000000,
    ownerName: "Motorsports Holdings LLC",
    confidence: "Medium",
    propertyType: "estate",
    featured: false,
  },

  // Iowa
  {
    id: "ia_1",
    lat: 41.5868,
    lng: -93.7112,
    address: "654 Des Moines Insurance Estate",
    city: "West Des Moines",
    state: "IA",
    value: 2400000,
    ownerWealth: 95000000,
    ownerName: "Insurance Dynasty Holdings",
    confidence: "Medium",
    propertyType: "mansion",
    featured: false,
  },

  // Kansas
  {
    id: "ks_1",
    lat: 39.1142,
    lng: -94.6275,
    address: "987 Kansas City Agricultural",
    city: "Kansas City",
    state: "KS",
    value: 2800000,
    ownerWealth: 125000000,
    ownerName: "Agricultural Investment Group",
    confidence: "Medium",
    propertyType: "ranch",
    featured: false,
  },

  // Kentucky
  {
    id: "ky_1",
    lat: 38.2527,
    lng: -85.7585,
    address: "234 Louisville Bourbon Estate",
    city: "Louisville",
    state: "KY",
    value: 3800000,
    ownerWealth: 165000000,
    ownerName: "Bourbon Dynasty Holdings",
    confidence: "High",
    propertyType: "mansion",
    featured: false,
  },

  // Louisiana
  {
    id: "la_1",
    lat: 29.9511,
    lng: -90.0715,
    address: "567 New Orleans Garden District",
    city: "New Orleans",
    state: "LA",
    value: 4500000,
    ownerWealth: 145000000,
    ownerName: "Creole Heritage Trust",
    confidence: "High",
    propertyType: "mansion",
    featured: false,
  },

  // Maine
  {
    id: "me_1",
    lat: 44.3876,
    lng: -68.2039,
    address: "890 Bar Harbor Coastal Estate",
    city: "Bar Harbor",
    state: "ME",
    value: 6800000,
    ownerWealth: 185000000,
    ownerName: "New England Maritime Holdings",
    confidence: "High",
    propertyType: "estate",
    featured: false,
  },

  // Maryland
  {
    id: "md_1",
    lat: 39.0458,
    lng: -77.2086,
    address: "123 Potomac Political Estate",
    city: "Potomac",
    state: "MD",
    value: 8500000,
    ownerWealth: 285000000,
    ownerName: "Beltway Holdings Group",
    confidence: "High",
    propertyType: "mansion",
    featured: false,
  },

  // Massachusetts
  {
    id: "ma_1",
    lat: 42.3601,
    lng: -71.0589,
    address: "456 Boston Beacon Hill",
    city: "Boston",
    state: "MA",
    value: 12500000,
    ownerWealth: 485000000,
    ownerName: "New England Dynasty Holdings",
    confidence: "High",
    propertyType: "mansion",
    featured: false,
  },
  {
    id: "ma_2",
    lat: 41.3811,
    lng: -70.6178,
    address: "789 Martha's Vineyard Estate",
    city: "Martha's Vineyard",
    state: "MA",
    value: 14500000,
    ownerWealth: 585000000,
    ownerName: "New England Maritime Trust",
    confidence: "High",
    propertyType: "estate",
    featured: false,
  },

  // Michigan
  {
    id: "mi_1",
    lat: 42.3314,
    lng: -83.0458,
    address: "789 Detroit Automotive Estate",
    city: "Detroit",
    state: "MI",
    value: 3800000,
    ownerWealth: 285000000,
    ownerName: "Automotive Dynasty Holdings",
    confidence: "High",
    propertyType: "mansion",
    featured: false,
  },

  // Minnesota
  {
    id: "mn_1",
    lat: 44.9778,
    lng: -93.265,
    address: "321 Minneapolis Lake Estate",
    city: "Minneapolis",
    state: "MN",
    value: 4200000,
    ownerWealth: 165000000,
    ownerName: "Twin Cities Holdings Group",
    confidence: "High",
    propertyType: "estate",
    featured: false,
  },

  // Mississippi
  {
    id: "ms_1",
    lat: 32.2988,
    lng: -90.1848,
    address: "654 Jackson Cotton Estate",
    city: "Jackson",
    state: "MS",
    value: 2800000,
    ownerWealth: 95000000,
    ownerName: "Southern Agriculture Holdings",
    confidence: "Medium",
    propertyType: "mansion",
    featured: false,
  },

  // Missouri
  {
    id: "mo_1",
    lat: 38.627,
    lng: -90.1994,
    address: "987 St. Louis Brewing Estate",
    city: "St. Louis",
    state: "MO",
    value: 3800000,
    ownerWealth: 285000000,
    ownerName: "Brewing Dynasty Holdings",
    confidence: "High",
    propertyType: "mansion",
    featured: false,
  },

  // Montana
  {
    id: "mt_1",
    lat: 45.2849,
    lng: -111.4083,
    address: "234 Big Sky Ranch Estate",
    city: "Big Sky",
    state: "MT",
    value: 12500000,
    ownerWealth: 485000000,
    ownerName: "Mountain Ranch Holdings",
    confidence: "High",
    propertyType: "ranch",
    featured: true,
  },

  // Nebraska
  {
    id: "ne_1",
    lat: 41.2565,
    lng: -95.9345,
    address: "567 Omaha Investment Estate",
    city: "Omaha",
    state: "NE",
    value: 3200000,
    ownerWealth: 285000000,
    ownerName: "Investment Holdings Group",
    confidence: "High",
    propertyType: "mansion",
    featured: false,
  },

  // Nevada
  {
    id: "nv_1",
    lat: 36.1699,
    lng: -115.1398,
    address: "890 Las Vegas Casino Estate",
    city: "Las Vegas",
    state: "NV",
    value: 15800000,
    ownerWealth: 650000000,
    ownerName: "Gaming Empire Holdings",
    confidence: "High",
    propertyType: "mansion",
    featured: false,
  },
  {
    id: "nv_2",
    lat: 39.0968,
    lng: -120.0324,
    address: "234 Lake Tahoe Luxury Estate",
    city: "Lake Tahoe",
    state: "NV",
    value: 18500000,
    ownerWealth: 750000000,
    ownerName: "Alpine Lake Holdings",
    confidence: "High",
    propertyType: "estate",
    featured: true,
  },

  // New Hampshire
  {
    id: "nh_1",
    lat: 44.0542,
    lng: -71.1253,
    address: "123 White Mountains Estate",
    city: "North Conway",
    state: "NH",
    value: 4200000,
    ownerWealth: 125000000,
    ownerName: "Mountain Holdings Trust",
    confidence: "Medium",
    propertyType: "lodge",
    featured: false,
  },

  // New Jersey
  {
    id: "nj_1",
    lat: 40.3573,
    lng: -74.6672,
    address: "456 Princeton University Estate",
    city: "Princeton",
    state: "NJ",
    value: 6800000,
    ownerWealth: 285000000,
    ownerName: "Academic Holdings Group",
    confidence: "High",
    propertyType: "mansion",
    featured: false,
  },

  // New Mexico
  {
    id: "nm_1",
    lat: 35.687,
    lng: -105.9378,
    address: "789 Santa Fe Adobe Estate",
    city: "Santa Fe",
    state: "NM",
    value: 3800000,
    ownerWealth: 125000000,
    ownerName: "Southwest Art Holdings",
    confidence: "Medium",
    propertyType: "estate",
    featured: false,
  },

  // New York
  {
    id: "ny_1",
    lat: 40.7505,
    lng: -73.9934,
    address: "123 Park Avenue",
    city: "New York",
    state: "NY",
    value: 28500000,
    ownerWealth: 1200000000,
    ownerName: "Wall Street Titan",
    confidence: "High",
    propertyType: "penthouse",
    featured: true,
  },
  {
    id: "ny_2",
    lat: 40.9629,
    lng: -72.1989,
    address: "321 Meadow Lane",
    city: "East Hampton",
    state: "NY",
    value: 22000000,
    ownerWealth: 850000000,
    ownerName: "Real Estate Dynasty",
    confidence: "High",
    propertyType: "estate",
    featured: true,
  },
  {
    id: "ny_3",
    lat: 40.7614,
    lng: -73.9776,
    address: "789 Fifth Avenue",
    city: "New York",
    state: "NY",
    value: 32000000,
    ownerWealth: 2500000000,
    ownerName: "Real Estate Mogul Empire",
    confidence: "High",
    propertyType: "penthouse",
    featured: true,
  },
  {
    id: "ny_4",
    lat: 40.6962,
    lng: -73.9442,
    address: "456 Brooklyn Heights",
    city: "Brooklyn",
    state: "NY",
    value: 8500000,
    ownerWealth: 485000000,
    ownerName: "Media Dynasty Holdings",
    confidence: "High",
    propertyType: "mansion",
    featured: false,
  },

  // North Carolina
  {
    id: "nc_1",
    lat: 35.2271,
    lng: -80.8431,
    address: "654 Charlotte Banking Estate",
    city: "Charlotte",
    state: "NC",
    value: 4800000,
    ownerWealth: 285000000,
    ownerName: "Banking Dynasty Holdings",
    confidence: "High",
    propertyType: "mansion",
    featured: false,
  },

  // North Dakota
  {
    id: "nd_1",
    lat: 46.8772,
    lng: -96.7898,
    address: "987 Fargo Agricultural Estate",
    city: "Fargo",
    state: "ND",
    value: 1800000,
    ownerWealth: 85000000,
    ownerName: "Agricultural Holdings Group",
    confidence: "Medium",
    propertyType: "ranch",
    featured: false,
  },

  // Ohio
  {
    id: "oh_1",
    lat: 41.4993,
    lng: -81.6944,
    address: "234 Cleveland Industrial Estate",
    city: "Cleveland",
    state: "OH",
    value: 3800000,
    ownerWealth: 185000000,
    ownerName: "Industrial Holdings Group",
    confidence: "High",
    propertyType: "mansion",
    featured: false,
  },

  // Oklahoma
  {
    id: "ok_1",
    lat: 35.4676,
    lng: -97.5164,
    address: "567 Oklahoma City Oil Estate",
    city: "Oklahoma City",
    state: "OK",
    value: 3200000,
    ownerWealth: 285000000,
    ownerName: "Oil Dynasty Holdings",
    confidence: "High",
    propertyType: "mansion",
    featured: false,
  },

  // Oregon
  {
    id: "or_1",
    lat: 45.5152,
    lng: -122.6784,
    address: "890 Portland Tech Estate",
    city: "Portland",
    state: "OR",
    value: 4800000,
    ownerWealth: 185000000,
    ownerName: "Pacific Northwest Ventures",
    confidence: "High",
    propertyType: "mansion",
    featured: false,
  },

  // Pennsylvania
  {
    id: "pa_1",
    lat: 39.9526,
    lng: -75.1652,
    address: "123 Philadelphia Historic Estate",
    city: "Philadelphia",
    state: "PA",
    value: 6800000,
    ownerWealth: 285000000,
    ownerName: "Colonial Holdings Trust",
    confidence: "High",
    propertyType: "mansion",
    featured: false,
  },

  // Rhode Island
  {
    id: "ri_1",
    lat: 41.4901,
    lng: -71.3128,
    address: "456 Newport Gilded Age",
    city: "Newport",
    state: "RI",
    value: 18500000,
    ownerWealth: 650000000,
    ownerName: "New England Dynasty",
    confidence: "High",
    propertyType: "mansion",
    featured: true,
  },

  // South Carolina
  {
    id: "sc_1",
    lat: 32.7767,
    lng: -79.9311,
    address: "789 Charleston Historic Estate",
    city: "Charleston",
    state: "SC",
    value: 5800000,
    ownerWealth: 185000000,
    ownerName: "Southern Heritage Holdings",
    confidence: "High",
    propertyType: "mansion",
    featured: false,
  },

  // South Dakota
  {
    id: "sd_1",
    lat: 44.0805,
    lng: -103.231,
    address: "321 Rapid City Mining Estate",
    city: "Rapid City",
    state: "SD",
    value: 2200000,
    ownerWealth: 125000000,
    ownerName: "Mining Holdings Corporation",
    confidence: "Medium",
    propertyType: "ranch",
    featured: false,
  },

  // Tennessee
  {
    id: "tn_1",
    lat: 36.1627,
    lng: -86.7816,
    address: "654 Nashville Music Estate",
    city: "Nashville",
    state: "TN",
    value: 6800000,
    ownerWealth: 285000000,
    ownerName: "Music Industry Holdings",
    confidence: "High",
    propertyType: "mansion",
    featured: false,
  },

  // Texas
  {
    id: "tx_1",
    lat: 32.7767,
    lng: -96.797,
    address: "987 Dallas Oil Empire Estate",
    city: "Dallas",
    state: "TX",
    value: 12500000,
    ownerWealth: 850000000,
    ownerName: "Texas Oil Dynasty",
    confidence: "High",
    propertyType: "mansion",
    featured: true,
  },
  {
    id: "tx_2",
    lat: 29.7604,
    lng: -95.3698,
    address: "234 Houston Energy Estate",
    city: "Houston",
    state: "TX",
    value: 8900000,
    ownerWealth: 485000000,
    ownerName: "Energy Holdings Corporation",
    confidence: "High",
    propertyType: "mansion",
    featured: false,
  },
  {
    id: "tx_3",
    lat: 30.2672,
    lng: -97.7431,
    address: "567 Austin Tech Campus",
    city: "Austin",
    state: "TX",
    value: 9800000,
    ownerWealth: 650000000,
    ownerName: "Austin Tech Ventures",
    confidence: "High",
    propertyType: "estate",
    featured: false,
  },

  // Utah
  {
    id: "ut_1",
    lat: 40.6461,
    lng: -111.498,
    address: "567 Park City Ski Estate",
    city: "Park City",
    state: "UT",
    value: 8500000,
    ownerWealth: 285000000,
    ownerName: "Mountain Resort Holdings",
    confidence: "High",
    propertyType: "lodge",
    featured: false,
  },

  // Vermont
  {
    id: "vt_1",
    lat: 44.4654,
    lng: -72.6874,
    address: "890 Stowe Ski Resort Estate",
    city: "Stowe",
    state: "VT",
    value: 4800000,
    ownerWealth: 125000000,
    ownerName: "Vermont Holdings Trust",
    confidence: "Medium",
    propertyType: "lodge",
    featured: false,
  },

  // Virginia
  {
    id: "va_1",
    lat: 36.8529,
    lng: -75.978,
    address: "123 Virginia Beach Resort",
    city: "Virginia Beach",
    state: "VA",
    value: 4800000,
    ownerWealth: 165000000,
    ownerName: "Coastal Holdings Corporation",
    confidence: "High",
    propertyType: "estate",
    featured: false,
  },

  // Washington
  {
    id: "wa_1",
    lat: 47.6062,
    lng: -122.3321,
    address: "456 Seattle Tech Estate",
    city: "Seattle",
    state: "WA",
    value: 12500000,
    ownerWealth: 2800000000,
    ownerName: "Pacific Northwest Tech Giant",
    confidence: "High",
    propertyType: "mansion",
    featured: true,
  },
  {
    id: "wa_2",
    lat: 47.6101,
    lng: -122.2015,
    address: "789 Bellevue Tech Estate",
    city: "Bellevue",
    state: "WA",
    value: 8900000,
    ownerWealth: 1850000000,
    ownerName: "Cloud Computing Dynasty",
    confidence: "High",
    propertyType: "mansion",
    featured: false,
  },

  // West Virginia
  {
    id: "wv_1",
    lat: 38.3498,
    lng: -81.6326,
    address: "789 Charleston Coal Estate",
    city: "Charleston",
    state: "WV",
    value: 2200000,
    ownerWealth: 165000000,
    ownerName: "Coal Dynasty Holdings",
    confidence: "Medium",
    propertyType: "mansion",
    featured: false,
  },

  // Wisconsin
  {
    id: "wi_1",
    lat: 43.0389,
    lng: -87.9065,
    address: "321 Milwaukee Brewing Estate",
    city: "Milwaukee",
    state: "WI",
    value: 3800000,
    ownerWealth: 185000000,
    ownerName: "Brewing Dynasty Holdings",
    confidence: "High",
    propertyType: "mansion",
    featured: false,
  },

  // Wyoming
  {
    id: "wy_1",
    lat: 43.4799,
    lng: -110.7624,
    address: "654 Jackson Hole Ski Estate",
    city: "Jackson Hole",
    state: "WY",
    value: 18500000,
    ownerWealth: 650000000,
    ownerName: "Mountain Holdings Corporation",
    confidence: "High",
    propertyType: "lodge",
    featured: true,
  },

  // Washington DC
  {
    id: "dc_1",
    lat: 38.9072,
    lng: -77.0369,
    address: "987 Georgetown Political Estate",
    city: "Washington",
    state: "DC",
    value: 15800000,
    ownerWealth: 485000000,
    ownerName: "Political Dynasty Holdings",
    confidence: "High",
    propertyType: "mansion",
    featured: true,
  },
]

export function MapboxWealthMap({ properties, onPropertySelect, filters }: MapboxWealthMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<any>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [mapStyle, setMapStyle] = useState("streets-v12")
  const [viewMode, setViewMode] = useState<"wealth" | "confidence" | "property-type">("wealth")
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [mapboxConfig, setMapboxConfig] = useState<any>(null)
  const [configError, setConfigError] = useState<string | null>(null)
  const [showSamples, setShowSamples] = useState(true)
  const [showControls, setShowControls] = useState(true)
  const [showLegend, setShowLegend] = useState(true)

  // Combine all state properties with user properties
  const allProperties = showSamples ? [...ALL_STATE_PROPERTIES, ...properties] : properties

  // Fetch Mapbox configuration from server
  useEffect(() => {
    const fetchMapboxConfig = async () => {
      try {
        const response = await fetch("/api/mapbox/config")
        const data = await response.json()

        if (response.ok) {
          setMapboxConfig(data)
        } else {
          setConfigError(data.error || "Failed to load Mapbox configuration")
        }
      } catch (error) {
        setConfigError("Network error loading Mapbox configuration")
      }
    }

    fetchMapboxConfig()
  }, [])

  // Initialize Mapbox
  useEffect(() => {
    const initializeMap = async () => {
      if (map.current || !mapContainer.current || !mapboxConfig?.token) return

      try {
        // Dynamically import Mapbox GL JS
        const mapboxgl = (await import("mapbox-gl")).default

        // Set access token from server config
        mapboxgl.accessToken = mapboxConfig.token

        // Create map instance
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: `mapbox://styles/mapbox/${mapStyle}`,
          center: [-98.5795, 39.8283], // Center of US
          zoom: 4,
          pitch: 45,
          bearing: 0,
        })

        // Make mapboxgl available globally for bounds operations
        if (typeof window !== "undefined") {
          ;(window as any).mapboxgl = mapboxgl
        }

        // Add navigation controls
        map.current.addControl(new mapboxgl.NavigationControl(), "top-right")

        // Add fullscreen control
        map.current.addControl(new mapboxgl.FullscreenControl(), "top-right")

        // Wait for map to load
        map.current.on("load", () => {
          setMapLoaded(true)
          addPropertyLayers()
        })

        // Handle property clicks
        map.current.on("click", "properties-layer", (e: any) => {
          const property = e.features[0].properties
          const propertyData = allProperties.find((p) => p.id === property.id)
          if (propertyData && map.current) {
            setSelectedProperty(propertyData)
            onPropertySelect(propertyData)

            // Safely create popup with dynamic import
            import("mapbox-gl")
              .then((mapboxgl) => {
                new mapboxgl.default.Popup()
                  .setLngLat(e.lngLat)
                  .setHTML(createPopupHTML(propertyData))
                  .addTo(map.current)
              })
              .catch((error) => {
                console.error("Failed to create popup:", error)
              })
          }
        })

        // Handle featured property clicks
        map.current.on("click", "featured-properties-layer", (e: any) => {
          const property = e.features[0].properties
          const propertyData = allProperties.find((p) => p.id === property.id)
          if (propertyData) {
            setSelectedProperty(propertyData)
            onPropertySelect(propertyData)

            // Create enhanced popup for featured properties
            new mapboxgl.Popup().setLngLat(e.lngLat).setHTML(createFeaturedPopupHTML(propertyData)).addTo(map.current)
          }
        })

        // Change cursor on hover
        map.current.on("mouseenter", "properties-layer", () => {
          map.current.getCanvas().style.cursor = "pointer"
        })

        map.current.on("mouseleave", "properties-layer", () => {
          map.current.getCanvas().style.cursor = ""
        })

        map.current.on("mouseenter", "featured-properties-layer", () => {
          map.current.getCanvas().style.cursor = "pointer"
        })

        map.current.on("mouseleave", "featured-properties-layer", () => {
          map.current.getCanvas().style.cursor = ""
        })
      } catch (error) {
        console.error("Failed to initialize Mapbox:", error)
        setConfigError("Failed to initialize Mapbox map")
      }
    }

    if (mapboxConfig) {
      initializeMap()
    }

    return () => {
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [mapboxConfig, mapStyle])

  // Add property data layers
  const addPropertyLayers = () => {
    if (!map.current || !mapLoaded) return

    // Separate featured and regular properties
    const featuredProperties = allProperties.filter((p) => p.featured)
    const regularProperties = allProperties.filter((p) => !p.featured)

    // Convert regular properties to GeoJSON
    const regularGeojsonData = {
      type: "FeatureCollection",
      features: regularProperties.map((property) => ({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [property.lng, property.lat],
        },
        properties: {
          id: property.id,
          address: property.address,
          value: property.value,
          ownerWealth: property.ownerWealth,
          ownerName: property.ownerName,
          confidence: property.confidence,
          propertyType: property.propertyType,
          state: property.state,
          city: property.city,
        },
      })),
    }

    // Convert featured properties to GeoJSON
    const featuredGeojsonData = {
      type: "FeatureCollection",
      features: featuredProperties.map((property) => ({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [property.lng, property.lat],
        },
        properties: {
          id: property.id,
          address: property.address,
          value: property.value,
          ownerWealth: property.ownerWealth,
          ownerName: property.ownerName,
          confidence: property.confidence,
          propertyType: property.propertyType,
          state: property.state,
          city: property.city,
        },
      })),
    }

    // Add regular properties source
    if (map.current.getSource("properties")) {
      map.current.getSource("properties").setData(regularGeojsonData)
    } else {
      map.current.addSource("properties", {
        type: "geojson",
        data: regularGeojsonData,
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 50,
      })
    }

    // Add featured properties source
    if (map.current.getSource("featured-properties")) {
      map.current.getSource("featured-properties").setData(featuredGeojsonData)
    } else {
      map.current.addSource("featured-properties", {
        type: "geojson",
        data: featuredGeojsonData,
      })
    }

    // Add cluster layer for regular properties
    if (!map.current.getLayer("clusters")) {
      map.current.addLayer({
        id: "clusters",
        type: "circle",
        source: "properties",
        filter: ["has", "point_count"],
        paint: {
          "circle-color": ["step", ["get", "point_count"], "#51bbd6", 100, "#f1f075", 750, "#f28cb1"],
          "circle-radius": ["step", ["get", "point_count"], 20, 100, 30, 750, 40],
        },
      })
    }

    // Add cluster count labels
    if (!map.current.getLayer("cluster-count")) {
      map.current.addLayer({
        id: "cluster-count",
        type: "symbol",
        source: "properties",
        filter: ["has", "point_count"],
        layout: {
          "text-field": "{point_count_abbreviated}",
          "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
          "text-size": 12,
        },
      })
    }

    // Add individual regular property points
    if (!map.current.getLayer("properties-layer")) {
      map.current.addLayer({
        id: "properties-layer",
        type: "circle",
        source: "properties",
        filter: ["!", ["has", "point_count"]],
        paint: {
          "circle-color": getCircleColor(),
          "circle-radius": ["interpolate", ["linear"], ["zoom"], 8, 4, 16, 12],
          "circle-stroke-width": 2,
          "circle-stroke-color": "#ffffff",
        },
      })
    }

    // Add featured properties layer with special styling
    if (!map.current.getLayer("featured-properties-layer")) {
      map.current.addLayer({
        id: "featured-properties-layer",
        type: "circle",
        source: "featured-properties",
        paint: {
          "circle-color": [
            "interpolate",
            ["linear"],
            ["get", "ownerWealth"],
            50000000,
            "#fbbf24", // Gold for $50M+
            100000000,
            "#f59e0b", // Darker gold for $100M+
            200000000,
            "#d97706", // Orange for $200M+
            300000000,
            "#dc2626", // Red for $300M+
          ],
          "circle-radius": ["interpolate", ["linear"], ["zoom"], 8, 8, 16, 20],
          "circle-stroke-width": 3,
          "circle-stroke-color": "#ffffff",
          "circle-opacity": 0.9,
        },
      })
    }

    // Add pulsing animation for featured properties
    if (!map.current.getLayer("featured-properties-pulse")) {
      map.current.addLayer({
        id: "featured-properties-pulse",
        type: "circle",
        source: "featured-properties",
        paint: {
          "circle-color": "#fbbf24",
          "circle-radius": ["interpolate", ["linear"], ["zoom"], 8, 15, 16, 30],
          "circle-opacity": ["interpolate", ["linear"], ["zoom"], 8, 0.3, 16, 0.1],
          "circle-stroke-width": 0,
        },
      })
    }

    // Add featured property labels
    if (!map.current.getLayer("featured-property-labels")) {
      map.current.addLayer({
        id: "featured-property-labels",
        type: "symbol",
        source: "featured-properties",
        layout: {
          "text-field": [
            "format",
            "★ $",
            { "font-scale": 0.8 },
            ["number-format", ["get", "value"], { "min-fraction-digits": 0, "max-fraction-digits": 0 }],
            {},
          ],
          "text-font": ["DIN Offc Pro Bold", "Arial Unicode MS Bold"],
          "text-size": 12,
          "text-offset": [0, 2],
          "text-anchor": "top",
        },
        paint: {
          "text-color": "#1f2937",
          "text-halo-color": "#ffffff",
          "text-halo-width": 2,
        },
        minzoom: 10,
      })
    }

    // Add regular property labels
    if (!map.current.getLayer("property-labels")) {
      map.current.addLayer({
        id: "property-labels",
        type: "symbol",
        source: "properties",
        filter: ["!", ["has", "point_count"]],
        layout: {
          "text-field": [
            "format",
            "$",
            {},
            ["number-format", ["get", "value"], { "min-fraction-digits": 0, "max-fraction-digits": 0 }],
            {},
          ],
          "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
          "text-size": 10,
          "text-offset": [0, 1.5],
          "text-anchor": "top",
        },
        paint: {
          "text-color": "#000000",
          "text-halo-color": "#ffffff",
          "text-halo-width": 1,
        },
        minzoom: 12,
      })
    }
  }

  // Get circle color based on view mode
  const getCircleColor = () => {
    switch (viewMode) {
      case "wealth":
        return [
          "interpolate",
          ["linear"],
          ["get", "ownerWealth"],
          1000000,
          "#22c55e", // Green for $1M+
          5000000,
          "#eab308", // Yellow for $5M+
          10000000,
          "#f97316", // Orange for $10M+
          25000000,
          "#ef4444", // Red for $25M+
        ]
      case "confidence":
        return [
          "case",
          ["==", ["get", "confidence"], "High"],
          "#22c55e",
          ["==", ["get", "confidence"], "Medium"],
          "#eab308",
          "#ef4444", // Low confidence
        ]
      case "property-type":
        return [
          "case",
          ["==", ["get", "propertyType"], "single-family"],
          "#3b82f6",
          ["==", ["get", "propertyType"], "condo"],
          "#8b5cf6",
          ["==", ["get", "propertyType"], "townhouse"],
          "#06b6d4",
          ["==", ["get", "propertyType"], "multi-family"],
          "#10b981", // Default
        ]
      default:
        return "#3b82f6"
    }
  }

  // Update layer styling when view mode changes
  useEffect(() => {
    if (map.current && mapLoaded && map.current.getLayer("properties-layer")) {
      map.current.setPaintProperty("properties-layer", "circle-color", getCircleColor())
    }
  }, [viewMode, mapLoaded])

  // Update data when properties change
  useEffect(() => {
    if (map.current && mapLoaded) {
      addPropertyLayers()
    }
  }, [allProperties, mapLoaded, showSamples])

  // Change map style
  const changeMapStyle = (style: string) => {
    if (map.current) {
      map.current.setStyle(`mapbox://styles/mapbox/${style}`)
      setMapStyle(style)

      // Re-add layers after style change
      map.current.once("styledata", () => {
        addPropertyLayers()
      })
    }
  }

  // Create popup HTML for regular properties
  const createPopupHTML = (property: Property) => {
    return `
      <div class="p-3 min-w-[250px]">
        <h3 class="font-semibold text-sm mb-2">${property.address}</h3>
        <div class="text-xs text-gray-600 mb-2">${property.city}, ${property.state}</div>
        <div class="space-y-1 text-xs">
          <div class="flex justify-between">
            <span>Property Value:</span>
            <span class="font-medium">$${(property.value / 1000000).toFixed(1)}M</span>
          </div>
          <div class="flex justify-between">
            <span>Owner:</span>
            <span class="font-medium">${property.ownerName}</span>
          </div>
          <div class="flex justify-between">
            <span>Owner Wealth:</span>
            <span class="font-medium">$${(property.ownerWealth / 1000000).toFixed(1)}M</span>
          </div>
          <div class="flex justify-between">
            <span>Confidence:</span>
            <span class="inline-flex px-2 py-1 text-xs rounded-full ${
              property.confidence === "High"
                ? "bg-green-100 text-green-800"
                : property.confidence === "Medium"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-red-100 text-red-800"
            }">${property.confidence}</span>
          </div>
        </div>
      </div>
    `
  }

  // Create enhanced popup HTML for featured properties
  const createFeaturedPopupHTML = (property: Property) => {
    return `
      <div class="p-4 min-w-[300px] bg-gradient-to-br from-yellow-50 to-orange-50">
        <div class="flex items-center gap-2 mb-3">
          <span class="text-yellow-500">★</span>
          <h3 class="font-bold text-base text-gray-900">Featured Property</h3>
        </div>
        <h4 class="font-semibold text-sm mb-1 text-gray-800">${property.address}</h4>
        <div class="text-xs text-gray-600 mb-3">${property.city}, ${property.state}</div>
        <div class="space-y-2 text-sm">
          <div class="flex justify-between">
            <span class="text-gray-600">Property Value:</span>
            <span class="font-bold text-green-700">$${(property.value / 1000000).toFixed(1)}M</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Owner:</span>
            <span class="font-semibold text-gray-900">${property.ownerName}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Estimated Net Worth:</span>
            <span class="font-bold text-blue-700">$${(property.ownerWealth / 1000000).toFixed(0)}M</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Analysis Confidence:</span>
            <span class="inline-flex px-3 py-1 text-xs font-medium rounded-full ${
              property.confidence === "High"
                ? "bg-green-100 text-green-800"
                : property.confidence === "Medium"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-red-100 text-red-800"
            }">${property.confidence}</span>
          </div>
        </div>
        <div class="mt-3 pt-3 border-t border-yellow-200">
          <p class="text-xs text-gray-600">Ultra-high net worth individual identified through our proprietary analysis</p>
        </div>
      </div>
    `
  }

  // Zoom to fit all properties
  const fitToProperties = () => {
    if (map.current && allProperties.length > 0 && typeof window !== "undefined") {
      try {
        // Check if mapboxgl is available on window
        const mapboxgl = (window as any).mapboxgl
        if (mapboxgl && mapboxgl.LngLatBounds) {
          const bounds = new mapboxgl.LngLatBounds()
          allProperties.forEach((property) => {
            bounds.extend([property.lng, property.lat])
          })
          map.current.fitBounds(bounds, { padding: 50 })
        } else {
          console.warn("Mapbox not fully loaded yet")
        }
      } catch (error) {
        console.error("Error fitting bounds:", error)
      }
    }
  }

  // Zoom to featured properties
  const showFeaturedProperties = () => {
    if (map.current && typeof window !== "undefined") {
      try {
        const mapboxgl = (window as any).mapboxgl
        const featuredProps = allProperties.filter((p) => p.featured)
        if (mapboxgl && mapboxgl.LngLatBounds && featuredProps.length > 0) {
          const bounds = new mapboxgl.LngLatBounds()
          featuredProps.forEach((property) => {
            bounds.extend([property.lng, property.lat])
          })
          map.current.fitBounds(bounds, { padding: 100 })
        } else {
          console.warn("Mapbox not fully loaded yet")
        }
      } catch (error) {
        console.error("Error showing featured properties:", error)
      }
    }
  }

  // Show error state
  if (configError) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-100">
        <Card className="p-6 max-w-md">
          <div className="text-center space-y-4">
            <MapPin className="h-12 w-12 text-red-500 mx-auto" />
            <h3 className="text-lg font-semibold text-red-900">Mapbox Configuration Error</h3>
            <p className="text-sm text-red-700">{configError}</p>
            <Button variant="outline" onClick={() => window.location.reload()}>
              Retry
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  // Show loading state
  if (!mapboxConfig) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <div className="text-sm text-gray-600">Loading Mapbox configuration...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative h-full">
      {/* Map Container */}
      <div ref={mapContainer} className="h-full w-full" />

      {/* Map Controls */}
      <div className="absolute top-4 left-4 z-10 space-y-3">
        {/* Controls Toggle Button */}
        <Card className="p-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowControls(!showControls)}
            className="w-full flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span className="text-sm font-medium">Map Controls</span>
            </div>
            {showControls ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </Card>

        {/* Collapsible Controls */}
        {showControls && (
          <>
            {/* All States Coverage Toggle */}
            <Card className="p-3">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm font-medium">All States Coverage</span>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={showSamples ? "default" : "outline"}
                    size="sm"
                    onClick={() => setShowSamples(!showSamples)}
                  >
                    {showSamples ? "Hide" : "Show"} Properties
                  </Button>
                  <Button variant="outline" size="sm" onClick={showFeaturedProperties}>
                    <Crown className="h-3 w-3 mr-1" />
                    Featured
                  </Button>
                </div>
              </div>
            </Card>

            {/* View Mode Selector */}
            <Card className="p-3">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  <span className="text-sm font-medium">View Mode</span>
                </div>
                <Select value={viewMode} onValueChange={(value: any) => setViewMode(value)}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="wealth">Owner Wealth</SelectItem>
                    <SelectItem value="confidence">Confidence Level</SelectItem>
                    <SelectItem value="property-type">Property Type</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </Card>

            {/* Style Selector */}
            <Card className="p-3">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Layers className="h-4 w-4" />
                  <span className="text-sm font-medium">Map Style</span>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <Button
                    variant={mapStyle === "streets-v12" ? "default" : "outline"}
                    size="sm"
                    onClick={() => changeMapStyle("streets-v12")}
                  >
                    Streets
                  </Button>
                  <Button
                    variant={mapStyle === "satellite-v9" ? "default" : "outline"}
                    size="sm"
                    onClick={() => changeMapStyle("satellite-v9")}
                  >
                    Satellite
                  </Button>
                  <Button
                    variant={mapStyle === "light-v11" ? "default" : "outline"}
                    size="sm"
                    onClick={() => changeMapStyle("light-v11")}
                  >
                    Light
                  </Button>
                  <Button
                    variant={mapStyle === "dark-v11" ? "default" : "outline"}
                    size="sm"
                    onClick={() => changeMapStyle("dark-v11")}
                  >
                    Dark
                  </Button>
                </div>
              </div>
            </Card>
          </>
        )}
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 z-10 space-y-2">
        {/* Legend Toggle Button */}
        <Card className="p-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowLegend(!showLegend)}
            className="w-full flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-red-500 rounded-full"></div>
              <span className="text-sm font-medium">Legend</span>
            </div>
            {showLegend ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </Card>

        {/* Collapsible Legend */}
        {showLegend && (
          <Card className="p-4">
            <h3 className="font-semibold mb-3 text-sm">
              {viewMode === "wealth" && "Owner Wealth"}
              {viewMode === "confidence" && "Confidence Level"}
              {viewMode === "property-type" && "Property Type"}
            </h3>
            <div className="space-y-2 text-xs">
              {showSamples && (
                <div className="mb-3 pb-2 border-b border-gray-200">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"></div>
                    <span className="font-medium">Featured Properties</span>
                  </div>
                  <div className="text-xs text-gray-600">All 50 states + DC coverage</div>
                </div>
              )}
              {viewMode === "wealth" && (
                <>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>$1M - $5M</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span>$5M - $10M</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span>$10M - $25M</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span>$25M+</span>
                  </div>
                </>
              )}
              {viewMode === "confidence" && (
                <>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>High Confidence</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span>Medium Confidence</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span>Low Confidence</span>
                  </div>
                </>
              )}
              {viewMode === "property-type" && (
                <>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span>Single Family</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span>Condo</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                    <span>Townhouse</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                    <span>Multi-Family</span>
                  </div>
                </>
              )}
            </div>
          </Card>
        )}
      </div>

      {/* Property Count & Controls */}
      <Card className="absolute top-4 right-4 z-10 p-3">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium">{allProperties.length} Properties</span>
          </div>
          <Button variant="outline" size="sm" onClick={fitToProperties}>
            <Navigation className="h-4 w-4 mr-1" />
            Fit All
          </Button>
        </div>
        {showSamples && (
          <div className="mt-2 text-xs text-gray-600">
            Coverage: All 50 states + DC ({allProperties.filter((p) => p.featured).length} featured)
          </div>
        )}
      </Card>

      {/* Loading Overlay */}
      {!mapLoaded && mapboxConfig && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center z-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <div className="text-sm text-gray-600">Loading Mapbox...</div>
          </div>
        </div>
      )}
    </div>
  )
}
