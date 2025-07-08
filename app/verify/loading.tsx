import { Shield } from "lucide-react"

export default function VerifyLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="flex flex-col items-center justify-center space-y-4">
        <Shield className="h-16 w-16 text-primary animate-pulse" />
        <h2 className="text-2xl font-bold">Verifying...</h2>
      </div>
    </div>
  )
}
