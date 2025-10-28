import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Shield, Sparkles } from "lucide-react"

export function ScanTab({ mode, onScanComplete }) {
  const [scanUrl, setScanUrl] = useState("")
  const [isScanning, setIsScanning] = useState(false)

  const handleScan = () => {
    setIsScanning(true)
    setTimeout(() => {
      setIsScanning(false)
      if (onScanComplete) {
        onScanComplete(scanUrl)
      }
    }, 2000)
  }

  return (
    <div className="p-6">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary neo-border neo-shadow mb-3">
          <Search className="h-8 w-8 text-primary-foreground" />
        </div>
        <h2 className="font-bold text-xl mb-1 text-foreground">
          Let's Check a Website
        </h2>
        <p className="text-sm text-foreground">
          We'll help you stay safe online
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label
            className="text-sm font-medium mb-2 block text-foreground"
          >
            Website address
          </label>
          <Input
            type="text"
            placeholder="https://example.com"
            value={scanUrl}
            onChange={(e) => setScanUrl(e.target.value)}
            className="neo-border"
          />
          <p className="text-xs mt-2 text-foreground">
            Tip: You can paste any URL or IP address
          </p>
        </div>

        {!isScanning ? (
          <Button
            className="w-full"
            onClick={handleScan}
            disabled={!scanUrl}
          >
            <Shield className="h-4 w-4 mr-2" />
            Check This Site
          </Button>
        ) : (
          <div className="p-8 bg-secondary-background neo-border neo-shadow-lg">
            <div className="flex flex-col items-center gap-4">
              <div className="relative w-20 h-20">
                <div className="absolute inset-0 bg-primary opacity-20 animate-ping"></div>
                <div className="absolute inset-0 bg-primary opacity-75 animate-pulse"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles className="h-8 w-8 text-primary-foreground" />
                </div>
              </div>
              <div className="text-center">
                <div className="font-medium text-foreground">
                  Checking security...
                </div>
                <div className="text-sm text-foreground">
                  This will just take a moment
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Friendly recent scans */}
        <div className="mt-6">
          <h3 className="text-sm font-semibold mb-3 text-foreground">
            Recently Checked
          </h3>
          <div className="space-y-2">
            {[
              { url: "github.com", safe: true },
              { url: "google.com", safe: true },
              { url: "amazon.com", safe: true },
            ].map((site) => (
              <button
                key={site.url}
                className="w-full flex items-center gap-3 p-3 transition-all hover:scale-[1.02] bg-secondary-background neo-border neo-shadow hover:neo-shadow-pressed"
                onClick={() => setScanUrl(`https://${site.url}`)}
              >
                <div className="text-xl">{site.safe ? "✓" : "⚠️"}</div>
                <span className="text-sm flex-1 text-left text-foreground">
                  {site.url}
                </span>
                <Badge variant={site.safe ? "default" : "destructive"} className="text-xs">
                  {site.safe ? "Safe" : "Caution"}
                </Badge>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
