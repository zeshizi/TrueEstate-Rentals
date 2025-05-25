export interface Property {
  id: string
  address: string
  city: string
  state: string
  zipCode: string
  price: number
  bedrooms: number
  bathrooms: number
  squareFootage: number
  propertyType: string
  yearBuilt: number
  description: string
  imageUrl: string
  ownerId: string
  createdAt: Date
  updatedAt: Date
}
