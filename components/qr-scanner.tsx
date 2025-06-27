"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { QrCode, Camera, CheckCircle, XCircle, User, Award, AlertTriangle } from "lucide-react"

// Mock QR scan results
const mockScanResults = [
  {
    id: "INFLO-2024-001247",
    name: "Sarah Kamara",
    creatorName: "TechSarah",
    status: "verified",
    verificationLevel: "Gold",
    contentType: "Technology Blog",
    joinDate: "2024-01-15",
    platforms: ["Blog", "YouTube", "LinkedIn"],
  },
  {
    id: "INFLO-2024-001248",
    name: "Mohamed Bangura",
    creatorName: "SL Blogger",
    status: "pending",
    verificationLevel: "Bronze",
    contentType: "Lifestyle Blog",
    joinDate: "2024-01-18",
    platforms: ["Instagram", "TikTok"],
  },
  {
    id: "INFLO-2024-001249",
    name: "Fatima Sesay",
    creatorName: "EduSL",
    status: "verified",
    verificationLevel: "Silver",
    contentType: "Educational Content",
    joinDate: "2024-01-10",
    platforms: ["YouTube", "Facebook"],
  },
]

export function QRScanner() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScanning, setIsScanning] = useState(false)
  const [scanResult, setScanResult] = useState<any>(null)
  const [error, setError] = useState("")

  const startScan = async () => {
    setIsScanning(true)
    setError("")
    setScanResult(null)

    // Simulate camera access and scanning
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // 80% chance of successful scan
    if (Math.random() > 0.2) {
      const randomResult = mockScanResults[Math.floor(Math.random() * mockScanResults.length)]
      setScanResult(randomResult)
    } else {
      setError("QR code not recognized or creator not found in INFLO database")
    }

    setIsScanning(false)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "pending":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      default:
        return <XCircle className="h-4 w-4 text-red-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      default:
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
    }
  }

  const getVerificationLevelColor = (level: string) => {
    switch (level) {
      case "Gold":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "Silver":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
      case "Bronze":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
      default:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <QrCode className="h-4 w-4 mr-2" />
          Scan QR
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>QR Code Scanner</DialogTitle>
          <DialogDescription>Scan a creator's QR code to instantly verify their INFLO status</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {!scanResult && !error && (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  {isScanning ? (
                    <div className="space-y-4">
                      <div className="w-32 h-32 mx-auto bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                        <div className="animate-pulse">
                          <Camera className="h-12 w-12 text-blue-600" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="animate-pulse h-2 bg-blue-200 dark:bg-blue-800 rounded"></div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Scanning QR code...</p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="w-32 h-32 mx-auto bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                        <QrCode className="h-12 w-12 text-gray-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                          Position the QR code within the camera frame to scan
                        </p>
                        <Button onClick={startScan} className="w-full">
                          <Camera className="h-4 w-4 mr-2" />
                          Start Scanning
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {error && (
            <Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20">
              <CardContent className="pt-6">
                <div className="text-center space-y-2">
                  <XCircle className="h-8 w-8 text-red-600 mx-auto" />
                  <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setError("")
                      setScanResult(null)
                    }}
                  >
                    Try Again
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {scanResult && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    {getStatusIcon(scanResult.status)}
                    Scan Result
                  </CardTitle>
                  <Badge className={getStatusColor(scanResult.status)}>{scanResult.status}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{scanResult.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">@{scanResult.creatorName}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">{scanResult.contentType}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">INFLO ID</span>
                    <p className="font-mono text-xs">{scanResult.id}</p>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Level</span>
                    <div className="mt-1">
                      <Badge className={getVerificationLevelColor(scanResult.verificationLevel)} size="sm">
                        <Award className="h-3 w-3 mr-1" />
                        {scanResult.verificationLevel}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Platforms</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {scanResult.platforms.map((platform: string) => (
                      <Badge key={platform} variant="outline" className="text-xs">
                        {platform}
                      </Badge>
                    ))}
                  </div>
                </div>

                {scanResult.status === "verified" && (
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded p-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-green-800 dark:text-green-200">Verified Creator</span>
                    </div>
                    <p className="text-xs text-green-700 dark:text-green-300 mt-1">
                      This creator is officially verified by INFLO
                    </p>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    className="flex-1"
                    onClick={() => {
                      setScanResult(null)
                      setError("")
                    }}
                  >
                    Scan Another
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setIsOpen(false)}>
                    Close
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
