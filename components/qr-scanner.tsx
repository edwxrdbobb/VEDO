"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { QrCode, Camera, CheckCircle, XCircle, AlertTriangle, Calendar, Shield, FileText } from "lucide-react"

interface ScanResult {
  id: string
  name: string
  status: "verified" | "pending" | "rejected"
  verificationLevel: string
  joinDate: string
  contentType: string
  lastActivity: string
}

const mockScanResults: Record<string, ScanResult> = {
  "VEDO-2024-001247": {
    id: "VEDO-2024-001247",
    name: "Sarah Kamara (TechSarah)",
    status: "verified",
    verificationLevel: "Gold",
    joinDate: "2024-01-15",
    contentType: "Technology Blog",
    lastActivity: "2024-01-20",
  },
  "VEDO-2024-001248": {
    id: "VEDO-2024-001248",
    name: "Mohamed Bangura (SL Blogger)",
    status: "pending",
    verificationLevel: "Bronze",
    joinDate: "2024-01-18",
    contentType: "Lifestyle Blog",
    lastActivity: "2024-01-19",
  },
  "VEDO-2024-001249": {
    id: "VEDO-2024-001249",
    name: "Fatima Sesay (EduSL)",
    status: "verified",
    verificationLevel: "Silver",
    joinDate: "2024-01-10",
    contentType: "Educational Content",
    lastActivity: "2024-01-21",
  },
}

export function QRScanner() {
  const [isScanning, setIsScanning] = useState(false)
  const [scanResult, setScanResult] = useState<ScanResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const startScanning = async () => {
    setIsScanning(true)
    setError(null)
    setScanResult(null)

    try {
      // Simulate camera access
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play()
      }

      // Simulate QR code detection after 3 seconds
      setTimeout(() => {
        simulateQRDetection()
      }, 3000)
    } catch (err) {
      // If camera access fails, just simulate the scan
      setTimeout(() => {
        simulateQRDetection()
      }, 2000)
    }
  }

  const simulateQRDetection = () => {
    // Randomly select a mock result or simulate "not found"
    const mockIds = Object.keys(mockScanResults)
    const randomChoice = Math.random()

    if (randomChoice < 0.8) {
      // 80% chance of finding a valid creator
      const randomId = mockIds[Math.floor(Math.random() * mockIds.length)]
      setScanResult(mockScanResults[randomId])
    } else {
      // 20% chance of "creator not found"
      setError("Creator not found in VEDO database")
    }

    stopScanning()
  }

  const stopScanning = () => {
    setIsScanning(false)
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach((track) => track.stop())
      videoRef.current.srcObject = null
    }
  }

  const resetScanner = () => {
    setScanResult(null)
    setError(null)
  }

  useEffect(() => {
    return () => {
      stopScanning()
    }
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "pending":
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />
      case "rejected":
        return <XCircle className="h-5 w-5 text-red-600" />
      default:
        return <AlertTriangle className="h-5 w-5 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2 bg-transparent">
          <QrCode className="h-4 w-4" />
          Scan QR Code
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <QrCode className="h-5 w-5" />
            VEDO QR Scanner
          </DialogTitle>
          <DialogDescription>Scan a creator's QR code to verify their VEDO status</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {!isScanning && !scanResult && !error && (
            <div className="text-center py-8">
              <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400 mb-4">Click the button below to start scanning</p>
              <Button onClick={startScanning} className="gap-2">
                <Camera className="h-4 w-4" />
                Start Scanning
              </Button>
            </div>
          )}

          {isScanning && (
            <div className="space-y-4">
              <div className="relative bg-black rounded-lg overflow-hidden">
                <video ref={videoRef} className="w-full h-48 object-cover" playsInline muted />
                <canvas ref={canvasRef} className="hidden" />
                <div className="absolute inset-0 border-2 border-blue-500 rounded-lg">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-32 h-32 border-2 border-white rounded-lg animate-pulse" />
                  </div>
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Position the QR code within the frame</p>
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600" />
                </div>
              </div>
              <Button variant="outline" onClick={stopScanning} className="w-full bg-transparent">
                Cancel Scan
              </Button>
            </div>
          )}

          {error && (
            <div className="space-y-4">
              <Alert>
                <XCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
              <Button onClick={resetScanner} variant="outline" className="w-full bg-transparent">
                Scan Again
              </Button>
            </div>
          )}

          {scanResult && (
            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{scanResult.name}</CardTitle>
                    {getStatusIcon(scanResult.status)}
                  </div>
                  <CardDescription>VEDO ID: {scanResult.id}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Status</span>
                    <Badge className={getStatusColor(scanResult.status)}>
                      {scanResult.status.charAt(0).toUpperCase() + scanResult.status.slice(1)}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Verification Level</span>
                    <Badge variant="outline" className="gap-1">
                      <Shield className="h-3 w-3" />
                      {scanResult.verificationLevel}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Content Type</span>
                    <span className="text-sm font-medium flex items-center gap-1">
                      <FileText className="h-3 w-3" />
                      {scanResult.contentType}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Join Date</span>
                    <span className="text-sm font-medium flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {scanResult.joinDate}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Last Activity</span>
                    <span className="text-sm font-medium">{scanResult.lastActivity}</span>
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-2">
                <Button onClick={resetScanner} variant="outline" className="flex-1 bg-transparent">
                  Scan Another
                </Button>
                <Button onClick={() => setIsOpen(false)} className="flex-1">
                  Done
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
