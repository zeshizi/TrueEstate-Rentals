"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  RotateCcw,
  MessageCircle,
  Phone,
  Video,
  Calendar,
  MapPin,
  Camera,
  Move3D,
  Compass,
} from "lucide-react"

interface VirtualTourProps {
  propertyId: string
  images: string[]
  title: string
}

export function VirtualTour({ propertyId, images, title }: VirtualTourProps) {
  const [currentImage, setCurrentImage] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const tourRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentImage((prev) => (prev + 1) % images.length)
      }, 3000)
    }
    return () => clearInterval(interval)
  }, [isPlaying, images.length])

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      tourRef.current?.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const tourSpots = [
    { name: "Living Room", position: { x: 20, y: 30 } },
    { name: "Kitchen", position: { x: 60, y: 25 } },
    { name: "Master Bedroom", position: { x: 80, y: 60 } },
    { name: "Bathroom", position: { x: 40, y: 70 } },
    { name: "Balcony", position: { x: 90, y: 40 } },
  ]

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Camera className="h-5 w-5" />
          Virtual Tour - {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div ref={tourRef} className="relative bg-black rounded-lg overflow-hidden">
          {/* Main Tour Image */}
          <div className="relative aspect-video">
            <img
              src={images[currentImage] || "/placeholder.svg?height=400&width=600&text=Virtual+Tour"}
              alt={`Tour view ${currentImage + 1}`}
              className="w-full h-full object-cover"
            />

            {/* Tour Hotspots */}
            {tourSpots.map((spot, index) => (
              <button
                key={spot.name}
                className="absolute w-6 h-6 bg-blue-600 rounded-full border-2 border-white shadow-lg hover:scale-110 transition-transform"
                style={{ left: `${spot.position.x}%`, top: `${spot.position.y}%` }}
                onClick={() => setCurrentImage(index)}
                title={spot.name}
              >
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 hover:opacity-100 transition-opacity whitespace-nowrap">
                  {spot.name}
                </div>
              </button>
            ))}

            {/* Tour Controls */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button variant="secondary" size="sm" onClick={() => setIsPlaying(!isPlaying)}>
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Button variant="secondary" size="sm" onClick={() => setIsMuted(!isMuted)}>
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
                <Button variant="secondary" size="sm" onClick={() => setCurrentImage(0)}>
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Badge variant="secondary">
                  {currentImage + 1} / {images.length}
                </Badge>
                <Button variant="secondary" size="sm" onClick={toggleFullscreen}>
                  <Maximize className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Thumbnail Navigation */}
          <div className="flex gap-2 p-4 bg-gray-100 overflow-x-auto">
            {images.map((image, index) => (
              <button
                key={index}
                className={`flex-shrink-0 w-16 h-12 rounded border-2 overflow-hidden ${
                  currentImage === index ? "border-blue-600" : "border-gray-300"
                }`}
                onClick={() => setCurrentImage(index)}
              >
                <img
                  src={image || "/placeholder.svg?height=48&width=64&text=Room"}
                  alt={`Room ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function LiveSupport() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "agent",
      message: "Hi! I'm Sarah, your real estate assistant. How can I help you today?",
      time: new Date(),
      avatar: "/placeholder.svg?height=32&width=32&text=SA",
    },
  ])
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const sendMessage = () => {
    if (!newMessage.trim()) return

    const userMessage = {
      id: messages.length + 1,
      sender: "user",
      message: newMessage,
      time: new Date(),
      avatar: "/placeholder.svg?height=32&width=32&text=U",
    }

    setMessages([...messages, userMessage])
    setNewMessage("")
    setIsTyping(true)

    // Simulate agent response
    setTimeout(() => {
      const agentResponse = {
        id: messages.length + 2,
        sender: "agent",
        message:
          "Thanks for your question! Let me help you with that. I can provide information about properties, schedule viewings, or connect you with one of our specialists.",
        time: new Date(),
        avatar: "/placeholder.svg?height=32&width=32&text=SA",
      }
      setMessages((prev) => [...prev, agentResponse])
      setIsTyping(false)
    }, 2000)
  }

  return (
    <>
      {/* Chat Widget Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-lg shadow-xl border z-50">
          {/* Chat Header */}
          <div className="flex items-center justify-between p-4 border-b bg-blue-600 text-white rounded-t-lg">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32&text=SA" />
                <AvatarFallback>SA</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">Sarah Anderson</h3>
                <p className="text-xs opacity-90">Real Estate Specialist</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="text-white hover:bg-blue-700">
                <Phone className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:bg-blue-700">
                <Video className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-blue-700"
                onClick={() => setIsOpen(false)}
              >
                ×
              </Button>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 h-64 overflow-y-auto space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-2 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.sender === "agent" && (
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={message.avatar || "/placeholder.svg"} />
                    <AvatarFallback>SA</AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`max-w-xs p-3 rounded-lg text-sm ${
                    message.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                  }`}
                >
                  {message.message}
                  <div className="text-xs opacity-70 mt-1">
                    {message.time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>
                {message.sender === "user" && (
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={message.avatar || "/placeholder.svg"} />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2 justify-start">
                <Avatar className="h-6 w-6">
                  <AvatarFallback>SA</AvatarFallback>
                </Avatar>
                <div className="bg-gray-100 p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <Button onClick={sendMessage} size="sm">
                Send
              </Button>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-2 mt-2">
              <Button variant="outline" size="sm" className="text-xs">
                <Calendar className="h-3 w-3 mr-1" />
                Schedule Tour
              </Button>
              <Button variant="outline" size="sm" className="text-xs">
                <MapPin className="h-3 w-3 mr-1" />
                Find Properties
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export function InteractiveMap({ properties }: { properties: any[] }) {
  const [selectedProperty, setSelectedProperty] = useState<any>(null)
  const [mapView, setMapView] = useState<"satellite" | "street" | "hybrid">("street")
  const [showFilters, setShowFilters] = useState(false)

  return (
    <Card className="w-full h-96">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Interactive Property Map
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant={mapView === "street" ? "default" : "outline"}
              size="sm"
              onClick={() => setMapView("street")}
            >
              Street
            </Button>
            <Button
              variant={mapView === "satellite" ? "default" : "outline"}
              size="sm"
              onClick={() => setMapView("satellite")}
            >
              Satellite
            </Button>
            <Button
              variant={mapView === "hybrid" ? "default" : "outline"}
              size="sm"
              onClick={() => setMapView("hybrid")}
            >
              Hybrid
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative h-64 bg-gray-200 rounded-lg overflow-hidden">
          {/* Mock Map Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100">
            <div className="absolute inset-0 opacity-20">
              <svg width="100%" height="100%" viewBox="0 0 400 300">
                {/* Mock streets */}
                <path d="M0,150 L400,150" stroke="#666" strokeWidth="2" />
                <path d="M200,0 L200,300" stroke="#666" strokeWidth="2" />
                <path d="M0,75 L400,75" stroke="#999" strokeWidth="1" />
                <path d="M0,225 L400,225" stroke="#999" strokeWidth="1" />
                <path d="M100,0 L100,300" stroke="#999" strokeWidth="1" />
                <path d="M300,0 L300,300" stroke="#999" strokeWidth="1" />
              </svg>
            </div>
          </div>

          {/* Property Markers */}
          {properties.slice(0, 5).map((property, index) => (
            <button
              key={property.id}
              className="absolute w-8 h-8 bg-red-600 rounded-full border-2 border-white shadow-lg hover:scale-110 transition-transform flex items-center justify-center text-white text-xs font-bold"
              style={{
                left: `${20 + index * 15}%`,
                top: `${30 + (index % 2) * 20}%`,
              }}
              onClick={() => setSelectedProperty(property)}
            >
              ${Math.floor(property.value / 1000000)}M
            </button>
          ))}

          {/* Map Controls */}
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <Button variant="secondary" size="sm">
              <Compass className="h-4 w-4" />
            </Button>
            <Button variant="secondary" size="sm">
              <Move3D className="h-4 w-4" />
            </Button>
          </div>

          {/* Property Popup */}
          {selectedProperty && (
            <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg shadow-lg p-4 border">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">{selectedProperty.title}</h3>
                <Button variant="ghost" size="sm" onClick={() => setSelectedProperty(null)}>
                  ×
                </Button>
              </div>
              <p className="text-sm text-gray-600 mb-2">{selectedProperty.subtitle}</p>
              <div className="flex items-center justify-between">
                <span className="font-bold text-lg">${(selectedProperty.value / 1000000).toFixed(1)}M</span>
                <div className="flex gap-2">
                  <Button size="sm">View Details</Button>
                  <Button variant="outline" size="sm">
                    Tour
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
