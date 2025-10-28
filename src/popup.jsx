import { StrictMode, useState, useRef } from "react"
import { createRoot } from "react-dom/client"
import { HomeTab } from "@/components/tabs/HomeTab"
import { DetailsTab } from "@/components/tabs/DetailsTab"
import { ScanTab } from "@/components/tabs/ScanTab"
import { AlertsTab } from "@/components/tabs/AlertsTab"
import { SettingsTab } from "@/components/tabs/SettingsTab"
import { Tour } from "@/components/Tour"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Home, Search, Shield, Bell, Settings } from "lucide-react"
import "@/index.css"

function Popup() {
  const [mode, setMode] = useState("light")
  const [activeTab, setActiveTab] = useState("home")
  const [selectedIndicator, setSelectedIndicator] = useState(null)
  const [isTourActive, setIsTourActive] = useState(false)
  const [forceShowIndicators, setForceShowIndicators] = useState(undefined)
  const scrollContainerRef = useRef(null)

  const toggleMode = () => {
    setMode(mode === "light" ? "dark" : "light")
  }

  const handleNavigate = (tab, data) => {
    if (tab === "details") {
      setSelectedIndicator(data)
      setActiveTab("details")
      // Reset scroll position to top when navigating to details
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0
      }
    } else {
      setActiveTab(tab)
    }
  }

  const handleBack = () => {
    setActiveTab("home")
  }

  const handleScanComplete = (url) => {
    setActiveTab("home")
  }

  const handleStartTour = () => {
    setIsTourActive(true)
    setActiveTab("home")
  }

  const handleCloseTour = () => {
    setIsTourActive(false)
    setForceShowIndicators(undefined) // Reset indicator control
  }

  const handleTourStepChange = (stepData) => {
    // Auto-expand indicators when on the security indicators step
    if (stepData.highlightId === "security-indicators") {
      setForceShowIndicators(true)
    } else {
      setForceShowIndicators(undefined)
    }
  }

  const tabs = [
    { id: "home", label: "Home", icon: Home },
    { id: "scan", label: "Scan", icon: Search },
    { id: "alerts", label: "Alerts", icon: Bell },
  ]

  return (
    <div className={mode === "dark" ? "dark" : ""}>
      <div
        className="h-[500px] flex flex-col bg-background"
      >
        {/* Header */}
        <div className="neo-border-b bg-secondary-background">
          <div className="px-4 py-3 flex items-center justify-between">
            <div>
              <h1 className="text-lg font-bold text-foreground">
                NetSTAR
              </h1>
              <p className="text-xs text-foreground">
                Security Guide
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                id="theme-toggle"
                variant="outline"
                size="icon-sm"
                onClick={toggleMode}
              >
                {mode === "light" ? (
                  <Moon className="h-4 w-4 text-foreground" />
                ) : (
                  <Sun className="h-4 w-4 text-accent-yellow" />
                )}
              </Button>
              <Button
                id="settings-button"
                variant="outline"
                size="icon-sm"
                onClick={() => setActiveTab("settings")}
              >
                <Settings className="h-4 w-4 text-foreground" />
              </Button>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div ref={scrollContainerRef} className="flex-1 overflow-y-auto">
          {activeTab === "home" && (
            <HomeTab mode={mode} onNavigate={handleNavigate} forceShowIndicators={forceShowIndicators} />
          )}
          {activeTab === "details" && (
            <DetailsTab mode={mode} onBack={handleBack} indicator={selectedIndicator} />
          )}
          {activeTab === "scan" && (
            <ScanTab mode={mode} onScanComplete={handleScanComplete} />
          )}
          {activeTab === "alerts" && <AlertsTab mode={mode} />}
          {activeTab === "settings" && (
            <SettingsTab mode={mode} onBack={handleBack} onStartTour={handleStartTour} />
          )}
        </div>

        {/* Bottom Tab Navigation */}
        {activeTab !== "details" && activeTab !== "settings" && (
          <div className="neo-border-t bg-secondary-background">
            <div className="flex justify-between gap-1 p-2">
              {tabs.map((tab) => {
                const Icon = tab.icon
                const isActive = activeTab === tab.id
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex flex-col items-center px-5 py-3 transition-all neo-border ${
                      isActive
                        ? "bg-primary text-primary-foreground neo-shadow"
                        : "bg-secondary-background text-foreground hover:bg-accent hover:text-accent-foreground"
                    }`}
                  >
                    <Icon className={`h-5 w-5 ${isActive ? "scale-110" : ""}`} />
                    <span className="text-xs font-medium">{tab.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Tour Component */}
        <Tour
          mode={mode}
          isActive={isTourActive}
          onClose={handleCloseTour}
          currentTab={activeTab}
          onNavigate={handleNavigate}
          onStepChange={handleTourStepChange}
        />
      </div>
    </div>
  )
}

const root = document.getElementById("root")
if (root) {
  createRoot(root).render(
    <StrictMode>
      <Popup />
    </StrictMode>
  )
}
