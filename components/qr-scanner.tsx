"use client"

import { useEffect, useRef, useState } from "react"
import { Html5QrcodeScanner } from "html5-qrcode"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Camera, X } from "lucide-react"
import { parseQRCode } from "@/lib/utils"

interface QRScannerProps {
  onScan: (result: { type: string; creatorId: string }) => void
  onClose: () => void
}

export function QRScanner({ onScan, onClose }: QRScannerProps) {
  const scannerRef = useRef<Html5QrcodeScanner | null>(null)
  const [isScanning, setIsScanning] = useState(false)

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0,
      },
      false,
    )

    scanner.render(
      (decodedText) => {
        const parsed = parseQRCode(decodedText)
        if (parsed) {
          onScan(parsed)
          scanner.clear()
        }
      },
      (error) => {
        console.warn(`QR scan error: ${error}`)
      },
    )

    scannerRef.current = scanner
    setIsScanning(true)

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(console.error)
      }
    }
  }, [onScan])

  const handleClose = () => {
    if (scannerRef.current) {
      scannerRef.current.clear().catch(console.error)
    }
    setIsScanning(false)
    onClose()
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Camera className="h-5 w-5" />
            <CardTitle>QR Code Scanner</CardTitle>
          </div>
          <Button variant="ghost" size="icon" onClick={handleClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <CardDescription>Point your camera at a QR code to scan it</CardDescription>
      </CardHeader>
      <CardContent>
        <div id="qr-reader" className="w-full"></div>
        {isScanning && <p className="text-sm text-muted-foreground mt-4 text-center">Scanning for QR codes...</p>}
      </CardContent>
    </Card>
  )
}
