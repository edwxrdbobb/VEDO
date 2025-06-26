"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Upload, File, X, CheckCircle, AlertCircle } from "lucide-react"
import { uploadDocument } from "@/actions/file-upload"

interface FileUploadProps {
  creatorId: string
  documentType: string
  accept?: string
  maxSize?: number // in bytes
  onUploadComplete?: (url: string) => void
}

export function FileUpload({
  creatorId,
  documentType,
  accept = ".pdf,.jpg,.jpeg,.png",
  maxSize = 5 * 1024 * 1024, // 5MB
  onUploadComplete,
}: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (selectedFile: File) => {
    if (selectedFile.size > maxSize) {
      setErrorMessage(`File size must be less than ${maxSize / (1024 * 1024)}MB`)
      setUploadStatus("error")
      return
    }

    setFile(selectedFile)
    setUploadStatus("idle")
    setErrorMessage("")
  }

  const handleUpload = async () => {
    if (!file) return

    setUploading(true)
    setProgress(0)

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 10, 90))
      }, 200)

      const result = await uploadDocument(file, creatorId, documentType)

      clearInterval(progressInterval)
      setProgress(100)

      if (result.success) {
        setUploadStatus("success")
        onUploadComplete?.(result.url!)
      } else {
        setUploadStatus("error")
        setErrorMessage(result.message || "Upload failed")
      }
    } catch (error) {
      setUploadStatus("error")
      setErrorMessage("Upload failed. Please try again.")
    } finally {
      setUploading(false)
    }
  }

  const handleRemove = () => {
    setFile(null)
    setUploadStatus("idle")
    setProgress(0)
    setErrorMessage("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="space-y-4">
      {!file ? (
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-400 transition-colors"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
          <p className="text-xs text-gray-500">
            {accept.replace(/\./g, "").toUpperCase()} up to {maxSize / (1024 * 1024)}MB
          </p>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept={accept}
            onChange={(e) => {
              const selectedFile = e.target.files?.[0]
              if (selectedFile) handleFileSelect(selectedFile)
            }}
          />
        </div>
      ) : (
        <div className="border rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <File className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium">{file.name}</span>
              <span className="text-xs text-gray-500">({(file.size / (1024 * 1024)).toFixed(2)} MB)</span>
            </div>
            <div className="flex items-center gap-2">
              {uploadStatus === "success" && <CheckCircle className="h-4 w-4 text-green-600" />}
              {uploadStatus === "error" && <AlertCircle className="h-4 w-4 text-red-600" />}
              <Button variant="ghost" size="sm" onClick={handleRemove} disabled={uploading}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {uploading && (
            <div className="mb-2">
              <Progress value={progress} className="h-2" />
              <p className="text-xs text-gray-500 mt-1">Uploading... {progress}%</p>
            </div>
          )}

          {errorMessage && <p className="text-xs text-red-600 mb-2">{errorMessage}</p>}

          {uploadStatus === "success" && <p className="text-xs text-green-600 mb-2">Upload completed successfully!</p>}

          {uploadStatus !== "success" && (
            <Button onClick={handleUpload} disabled={uploading} size="sm" className="w-full">
              {uploading ? "Uploading..." : "Upload File"}
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
