"use client"

import React, { useState, useEffect, useRef } from "react"
import { Phone, PhoneOff, Mic, MicOff, RefreshCw, Send, CheckCircle, MessageSquare, Play } from "lucide-react"

interface Message {
  sender: "agent" | "user"
  text: string
  timestamp: string
}

// Conversation scripting logic with branch replies
const scriptDatabase = {
  intro: {
    text: "Hi there! I saw you were looking at solar savings for your home in Scottsdale. Is now a good time to chat?",
    options: [
      { id: "busy", label: "I'm too busy right now", text: "Honestly, I'm pretty busy right now. Can you make this quick?" },
      { id: "shade", label: "My roof has too much shade", text: "I don't think my roof qualifies, I have a lot of mature trees and shade." },
      { id: "cost", label: "Is it really $0 down?", text: "I keep seeing ads saying solar is $0 down. Is that actually true, or is it a scam?" }
    ]
  },
  busy: {
    text: "Totally understand, time is valuable! I can make this quick. Most Scottsdale homeowners qualify for the $0-down program, which immediately cuts their bills. What is your average monthly electric bill?",
    options: [
      { id: "bill_high", label: "Over $250/mo", text: "It's pretty high, usually around $280 or $300 in the summer." },
      { id: "bill_low", label: "Under $150/mo", text: "It's pretty low, usually around $120." }
    ]
  },
  shade: {
    text: "That's a very common concern! Spark AI actually scans your roof via satellite in real-time. Shading from trees does reduce output, but with high-efficiency panels and microinverters, we can still offset 70-80% of your bill. How much is your average monthly utility bill?",
    options: [
      { id: "bill_high", label: "Over $250/mo", text: "It's about $290 a month on average." },
      { id: "bill_low", label: "Under $150/mo", text: "Around $130 a month." }
    ]
  },
  cost: {
    text: "I love the skepticism! It's completely true, but it's not 'free money.' It's a structured solar loan or PPA where the bank or solar company pays the upfront installation, and you simply pay for the power generated at a 40-50% lower rate than your current utility. Do you own the property?",
    options: [
      { id: "own_yes", label: "Yes, I own the home", text: "Yes, I own the home. I've been here for 3 years." },
      { id: "own_no", label: "No, I rent", text: "No, I'm just renting the place." }
    ]
  },
  bill_high: {
    text: "Ouch, $280+ is exactly the sweet spot where solar makes the most sense. Based on Scottsdale's utility rate schedule, switching to solar would save you around $160 a month starting from month one. I can set up a quick 10-minute digital layout review with our engineer Marcus. Would Thursday at 2 PM work, or is Friday morning better?",
    options: [
      { id: "book_thurs", label: "Thursday at 2 PM", text: "Thursday at 2 PM works for me." },
      { id: "book_fri", label: "Friday morning", text: "Friday morning at 10 AM is better." }
    ]
  },
  bill_low: {
    text: "Under $150 is actually pretty efficient already! In Arizona, even lower bills can benefit from a smaller system that locks in your rate before utility price hikes. I'd love to have our specialist Marcus review your rooftop layout. Would Thursday at 2 PM or Friday at 10 AM be better to review a quick 3D model?",
    options: [
      { id: "book_thurs", label: "Thursday at 2 PM", text: "Let's do Thursday at 2 PM." },
      { id: "book_fri", label: "Friday at 10 AM", text: "Friday morning works best." }
    ]
  },
  own_yes: {
    text: "Excellent. Homeowners get the full benefit of the 30% Federal ITC tax credit, which makes the financials look amazing. Based on your area, you could see a 60% offset. I'd love to have Marcus draft up a 3D model of your roof. Would Thursday at 2 PM or Friday morning at 10 AM be best for a quick screen share?",
    options: [
      { id: "book_thurs", label: "Thursday at 2 PM", text: "Thursday at 2 PM works." },
      { id: "book_fri", label: "Friday morning", text: "Friday at 10 AM." }
    ]
  },
  own_no: {
    text: "Ah, got it! Since you're renting, the landlord would need to approve the installation to qualify for the utility offsets. I can send you a quick PDF guide on solar for renters to share with your landlord. What is the best email to send that to?",
    options: [
      { id: "rent_email", label: "Provide email", text: "Sure, send it to test@solarhomeowner.com" }
    ]
  },
  book_thurs: {
    text: "Perfect! I have scheduled Thursday at 2 PM for your custom layout review. I'm sending a text confirmation now with Marcus's contact info and a link to your 3D roof mockup. Have a wonderful rest of your day!",
    options: [],
    completed: true
  },
  book_fri: {
    text: "Great! I've booked Friday at 10 AM on Marcus's calendar. You will receive an SMS confirmation in a few seconds with the meeting link. Have a fantastic day!",
    options: [],
    completed: true
  },
  rent_email: {
    text: "Sent! Check your inbox in a couple of minutes. Let us know if your landlord has any questions about the utility agreement. Have a great day!",
    options: [],
    completed: true
  }
}

