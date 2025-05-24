import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    // Mock encryption status for demo
    const encryptionStatus = {
      database: {
        encrypted: true,
        algorithm: "AES-256-GCM",
        keyRotationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        status: "active",
      },
      storage: {
        encrypted: true,
        algorithm: "AES-256",
        status: "active",
      },
      transmission: {
        tlsVersion: "TLS 1.3",
        certificateExpiry: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        status: "active",
      },
      backups: {
        encrypted: true,
        lastBackup: new Date(Date.now() - 24 * 60 * 60 * 1000),
        status: "active",
      },
    }

    return NextResponse.json(encryptionStatus)
  } catch (error) {
    console.error("Failed to fetch encryption status:", error)
    return NextResponse.json({ error: "Failed to fetch encryption status" }, { status: 500 })
  }
}
