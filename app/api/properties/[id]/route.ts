import { type NextRequest, NextResponse } from "next/server"
import { PropertyService } from "@/lib/services/property-service"

const propertyService = new PropertyService()

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const property = await propertyService.getProperty(params.id)

    if (!property) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 })
    }

    return NextResponse.json(property)
  } catch (error) {
    console.error("Get property error:", error)
    return NextResponse.json({ error: "Failed to fetch property" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const updates = await request.json()
    const success = await propertyService.updateProperty(params.id, updates)

    if (!success) {
      return NextResponse.json({ error: "Property not found or not updated" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Update property error:", error)
    return NextResponse.json({ error: "Failed to update property" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const success = await propertyService.deleteProperty(params.id)

    if (!success) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Delete property error:", error)
    return NextResponse.json({ error: "Failed to delete property" }, { status: 500 })
  }
}
