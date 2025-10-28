import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Lock, Info } from "lucide-react"
import { getStatusFromScore } from "@/lib/securityUtils"
import { getStatusInfo } from "@/lib/themeUtils"

export function DetailsTab({ mode, onBack, indicator }) {
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
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={onBack} 
        className={`mb-4 neo-border neo-shadow hover:neo-shadow-pressed ${mode === "dark" ? "text-slate-200 hover:text-white" : "text-slate-700 hover:text-slate-900"}`}
      >
        ← Back
      </Button>

      {/* Friendly detailed card */}
      <div className={`rounded-2xl p-5 mb-4 bg-gradient-to-br ${statusInfo.bgGradient} neo-border neo-shadow-lg`}>
        <div className="flex items-center gap-3 mb-4">
          <div className={`p-3 rounded-xl ${statusInfo.iconBg} neo-border`}>
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
          <Badge className={`${statusInfo.badgeBg} text-white neo-border`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </div>
      </div>

      {/* Educational insights */}
      <div className="space-y-4">
        <h4
          className={`text-lg font-bold flex items-center gap-2 ${mode === "dark" ? "text-white" : "text-slate-900"}`}
        >
          <Info className="h-5 w-5" />
          What We Checked
        </h4>

        {educationalItems.map((item, index) => (
          <div key={index} className={`p-5 rounded-2xl neo-border neo-shadow ${mode === "dark" ? "bg-slate-800" : "bg-white"}`}>
            <div className="flex gap-4">
              <div className="flex-1">
                <div className={`text-base font-bold mb-2 ${mode === "dark" ? "text-white" : "text-slate-900"}`}>
                  {item.title}
                </div>
                <div className={`text-sm font-medium leading-relaxed ${mode === "dark" ? "text-slate-200" : "text-slate-700"}`}>
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
