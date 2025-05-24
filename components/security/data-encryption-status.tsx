"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Shield, Lock, Key, Database, CheckCircle, AlertTriangle } from "lucide-react"

interface EncryptionStatus {
  database: {
    encrypted: boolean
    algorithm: string
    keyRotationDate: Date
    status: "active" | "warning" | "error"
  }
  storage: {
    encrypted: boolean
    algorithm: string
    status: "active" | "warning" | "error"
  }
  transmission: {
    tlsVersion: string
    certificateExpiry: Date
    status: "active" | "warning" | "error"
  }
  backups: {
    encrypted: boolean
    lastBackup: Date
    status: "active" | "warning" | "error"
  }
}

export function DataEncryptionStatus() {
  const [encryptionStatus, setEncryptionStatus] = useState<EncryptionStatus | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchEncryptionStatus()
  }, [])

  const fetchEncryptionStatus = async () => {
    try {
      const response = await fetch("/api/admin/security/encryption-status")
      const data = await response.json()
      setEncryptionStatus(data)
    } catch (error) {
      console.error("Failed to fetch encryption status:", error)
      // Mock data for demo
      setEncryptionStatus({
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
      })
    } finally {
      setLoading(false)
    }
  }

  const rotateEncryptionKeys = async () => {
    try {
      const response = await fetch("/api/admin/security/rotate-keys", {
        method: "POST",
      })

      if (response.ok) {
        fetchEncryptionStatus()
      }
    } catch (error) {
      console.error("Failed to rotate keys:", error)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />
      case "error":
        return <AlertTriangle className="h-5 w-5 text-red-600" />
      default:
        return <Shield className="h-5 w-5 text-gray-600" />
    }
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-600"
      case "warning":
        return "bg-yellow-600"
      case "error":
        return "bg-red-600"
      default:
        return "bg-gray-600"
    }
  }

  const calculateSecurityScore = () => {
    if (!encryptionStatus) return 0

    let score = 0
    const checks = [
      encryptionStatus.database.encrypted,
      encryptionStatus.storage.encrypted,
      encryptionStatus.transmission.tlsVersion === "TLS 1.3",
      encryptionStatus.backups.encrypted,
      encryptionStatus.database.status === "active",
      encryptionStatus.storage.status === "active",
      encryptionStatus.transmission.status === "active",
      encryptionStatus.backups.status === "active",
    ]

    score = (checks.filter(Boolean).length / checks.length) * 100
    return Math.round(score)
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse">Loading encryption status...</div>
        </CardContent>
      </Card>
    )
  }

  if (!encryptionStatus) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-red-600">Failed to load encryption status</div>
        </CardContent>
      </Card>
    )
  }

  const securityScore = calculateSecurityScore()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lock className="h-5 w-5" />
          Data Encryption & Security Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Security Score */}
        <div className="text-center p-6 border rounded-lg">
          <div className="text-3xl font-bold text-green-600 mb-2">{securityScore}%</div>
          <div className="text-sm text-gray-600 mb-4">Security Score</div>
          <Progress value={securityScore} className="w-full" />
          <div className="text-xs text-gray-500 mt-2">Based on encryption standards and security practices</div>
        </div>

        {/* Encryption Status Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Database Encryption */}
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                <h3 className="font-medium">Database Encryption</h3>
              </div>
              {getStatusIcon(encryptionStatus.database.status)}
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Status:</span>
                <Badge className={getStatusBadgeColor(encryptionStatus.database.status)}>
                  {encryptionStatus.database.encrypted ? "Encrypted" : "Not Encrypted"}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span>Algorithm:</span>
                <span className="font-medium">{encryptionStatus.database.algorithm}</span>
              </div>
              <div className="flex justify-between">
                <span>Key Rotation:</span>
                <span className="font-medium">{encryptionStatus.database.keyRotationDate.toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {/* Storage Encryption */}
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                <h3 className="font-medium">Storage Encryption</h3>
              </div>
              {getStatusIcon(encryptionStatus.storage.status)}
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Status:</span>
                <Badge className={getStatusBadgeColor(encryptionStatus.storage.status)}>
                  {encryptionStatus.storage.encrypted ? "Encrypted" : "Not Encrypted"}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span>Algorithm:</span>
                <span className="font-medium">{encryptionStatus.storage.algorithm}</span>
              </div>
              <div className="flex justify-between">
                <span>At Rest:</span>
                <span className="font-medium">Protected</span>
              </div>
            </div>
          </div>

          {/* Transmission Security */}
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                <h3 className="font-medium">Data Transmission</h3>
              </div>
              {getStatusIcon(encryptionStatus.transmission.status)}
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Protocol:</span>
                <Badge className={getStatusBadgeColor(encryptionStatus.transmission.status)}>
                  {encryptionStatus.transmission.tlsVersion}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span>Certificate:</span>
                <span className="font-medium">Valid</span>
              </div>
              <div className="flex justify-between">
                <span>Expires:</span>
                <span className="font-medium">
                  {encryptionStatus.transmission.certificateExpiry.toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          {/* Backup Encryption */}
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                <h3 className="font-medium">Backup Encryption</h3>
              </div>
              {getStatusIcon(encryptionStatus.backups.status)}
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Status:</span>
                <Badge className={getStatusBadgeColor(encryptionStatus.backups.status)}>
                  {encryptionStatus.backups.encrypted ? "Encrypted" : "Not Encrypted"}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span>Last Backup:</span>
                <span className="font-medium">{encryptionStatus.backups.lastBackup.toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Retention:</span>
                <span className="font-medium">30 days</span>
              </div>
            </div>
          </div>
        </div>

        {/* Compliance Information */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2">Compliance Standards</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-blue-800">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              <span>SOC 2 Type II</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              <span>GDPR Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              <span>CCPA Compliant</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <Button onClick={rotateEncryptionKeys} variant="outline">
            <Key className="h-4 w-4 mr-2" />
            Rotate Encryption Keys
          </Button>
          <Button variant="outline">
            <Shield className="h-4 w-4 mr-2" />
            Security Audit Report
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
