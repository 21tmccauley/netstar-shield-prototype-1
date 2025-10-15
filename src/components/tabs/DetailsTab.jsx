import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Lock, Info } from "lucide-react"

export function DetailsTab({ mode, onBack, indicator }) {
  // Helper function to determine status based on score
  const getStatusFromScore = (score) => {
    if (score >= 90) return "excellent"
    if (score >= 75) return "good"
    if (score >= 60) return "moderate"
    return "poor"
  }

  // Helper function to get color classes and messages based on status
  const getStatusInfo = (status) => {
    switch (status) {
      case "excellent":
        return {
          bgGradient: mode === "dark" ? "from-green-900/30 to-emerald-900/30" : "from-green-50 to-emerald-50",
          iconBg: "bg-green-100 dark:bg-green-900/50",
          iconColor: "text-green-600 dark:text-green-400",
          textColor: mode === "dark" ? "text-green-300" : "text-green-700",
          scoreColor: "text-green-600 dark:text-green-400",
          badgeBg: "bg-green-500",
          message: "Everything looks perfect!"
        }
      case "good":
        return {
          bgGradient: mode === "dark" ? "from-blue-900/30 to-cyan-900/30" : "from-blue-50 to-cyan-50",
          iconBg: "bg-blue-100 dark:bg-blue-900/50",
          iconColor: "text-blue-600 dark:text-blue-400",
          textColor: mode === "dark" ? "text-blue-300" : "text-blue-700",
          scoreColor: "text-blue-600 dark:text-blue-400",
          badgeBg: "bg-blue-500",
          message: "Looking good!"
        }
      case "moderate":
        return {
          bgGradient: mode === "dark" ? "from-amber-900/30 to-orange-900/30" : "from-amber-50 to-orange-50",
          iconBg: "bg-amber-100 dark:bg-amber-900/50",
          iconColor: "text-amber-600 dark:text-amber-400",
          textColor: mode === "dark" ? "text-amber-300" : "text-amber-700",
          scoreColor: "text-amber-600 dark:text-amber-400",
          badgeBg: "bg-amber-500",
          message: "Could be improved"
        }
      case "poor":
        return {
          bgGradient: mode === "dark" ? "from-red-900/30 to-pink-900/30" : "from-red-50 to-pink-50",
          iconBg: "bg-red-100 dark:bg-red-900/50",
          iconColor: "text-red-600 dark:text-red-400",
          textColor: mode === "dark" ? "text-red-300" : "text-red-700",
          scoreColor: "text-red-600 dark:text-red-400",
          badgeBg: "bg-red-500",
          message: "Needs attention"
        }
      default:
        return {
          bgGradient: mode === "dark" ? "from-gray-900/30 to-slate-900/30" : "from-gray-50 to-slate-50",
          iconBg: "bg-gray-100 dark:bg-gray-900/50",
          iconColor: "text-gray-600 dark:text-gray-400",
          textColor: mode === "dark" ? "text-gray-300" : "text-gray-700",
          scoreColor: "text-gray-600 dark:text-gray-400",
          badgeBg: "bg-gray-500",
          message: "Unknown status"
        }
    }
  }

  const status = indicator?.status || getStatusFromScore(indicator?.score || 100)
  const statusInfo = getStatusInfo(status)

  return (
    <div className="p-6">
      <Button variant="ghost" size="sm" onClick={onBack} className="mb-4">
        ← Back
      </Button>

      {/* Friendly detailed card */}
      <div className={`rounded-2xl p-5 mb-4 bg-gradient-to-br ${statusInfo.bgGradient}`}>
        <div className="flex items-center gap-3 mb-4">
          <div className={`p-3 rounded-xl ${statusInfo.iconBg}`}>
            <Lock className={`h-6 w-6 ${statusInfo.iconColor}`} />
          </div>
          <div>
            <h3 className={`font-bold text-lg ${mode === "dark" ? "text-white" : "text-slate-900"}`}>
              {indicator?.name || "Connection Security"}
            </h3>
            <p className={`text-sm ${statusInfo.textColor}`}>
              {statusInfo.message}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <div className={`text-4xl font-bold ${statusInfo.scoreColor}`}>
            {indicator?.score || 100}
          </div>
          <Badge className={`${statusInfo.badgeBg} text-white`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </div>
      </div>

      {/* Educational insights */}
      <div className="space-y-3">
        <h4
          className={`text-sm font-semibold flex items-center gap-2 ${mode === "dark" ? "text-white" : "text-brand-800"}`}
        >
          <Info className="h-4 w-4" />
          What This Means
        </h4>

        <div className={`p-4 rounded-xl ${mode === "dark" ? "bg-slate-800/50" : "bg-white"}`}>
          <div className="flex gap-3">
            <div>
              <div className={`text-sm font-medium mb-1 ${mode === "dark" ? "text-white" : "text-slate-900"}`}>
                Your connection is encrypted
              </div>
              <div className={`text-xs ${mode === "dark" ? "text-slate-300" : "text-slate-600"}`}>
                This site uses the latest TLS 1.3 protocol to keep your data private and secure.
              </div>
            </div>
          </div>
        </div>

        <div className={`p-4 rounded-xl ${mode === "dark" ? "bg-slate-800/50" : "bg-white"}`}>
          <div className="flex gap-3">
            <div>
              <div className={`text-sm font-medium mb-1 ${mode === "dark" ? "text-white" : "text-slate-900"}`}>
                HTTPS is active
              </div>
              <div className={`text-xs ${mode === "dark" ? "text-slate-300" : "text-slate-600"}`}>
                All your information is encrypted before being sent to the website.
              </div>
            </div>
          </div>
        </div>

        <div className={`p-4 rounded-xl ${mode === "dark" ? "bg-slate-800/50" : "bg-white"}`}>
          <div className="flex gap-3">
            <div>
              <div className={`text-sm font-medium mb-1 ${mode === "dark" ? "text-white" : "text-slate-900"}`}>
                Extra protection enabled
              </div>
              <div className={`text-xs ${mode === "dark" ? "text-slate-300" : "text-slate-600"}`}>
                Perfect Forward Secrecy means even if keys are stolen later, your past conversations stay private.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Learn more section */}
      <div
        className={`mt-4 p-4 rounded-xl border-2 border-dashed ${mode === "dark" ? "border-brand-800 bg-brand-950/30" : "border-brand-200 bg-brand-50"}`}
      >
        <div className={`text-xs font-medium mb-1 ${mode === "dark" ? "text-slate-100" : "text-brand-700"}`}>
          💡 Want to learn more?
        </div>
        <div className={`text-xs ${mode === "dark" ? "text-slate-300" : "text-brand-600"}`}>
          Understanding encryption helps you stay safe online. Tap to read our guide!
        </div>
      </div>
    </div>
  )
}
