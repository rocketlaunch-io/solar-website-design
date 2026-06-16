"use client"

import { useState, useEffect } from "react"

// Smart Shopping Assistant - Interactive chat simulation
export function SmartShoppingIllustration() {
  const [messageIndex, setMessageIndex] = useState(0)
  const messages = [
    { type: "user", text: "Looking for something relaxing" },
    { type: "ai", text: "I recommend our Indica selections! Based on your preference, try Northern Lights." },
    { type: "user", text: "What about for creativity?" },
    { type: "ai", text: "Sativa strains like Sour Diesel are perfect for creative activities!" },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-surface-container/90 backdrop-blur rounded-xl p-4 w-full">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-outline-variant/20">
        <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>smart_toy</span>
        <span className="text-sm font-medium text-foreground">AI Shopping Assistant</span>
        <span className="ml-auto flex items-center gap-1 text-xs text-emerald-400">
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          Online
        </span>
      </div>
      <div className="space-y-3 min-h-[120px]">
        {messages.slice(0, messageIndex + 1).map((msg, i) => (
          <div key={i} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] px-3 py-2 rounded-xl text-xs ${
              msg.type === "user" 
                ? "bg-primary text-primary-foreground" 
                : "bg-surface-container-high text-foreground"
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Flexible Checkout - Payment method carousel
export function FlexibleCheckoutIllustration() {
  const [activeMethod, setActiveMethod] = useState(0)
  const methods = [
    { icon: "credit_card", name: "Credit Card", status: "Active" },
    { icon: "account_balance", name: "Bank Transfer", status: "Active" },
    { icon: "currency_bitcoin", name: "Crypto", status: "Active" },
    { icon: "local_shipping", name: "Cash on Delivery", status: "Active" },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMethod((prev) => (prev + 1) % methods.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-surface-container/90 backdrop-blur rounded-xl p-4 w-full">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-foreground">Payment Methods</span>
        <span className="text-xs text-primary">Smart Routing Active</span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {methods.map((method, i) => (
          <div 
            key={i}
            className={`p-3 rounded-lg border transition-all duration-300 ${
              i === activeMethod 
                ? "border-primary bg-primary/10 scale-105" 
                : "border-outline-variant/20 bg-surface-container-low"
            }`}
          >
            <span className={`material-symbols-outlined text-2xl ${i === activeMethod ? "text-primary" : "text-muted-foreground"}`} style={{ fontVariationSettings: "'FILL' 1" }}>
              {method.icon}
            </span>
            <p className="text-xs font-medium mt-1 text-foreground">{method.name}</p>
            <p className={`text-xs ${i === activeMethod ? "text-primary" : "text-muted-foreground"}`}>{method.status}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// Customer Data Ownership - Data visualization
export function CustomerDataIllustration() {
  const [dataPoints, setDataPoints] = useState([65, 78, 90, 85, 95, 88, 92])
  
  useEffect(() => {
    const interval = setInterval(() => {
      setDataPoints(prev => prev.map(p => Math.min(100, Math.max(50, p + (Math.random() - 0.5) * 10))))
    }, 1500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-surface-container/90 backdrop-blur rounded-xl p-4 w-full">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-foreground">Your Customer Database</span>
        <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">100% Owned</span>
      </div>
      <div className="flex items-end gap-1 h-20 mb-3">
        {dataPoints.map((height, i) => (
          <div 
            key={i}
            className="flex-1 bg-gradient-to-t from-primary/60 to-primary rounded-t transition-all duration-500"
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-2">
        <div className="text-center p-2 bg-surface-container-low rounded-lg">
          <p className="text-lg font-bold text-primary">12.4k</p>
          <p className="text-xs text-muted-foreground">Customers</p>
        </div>
        <div className="text-center p-2 bg-surface-container-low rounded-lg">
          <p className="text-lg font-bold text-primary">98%</p>
          <p className="text-xs text-muted-foreground">Retention</p>
        </div>
        <div className="text-center p-2 bg-surface-container-low rounded-lg">
          <p className="text-lg font-bold text-primary">$0</p>
          <p className="text-xs text-muted-foreground">Data Fees</p>
        </div>
      </div>
    </div>
  )
}

// Lightning Fast Storefront - Speed meter
export function LightningFastIllustration() {
  const [loadTime, setLoadTime] = useState(0.8)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setLoading(true)
      setLoadTime(0)
      let time = 0
      const loadInterval = setInterval(() => {
        time += 0.1
        setLoadTime(parseFloat(time.toFixed(1)))
        if (time >= 0.8) {
          clearInterval(loadInterval)
          setLoading(false)
        }
      }, 100)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-surface-container/90 backdrop-blur rounded-xl p-4 w-full">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-foreground">Page Load Speed</span>
        <span className={`material-symbols-outlined ${loading ? "animate-spin text-yellow-400" : "text-emerald-400"}`}>
          {loading ? "progress_activity" : "check_circle"}
        </span>
      </div>
      <div className="relative h-4 bg-surface-container-low rounded-full overflow-hidden mb-4">
        <div 
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-500 to-primary rounded-full transition-all duration-100"
          style={{ width: `${(loadTime / 3) * 100}%` }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-bold text-foreground">{loadTime}s</span>
        </div>
      </div>
      <div className="flex justify-between text-xs text-muted-foreground mb-4">
        <span>0s</span>
        <span className="text-emerald-400 font-medium">Target: &lt;1s</span>
        <span>3s</span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
          <p className="text-xs text-emerald-400 font-medium">Mobile Score</p>
          <p className="text-lg font-bold text-foreground">98/100</p>
        </div>
        <div className="p-2 bg-primary/10 rounded-lg border border-primary/20">
          <p className="text-xs text-primary font-medium">Desktop Score</p>
          <p className="text-lg font-bold text-foreground">100/100</p>
        </div>
      </div>
    </div>
  )
}

// POS Connection - Sync animation
export function POSConnectionIllustration() {
  const [syncing, setSyncing] = useState(false)
  const [inventory, setInventory] = useState({ store: 142, online: 142 })

  useEffect(() => {
    const interval = setInterval(() => {
      setSyncing(true)
      setInventory({ store: 141, online: 142 })
      setTimeout(() => {
        setInventory({ store: 141, online: 141 })
        setSyncing(false)
      }, 1500)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-surface-container/90 backdrop-blur rounded-xl p-4 w-full">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-foreground">Inventory Sync</span>
        <span className={`text-xs px-2 py-0.5 rounded-full ${syncing ? "bg-yellow-500/20 text-yellow-400" : "bg-emerald-500/20 text-emerald-400"}`}>
          {syncing ? "Syncing..." : "In Sync"}
        </span>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex-1 p-3 bg-surface-container-low rounded-lg text-center">
          <span className="material-symbols-outlined text-2xl text-primary mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>storefront</span>
          <p className="text-xs text-muted-foreground">In-Store</p>
          <p className="text-xl font-bold text-foreground">{inventory.store}</p>
        </div>
        <div className="flex flex-col items-center">
          <span className={`material-symbols-outlined text-primary ${syncing ? "animate-pulse" : ""}`}>
            sync_alt
          </span>
          <span className="text-xs text-muted-foreground mt-1">Real-time</span>
        </div>
        <div className="flex-1 p-3 bg-surface-container-low rounded-lg text-center">
          <span className="material-symbols-outlined text-2xl text-primary mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>language</span>
          <p className="text-xs text-muted-foreground">Online</p>
          <p className="text-xl font-bold text-foreground">{inventory.online}</p>
        </div>
      </div>
    </div>
  )
}

// Multi-Location Inventory - Location map
export function MultiLocationIllustration() {
  const [activeLocation, setActiveLocation] = useState(0)
  const locations = [
    { name: "Downtown", stock: 234, status: "high" },
    { name: "Westside", stock: 89, status: "medium" },
    { name: "Airport", stock: 156, status: "high" },
    { name: "Mall", stock: 45, status: "low" },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLocation((prev) => (prev + 1) % locations.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-surface-container/90 backdrop-blur rounded-xl p-4 w-full">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-foreground">Location Dashboard</span>
        <span className="text-xs text-primary">4 Active Locations</span>
      </div>
      <div className="space-y-2">
        {locations.map((loc, i) => (
          <div 
            key={i}
            className={`flex items-center justify-between p-2 rounded-lg transition-all duration-300 ${
              i === activeLocation ? "bg-primary/10 border border-primary/30" : "bg-surface-container-low"
            }`}
          >
            <div className="flex items-center gap-2">
              <span className={`material-symbols-outlined text-lg ${i === activeLocation ? "text-primary" : "text-muted-foreground"}`} style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
              <span className="text-sm font-medium text-foreground">{loc.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{loc.stock} items</span>
              <span className={`w-2 h-2 rounded-full ${
                loc.status === "high" ? "bg-emerald-400" : 
                loc.status === "medium" ? "bg-yellow-400" : "bg-red-400"
              }`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Smart Back Office - Task automation
export function BackOfficeIllustration() {
  const [taskProgress, setTaskProgress] = useState(0)
  const [currentTask, setCurrentTask] = useState("Updating 247 products...")

  useEffect(() => {
    const tasks = [
      "Updating 247 products...",
      "Applying bulk discounts...",
      "Syncing inventory tags...",
      "Generating reports..."
    ]
    let taskIndex = 0
    
    const interval = setInterval(() => {
      setTaskProgress((prev) => {
        if (prev >= 100) {
          taskIndex = (taskIndex + 1) % tasks.length
          setCurrentTask(tasks[taskIndex])
          return 0
        }
        return prev + 20
      })
    }, 600)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-surface-container/90 backdrop-blur rounded-xl p-4 w-full">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-foreground">Automation Console</span>
        <span className="material-symbols-outlined text-primary animate-pulse" style={{ fontVariationSettings: "'FILL' 1" }}>terminal</span>
      </div>
      <div className="bg-surface-container-lowest rounded-lg p-3 font-mono text-xs mb-3">
        <p className="text-emerald-400 mb-1">$ auto-update --bulk</p>
        <p className="text-muted-foreground">{currentTask}</p>
        <div className="flex items-center gap-2 mt-2">
          <div className="flex-1 h-2 bg-surface-container-low rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${taskProgress}%` }}
            />
          </div>
          <span className="text-primary">{taskProgress}%</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="p-2 bg-surface-container-low rounded-lg text-center">
          <p className="text-lg font-bold text-primary">10+</p>
          <p className="text-xs text-muted-foreground">Hours Saved/Week</p>
        </div>
        <div className="p-2 bg-surface-container-low rounded-lg text-center">
          <p className="text-lg font-bold text-emerald-400">247</p>
          <p className="text-xs text-muted-foreground">Products Updated</p>
        </div>
      </div>
    </div>
  )
}

// Marketing Tools - Campaign preview
export function MarketingToolsIllustration() {
  const [sent, setSent] = useState(0)
  const [opened, setOpened] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setSent(0)
      setOpened(0)
      let s = 0
      let o = 0
      const countInterval = setInterval(() => {
        s += 234
        o += Math.floor(s * 0.42)
        setSent(Math.min(s, 2340))
        setOpened(Math.min(o, 983))
        if (s >= 2340) clearInterval(countInterval)
      }, 150)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-surface-container/90 backdrop-blur rounded-xl p-4 w-full">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-foreground">Campaign Dashboard</span>
        <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">Live</span>
      </div>
      <div className="bg-surface-container-low rounded-lg p-3 mb-3">
        <p className="text-xs text-muted-foreground mb-1">Weekend Flash Sale</p>
        <p className="text-sm font-medium text-foreground mb-2">20% off all Edibles - This Weekend Only!</p>
        <div className="flex gap-2">
          <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded">Email</span>
          <span className="text-xs bg-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded">SMS</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="p-2 bg-surface-container-low rounded-lg">
          <div className="flex items-center gap-1 mb-1">
            <span className="material-symbols-outlined text-primary text-sm">send</span>
            <span className="text-xs text-muted-foreground">Sent</span>
          </div>
          <p className="text-lg font-bold text-foreground">{sent.toLocaleString()}</p>
        </div>
        <div className="p-2 bg-surface-container-low rounded-lg">
          <div className="flex items-center gap-1 mb-1">
            <span className="material-symbols-outlined text-emerald-400 text-sm">visibility</span>
            <span className="text-xs text-muted-foreground">Opened</span>
          </div>
          <p className="text-lg font-bold text-foreground">{opened.toLocaleString()}</p>
        </div>
      </div>
    </div>
  )
}

// Mobile App - Phone mockup with notifications
export function MobileAppIllustration() {
  const [showNotification, setShowNotification] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setShowNotification(true)
      setTimeout(() => setShowNotification(false), 2500)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-surface-container/90 backdrop-blur rounded-xl p-4 w-full flex justify-center">
      <div className="relative">
        {/* Phone frame */}
        <div className="w-32 h-56 bg-surface-container-lowest rounded-2xl border-4 border-outline-variant/30 overflow-hidden">
          {/* Status bar */}
          <div className="h-5 bg-surface-container flex items-center justify-between px-2">
            <span className="text-[8px] text-muted-foreground">9:41</span>
            <div className="flex gap-1">
              <span className="material-symbols-outlined text-[10px] text-muted-foreground">signal_cellular_alt</span>
              <span className="material-symbols-outlined text-[10px] text-muted-foreground">battery_full</span>
            </div>
          </div>
          {/* App content */}
          <div className="p-2">
            <div className="flex items-center gap-1 mb-2">
              <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>local_florist</span>
              <span className="text-[10px] font-bold text-foreground">Your Store</span>
            </div>
            <div className="space-y-1">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-surface-container rounded p-1.5">
                  <div className="flex gap-1">
                    <div className="w-6 h-6 bg-primary/20 rounded" />
                    <div className="flex-1">
                      <div className="h-1.5 bg-outline-variant/30 rounded w-3/4 mb-1" />
                      <div className="h-1 bg-outline-variant/20 rounded w-1/2" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Push notification */}
        <div className={`absolute -top-2 -right-4 w-40 bg-surface-container border border-primary/30 rounded-lg p-2 shadow-lg transition-all duration-300 ${
          showNotification ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
        }`}>
          <div className="flex items-start gap-2">
            <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>notifications</span>
            <div>
              <p className="text-[10px] font-medium text-foreground">New Drop Alert!</p>
              <p className="text-[8px] text-muted-foreground">Fresh batch of Blue Dream just arrived</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Compliance Features - Checklist animation
export function ComplianceIllustration() {
  const [checks, setChecks] = useState([false, false, false, false])
  
  useEffect(() => {
    const items = [
      { index: 0, delay: 300 },
      { index: 1, delay: 600 },
      { index: 2, delay: 900 },
      { index: 3, delay: 1200 },
    ]
    
    const interval = setInterval(() => {
      setChecks([false, false, false, false])
      items.forEach(({ index, delay }) => {
        setTimeout(() => {
          setChecks(prev => {
            const newChecks = [...prev]
            newChecks[index] = true
            return newChecks
          })
        }, delay)
      })
    }, 4000)
    
    // Initial animation
    items.forEach(({ index, delay }) => {
      setTimeout(() => {
        setChecks(prev => {
          const newChecks = [...prev]
          newChecks[index] = true
          return newChecks
        })
      }, delay)
    })
    
    return () => clearInterval(interval)
  }, [])

  const complianceItems = [
    { label: "Age Verification", icon: "how_to_reg" },
    { label: "Tax Calculation", icon: "calculate" },
    { label: "Purchase Limits", icon: "production_quantity_limits" },
    { label: "Audit Trail", icon: "history" },
  ]

  return (
    <div className="bg-surface-container/90 backdrop-blur rounded-xl p-4 w-full">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-foreground">Compliance Check</span>
        <span className={`text-xs px-2 py-0.5 rounded-full ${
          checks.every(c => c) ? "bg-emerald-500/20 text-emerald-400" : "bg-yellow-500/20 text-yellow-400"
        }`}>
          {checks.every(c => c) ? "All Passed" : "Checking..."}
        </span>
      </div>
      <div className="space-y-2">
        {complianceItems.map((item, i) => (
          <div 
            key={i}
            className={`flex items-center justify-between p-2 rounded-lg transition-all duration-300 ${
              checks[i] ? "bg-emerald-500/10 border border-emerald-500/20" : "bg-surface-container-low"
            }`}
          >
            <div className="flex items-center gap-2">
              <span className={`material-symbols-outlined text-lg ${checks[i] ? "text-emerald-400" : "text-muted-foreground"}`} style={{ fontVariationSettings: "'FILL' 1" }}>
                {item.icon}
              </span>
              <span className="text-sm text-foreground">{item.label}</span>
            </div>
            <span className={`material-symbols-outlined text-lg transition-all duration-300 ${
              checks[i] ? "text-emerald-400 scale-110" : "text-muted-foreground opacity-30"
            }`} style={{ fontVariationSettings: "'FILL' 1" }}>
              {checks[i] ? "check_circle" : "radio_button_unchecked"}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
