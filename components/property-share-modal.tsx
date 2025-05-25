"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { Copy, Facebook, Twitter, Linkedin, Mail, MessageSquare } from "lucide-react"

interface PropertyShareModalProps {
  isOpen: boolean
  onClose: () => void
  property: {
    id: string
    title: string
    address?: string
    value?: number
    image?: string
  }
}

export function PropertyShareModal({ isOpen, onClose, property }: PropertyShareModalProps) {
  const { toast } = useToast()
  const [copied, setCopied] = useState(false)

  const propertyUrl = `${window.location.origin}/properties/${property.id}`
  const shareText = `Check out this property: ${property.title} - ${property.address || "Premium Location"}`

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(propertyUrl)
      setCopied(true)
      toast({
        title: "Link Copied!",
        description: "Property link copied to clipboard",
      })
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Unable to copy link to clipboard",
        variant: "destructive",
      })
    }
  }

  const shareOptions = [
    {
      name: "Facebook",
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(propertyUrl)}`,
      color: "bg-blue-600 hover:bg-blue-700",
    },
    {
      name: "Twitter",
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(propertyUrl)}`,
      color: "bg-sky-500 hover:bg-sky-600",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(propertyUrl)}`,
      color: "bg-blue-700 hover:bg-blue-800",
    },
    {
      name: "Email",
      icon: Mail,
      url: `mailto:?subject=${encodeURIComponent(`Property: ${property.title}`)}&body=${encodeURIComponent(`${shareText}\n\n${propertyUrl}`)}`,
      color: "bg-gray-600 hover:bg-gray-700",
    },
    {
      name: "WhatsApp",
      icon: MessageSquare,
      url: `https://wa.me/?text=${encodeURIComponent(`${shareText}\n${propertyUrl}`)}`,
      color: "bg-green-600 hover:bg-green-700",
    },
  ]

  const handleShare = (url: string) => {
    window.open(url, "_blank", "width=600,height=400")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Property</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Property Preview */}
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
              {property.image ? (
                <img
                  src={property.image || "/placeholder.svg"}
                  alt={property.title}
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <div className="text-gray-400 text-xs">IMG</div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{property.title}</p>
              <p className="text-xs text-gray-600 truncate">{property.address}</p>
              {property.value && (
                <p className="text-xs font-semibold text-green-600">${(property.value / 1000000).toFixed(1)}M</p>
              )}
            </div>
          </div>

          {/* Copy Link */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Property Link</label>
            <div className="flex space-x-2">
              <Input value={propertyUrl} readOnly className="flex-1" />
              <Button onClick={handleCopyLink} variant="outline" size="sm">
                <Copy className="h-4 w-4" />
                {copied ? "Copied!" : "Copy"}
              </Button>
            </div>
          </div>

          {/* Social Share Options */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Share on Social Media</label>
            <div className="grid grid-cols-2 gap-2">
              {shareOptions.map((option) => (
                <Button
                  key={option.name}
                  onClick={() => handleShare(option.url)}
                  className={`${option.color} text-white justify-start`}
                  variant="default"
                  size="sm"
                >
                  <option.icon className="h-4 w-4 mr-2" />
                  {option.name}
                </Button>
              ))}
            </div>
          </div>

          {/* QR Code Option */}
          <div className="text-center pt-4 border-t">
            <Button variant="outline" size="sm" className="text-xs">
              Generate QR Code
            </Button>
            <p className="text-xs text-gray-500 mt-1">Create QR code for easy mobile sharing</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
