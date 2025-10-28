import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Shield,
  Lock,
  Globe,
  Key,
  Server,
  FileText,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from "lucide-react"
import { getStatusFromScore, getStatusMessage } from "@/lib/securityUtils"
import { getColorClasses } from "@/lib/themeUtils"

export function HomeTab({ mode, onNavigate, forceShowIndicators }) {
  const [currentUrl, setCurrentUrl] = useState("")
  const [showIndicators, setShowIndicators] = useState(false)
  const [safetyScore, setSafetyScore] = useState(87) // Default value
  const [securityData, setSecurityData] = useState(null)

  // Allow external control of showIndicators (for tour)
  useEffect(() => {
    if (forceShowIndicators !== undefined) {
      setShowIndicators(forceShowIndicators)
    }
  }, [forceShowIndicators])

  useEffect(() => {
    // Get current tab URL and security data
    if (typeof chrome !== 'undefined' && chrome.runtime) {
      chrome.runtime.sendMessage({ action: 'getCurrentTab' }, (response) => {
        if (response && response.url) {
          try {
            const url = new URL(response.url);
            setCurrentUrl(url.hostname);
          } catch (e) {
            setCurrentUrl("this site");
          }
          
          // Update safety score from background script if available
          if (response.securityData && response.securityData.safetyScore) {
            setSafetyScore(response.securityData.safetyScore);
            setSecurityData(response.securityData);
          }
        }
      });
    } else {
      setCurrentUrl("example.com");
    }
  }, []);

  // 🔧 CHANGE THESE SCORES TO TEST DIFFERENT INDICATOR COLORS (0-100)
  const indicators = [
    { id: "cert", name: "Certificate Health", score: 95, icon: Shield },
    { id: "connection", name: "Connection Security", score: 100, icon: Lock },
    { id: "domain", name: "Domain Reputation", score: 78, icon: Globe },
    { id: "credentials", name: "Credential Safety", score: 85, icon: Key },
    { id: "ip", name: "IP Reputation", score: 92, icon: Server },
    { id: "dns", name: "DNS Record Health", score: 88, icon: FileText },
    { id: "whois", name: "WHOIS Pattern", score: 71, icon: FileText },
  ]

  return (
    <div className="p-6">
      {/* Header with friendly greeting */}
      <div className="text-center mb-6">
        <h2 className="font-bold text-xl mb-1 text-foreground">
          You're Safe Here!
        </h2>
        <p className="text-sm text-foreground">
          {currentUrl} is looking good
        </p>
      </div>

      {/* Friendly Score Display */}
      <div
        id="security-score"
        className="p-6 mb-6 bg-secondary-background neo-border neo-shadow-lg"
      >
        <div className="text-center">
          <div className="inline-flex items-baseline gap-2 mb-2">
            <span className={`text-6xl font-bold bg-gradient-to-r ${getColorClasses(getStatusFromScore(safetyScore)).gradient} bg-clip-text text-transparent`}>
              {safetyScore}
            </span>
            <span className="text-2xl font-medium text-foreground">
              /100
            </span>
          </div>
          <div className="text-sm font-medium text-foreground">
            Safety Score
          </div>
          <div className="flex items-center justify-center gap-1 mt-3">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`w-8 h-1.5 ${
                  i < Math.floor(safetyScore / 20)
                    ? `bg-gradient-to-r ${getColorClasses(getStatusFromScore(safetyScore)).gradient}`
                    : "bg-border"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Friendly Indicators */}
      <div id="security-indicators" className="space-y-3">
        <button
          onClick={() => setShowIndicators(!showIndicators)}
          className="text-sm font-semibold mb-3 flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity text-foreground"
        >
          <Sparkles className="h-4 w-4" />
          What We Checked
          <span className="text-xs ml-auto">{showIndicators ? "▼" : "▶"}</span>
        </button>
        {showIndicators && indicators.map((indicator) => {
          const Icon = indicator.icon
          const status = getStatusFromScore(indicator.score)
          const colors = getColorClasses(status)
          
          return (
            <button
              key={indicator.id}
              onClick={() => onNavigate("details", { ...indicator, status })}
              className="w-full flex items-center gap-3 p-4 transition-all hover:scale-[1.02] bg-secondary-background neo-border neo-shadow hover:neo-shadow-pressed"
            >
              <div className={`p-2 ${colors.bg} neo-border`}>
                <Icon className={`h-4 w-4 ${colors.text}`} />
              </div>
              <div className="flex-1 text-left">
                <div className="text-sm font-medium text-foreground">
                  {indicator.name}
                </div>
                <div className="text-xs text-foreground">
                  {getStatusMessage(status)}
                </div>
              </div>
              {status === "excellent" || status === "good" ? (
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              ) : status === "moderate" ? (
                <AlertCircle className="h-5 w-5 text-amber-500" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-500" />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