export default function VoiceAgentSimulator() {
  const [callState, setCallState] = useState<"idle" | "ringing" | "connected" | "completed">("idle")
  const [messages, setMessages] = useState<Message[]>([])
  const [currentStep, setCurrentStep] = useState<keyof typeof scriptDatabase>("intro")
  const [isAgentSpeaking, setIsAgentSpeaking] = useState(false)
  const [agentTyping, setAgentTyping] = useState(false)
  const [waveHeights, setWaveHeights] = useState<number[]>([20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20])
  const [showLogPayload, setShowLogPayload] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const waveIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // Scroll to bottom of message logs
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, agentTyping])

  // Simulate audio wave animations when agent is speaking
  useEffect(() => {
    if (isAgentSpeaking) {
      waveIntervalRef.current = setInterval(() => {
        setWaveHeights(
          Array.from({ length: 15 }, () => Math.floor(Math.random() * 60) + 10)
        )
      }, 100)
    } else {
      if (waveIntervalRef.current) clearInterval(waveIntervalRef.current)
      setWaveHeights(Array.from({ length: 15 }, () => 15))
    }

    return () => {
      if (waveIntervalRef.current) clearInterval(waveIntervalRef.current)
    }
  }, [isAgentSpeaking])

  const getCurrentTime = () => {
    const now = new Date()
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const startCall = () => {
    setCallState("ringing")
    setMessages([])
    setCurrentStep("intro")

    // Ring for 2 seconds, then connect
    setTimeout(() => {
      setCallState("connected")
      triggerAgentSpeech("intro")
    }, 2000)
  }

  const hangUp = () => {
    setCallState("idle")
    setIsAgentSpeaking(false)
    setMessages([])
    if (waveIntervalRef.current) clearInterval(waveIntervalRef.current)
  }

  const triggerAgentSpeech = (stepKey: keyof typeof scriptDatabase) => {
    setAgentTyping(true)
    setIsAgentSpeaking(false)

    // Simulate think/delay time (500ms for realistic AI latency)
    setTimeout(() => {
      setAgentTyping(false)
      setIsAgentSpeaking(true)

      const text = scriptDatabase[stepKey].text
      setMessages((prev) => [
        ...prev,
        {
          sender: "agent",
          text,
          timestamp: getCurrentTime()
        }
      ])

      // Speaking duration correlates roughly to text length
      const speechDuration = Math.min(text.length * 35, 4500)
      setTimeout(() => {
        setIsAgentSpeaking(false)
        if (scriptDatabase[stepKey].completed) {
          setCallState("completed")
        }
      }, speechDuration)
    }, 600)
  }

  const selectOption = (option: { id: string; text: string }) => {
    if (isAgentSpeaking || agentTyping) return // Block responses while agent speaks/thinks

    // Add user response to transcript
    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: option.text,
        timestamp: getCurrentTime()
      }
    ])

    const nextStepKey = option.id as keyof typeof scriptDatabase
    setCurrentStep(nextStepKey)
    triggerAgentSpeech(nextStepKey)
  }

  const currentOptions = scriptDatabase[currentStep]?.options || []

  return (
    <div className="w-full max-w-[560px] mx-auto bg-surface-container rounded-3xl border border-outline-variant/40 overflow-hidden shadow-2xl relative">
      {/* Phone Frame Header */}
      <div className="bg-edge-navy text-white px-6 py-4 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${callState === "connected" ? "bg-green-500 animate-pulse" : callState === "ringing" ? "bg-amber-500 animate-bounce" : "bg-neutral-500"}`} />
          <span className="text-xs font-bold uppercase tracking-widest font-mono text-white/70">
            {callState === "connected" ? "Active Live Call" : callState === "ringing" ? "Incoming Call" : "Simulator Offline"}
          </span>
        </div>
        <div className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded text-[10px] font-mono text-secondary">
          <span>ElevenLabs WebRTC</span>
        </div>
      </div>

      {/* Main Interactive Screen */}
      <div className="h-[360px] bg-slate-950 p-6 flex flex-col justify-between overflow-y-auto relative scrollbar-thin">
        {callState === "idle" && (
          <div className="flex-grow flex flex-col items-center justify-center text-center gap-6 text-white py-8">
            <div className="w-20 h-20 rounded-full bg-secondary/15 flex items-center justify-center text-secondary border border-secondary/30 relative">
              {/* Pulsing glow ring */}
              <div className="absolute inset-0 rounded-full bg-secondary/10 animate-ping duration-1000" />
              <Phone className="w-9 h-9" />
            </div>
            <div>
              <h3 className="font-heading text-lg font-bold text-white">AI Voice Qualification Simulator</h3>
              <p className="text-xs text-white/55 mt-2 leading-relaxed max-w-sm">
                Experience a qualifying conversation with the Spark AI Sales Agent. Answer questions and see how it branches logic.
              </p>
            </div>
            <button
              onClick={startCall}
              className="bg-secondary text-secondary-foreground text-sm font-bold px-6 py-3 rounded-xl hover:bg-solar-amber-bright transition-all flex items-center gap-2 shadow-lg shadow-secondary/20 cursor-pointer"
            >
              <Phone className="w-4 h-4" />
              Receive Test Call
            </button>
          </div>
        )}

        {callState === "ringing" && (
          <div className="flex-grow flex flex-col items-center justify-center text-center gap-6 text-white">
            <div className="w-24 h-24 rounded-full bg-amber-500/20 flex items-center justify-center border border-amber-500/40 relative">
              {/* Multiple rings */}
              <div className="absolute inset-0 rounded-full bg-amber-500/10 animate-ping" style={{ animationDuration: "2s" }} />
              <div className="absolute inset-2 rounded-full bg-amber-500/25 animate-ping" style={{ animationDuration: "1.5s", animationDelay: "0.5s" }} />
              <Phone className="w-10 h-10 text-amber-400 animate-bounce" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">Dialing Homeowner...</p>
              <h4 className="font-heading text-xl font-bold mt-1 text-white">Spark AI Agent</h4>
              <p className="text-xs text-white/40 mt-1">Routing via Scottsdale Utility database</p>
            </div>
            <button
              onClick={hangUp}
              className="bg-red-500 hover:bg-red-600 text-white p-4 rounded-full shadow-lg shadow-red-500/20 cursor-pointer"
            >
              <PhoneOff className="w-5 h-5" />
            </button>
          </div>
        )}

        {(callState === "connected" || callState === "completed") && (
          <>
            {/* Transcript Log */}
            <div className="flex-1 space-y-4 overflow-y-auto pr-2 pb-4 scrollbar-thin">
              {messages.map((m, idx) => (
                <div key={idx} className={`flex flex-col ${m.sender === "user" ? "items-end" : "items-start"}`}>
                  <span className="text-[9px] text-white/30 mb-1 px-1 font-mono">{m.sender === "user" ? "You" : "Spark Agent"} • {m.timestamp}</span>
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                      m.sender === "user"
                        ? "bg-secondary text-secondary-foreground rounded-tr-sm"
                        : "bg-white/10 text-white rounded-tl-sm border border-white/5"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}

              {/* Agent Typing/Thinking Indicator */}
              {agentTyping && (
                <div className="flex flex-col items-start animate-pulse">
                  <span className="text-[9px] text-white/30 mb-1 px-1 font-mono">Spark Agent • Thinking</span>
                  <div className="bg-white/10 border border-white/5 text-white rounded-2xl rounded-tl-sm px-4 py-3 text-xs flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Speaking Audio Waves Graphic */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-between mt-3">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-secondary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  {isAgentSpeaking ? "volume_up" : "mic"}
                </span>
                <span className="text-[10px] text-white/60 font-mono">
                  {isAgentSpeaking ? "Agent Speaking..." : agentTyping ? "Analyzing Input..." : "Agent Listening..."}
                </span>
              </div>
              {/* Animating Wave Bars */}
              <div className="flex items-end gap-0.5 h-8">
                {waveHeights.map((h, i) => (
                  <div
                    key={i}
                    className="w-1 bg-secondary rounded-full transition-all duration-100"
                    style={{ height: `${h}%`, minHeight: "3px" }}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Control / Interactive Options Panel */}
      <div className="bg-slate-905 border-t border-outline-variant/30 p-5">
        {(callState === "connected" && !agentTyping && !isAgentSpeaking) && (
          <div className="space-y-3">
            <p className="text-[10px] text-white/50 uppercase tracking-widest font-bold font-mono text-center">
              Your Response Options (Objections)
            </p>
            <div className="flex flex-col gap-2">
              {currentOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => selectOption(opt)}
                  className="w-full bg-white/10 hover:bg-secondary hover:text-secondary-foreground text-white text-left px-4 py-2.5 rounded-xl border border-white/5 hover:border-secondary transition-all text-xs font-semibold flex items-center justify-between group cursor-pointer"
                >
                  <span>{opt.label}</span>
                  <span className="material-symbols-outlined text-xs opacity-40 group-hover:opacity-100 transition-opacity">arrow_forward</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {(isAgentSpeaking || agentTyping) && (
          <div className="py-6 text-center text-xs text-white/40 font-mono animate-pulse">
            Listening for homeowner response...
          </div>
        )}

        {callState === "completed" && (
          <div className="text-center py-3 space-y-4">
            <div className="flex items-center justify-center gap-2 text-energy-emerald">
              <CheckCircle className="w-5 h-5" />
              <span className="font-heading text-sm font-bold">Lead Successfully Qualified!</span>
            </div>
            <p className="text-[11px] text-white/50 max-w-sm mx-auto leading-relaxed">
              Appointment booked on calendar & full call transcript + intent analysis injected to Salesforce CRM.
            </p>
            <div className="flex gap-2 justify-center">
              <button
                onClick={() => setShowLogPayload(!showLogPayload)}
                className="bg-white/15 hover:bg-white/20 text-white text-xs font-bold px-4 py-2.5 rounded-lg border border-white/10 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                {showLogPayload ? "Hide CRM Payload" : "View CRM Payload"}
              </button>
              <button
                onClick={startCall}
                className="bg-secondary text-secondary-foreground text-xs font-bold px-4 py-2.5 rounded-lg hover:bg-solar-amber-bright flex items-center gap-1.5 transition-all cursor-pointer animate-bounce"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Restart Simulator
              </button>
            </div>

            {showLogPayload && (
              <div className="text-left bg-black border border-white/10 p-3 rounded-lg text-[9px] font-mono text-energy-emerald overflow-x-auto mt-2 max-h-[140px] scrollbar-thin">
                <pre>{JSON.stringify({
                  lead_id: "lead_912384a",
                  status: "QUALIFIED",
                  intent_score: 96,
                  calendar: {
                    event: "Solar 3D Layout Review",
                    assigned_to: "Marcus Thompson",
                    date: "Thursday, 2:00 PM"
                  },
                  notes: "Verified home ownership. Avg bill $280. Expressed interest in $0-down solar loan programs.",
                  call_metadata: {
                    agent_id: "agent_8001k25b",
                    duration: "1m 45s",
                    recording_url: "https://api.spark/voice/rec/lead_912384a.mp3"
                  }
                }, null, 2)}</pre>
              </div>
            )}
          </div>
        )}

        {callState === "idle" && (
          <div className="text-center py-2 text-[10px] text-white/30 font-mono">
            Click 'Receive Test Call' to wake up the agent simulator.
          </div>
        )}

        {/* Hang Up Action */}
        {(callState !== "idle") && (
          <div className="mt-4 pt-3 border-t border-white/10 flex justify-center">
            <button
              onClick={hangUp}
              className="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white px-5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border border-red-500/20 cursor-pointer"
            >
              <PhoneOff className="w-3.5 h-3.5" />
              Hang Up Call
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
