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

  // Educational content for each security indicator
  const getEducationalContent = (indicatorId) => {
    const content = {
      cert: [
        {
          title: "Certificate Validation",
          description: "This website's digital certificate has been verified by a trusted authority, confirming the site owner's identity."
        },
        {
          title: "Expiration Status",
          description: "The certificate is current and properly maintained, showing the site owner actively manages their security."
        },
        {
          title: "Certificate Chain",
          description: "The complete chain of trust from this website to the root certificate authority has been validated successfully."
        }
      ],
      connection: [
        {
          title: "Encryption Protocol",
          description: "Your connection uses modern TLS encryption to scramble data between your browser and the website."
        },
        {
          title: "HTTPS Security",
          description: "All information sent to this website is encrypted before leaving your device, protecting it from interception."
        },
        {
          title: "Forward Secrecy",
          description: "Session keys are temporary and unique, ensuring that even if encryption keys are compromised later, past communications remain secure."
        }
      ],
      domain: [
        {
          title: "Domain History",
          description: "This domain has been analyzed for suspicious activity, malware distribution, and phishing attempts across security databases."
        },
        {
          title: "Trust Signals",
          description: "The domain age, registration patterns, and online presence are evaluated to assess legitimacy."
        },
        {
          title: "Threat Intelligence",
          description: "Cross-referenced with global threat feeds to detect if this domain has been flagged for malicious behavior."
        }
      ],
      credentials: [
        {
          title: "Login Security",
          description: "Evaluates whether this site properly protects passwords and login information during transmission and storage."
        },
        {
          title: "Known Breaches",
          description: "Checked against databases of compromised websites to determine if this site has suffered credential leaks."
        },
        {
          title: "Authentication Standards",
          description: "Assesses if the site follows current best practices for handling user authentication and session management."
        }
      ],
      ip: [
        {
          title: "IP Address Analysis",
          description: "The server's IP address is checked against databases of known malicious infrastructure and compromised hosts."
        },
        {
          title: "Geolocation Verification",
          description: "Server location is verified to match expected hosting patterns for legitimate services."
        },
        {
          title: "Network Reputation",
          description: "The hosting network is evaluated for history of abuse, spam, or malicious activity."
        }
      ],
      dns: [
        {
          title: "DNS Configuration",
          description: "Domain Name System records are examined for proper setup and signs of DNS hijacking or manipulation."
        },
        {
          title: "Record Consistency",
          description: "DNS entries are verified across multiple servers to detect inconsistencies that could indicate attacks."
        },
        {
          title: "Security Extensions",
          description: "Checks for DNSSEC and other security features that prevent DNS spoofing and cache poisoning."
        }
      ],
      whois: [
        {
          title: "Registration Patterns",
          description: "Domain registration information is analyzed for red flags like privacy shields on new domains or suspicious registration details."
        },
        {
          title: "Ownership Transparency",
          description: "Evaluates whether the domain owner provides verifiable contact information and legitimate business details."
        },
        {
          title: "Historical Changes",
          description: "Monitors for rapid ownership changes or other registration patterns commonly associated with fraudulent sites."
        }
      ]
    }
    
    return content[indicatorId] || content.connection // fallback to connection
  }

  const educationalItems = getEducationalContent(indicator?.id)

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

        {educationalItems.map((item, index) => (
          <div key={index} className={`p-4 rounded-xl ${mode === "dark" ? "bg-slate-800/50" : "bg-white"}`}>
            <div className="flex gap-3">
              <div>
                <div className={`text-sm font-medium mb-1 ${mode === "dark" ? "text-white" : "text-slate-900"}`}>
                  {item.title}
                </div>
                <div className={`text-xs ${mode === "dark" ? "text-slate-300" : "text-slate-600"}`}>
                  {item.description}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
