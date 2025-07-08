import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateQRCode(creatorId: string): string {
  return `CREATOR:${creatorId}:${Date.now()}`
}

export function parseQRCode(qrData: string): { type: string; creatorId: string } | null {
  const parts = qrData.split(":")
  if (parts.length >= 2 && parts[0] === "CREATOR") {
    return {
      type: "creator",
      creatorId: parts[1],
    }
  }
  return null
}
