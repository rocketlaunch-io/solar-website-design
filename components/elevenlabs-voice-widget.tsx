"use client"

import { useConversation, ConversationProvider } from "@elevenlabs/react"
import { useState } from "react"
import { Mic, PhoneOff } from "lucide-react"

function VoiceWidgetInner() {
  const [isOpen, setIsOpen] = useState(false)

  const conversation = useConversation({
    onConnect: () => console.log("[v0] Connected to ElevenLabs"),
    onDisconnect: () => console.log("[v0] Disconnected from ElevenLabs"),
    onError: (error) => console.error("[v0] ElevenLabs error:", error),
  })

  const startConversation = async () => {
    try {
      await conversation.startSession({
        agentId: "agent_1501kd6cs78jfv7r8p6t43rjcpv5",
        connectionType: "webrtc",
      })
      setIsOpen(true)
    } catch (error) {
      console.error("[v0] Failed to start conversation:", error)
    }
  }

  const endConversation = () => {
    conversation.endSession()
    setIsOpen(false)
  }

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen ? (
          <div className="relative">
            {/* Outer pulsating circle */}
            <div
              className="absolute inset-0 rounded-full bg-orange-400/20 animate-ping"
              style={{ animationDuration: "3s" }}
            ></div>
            {/* Middle pulsating circle */}
            <div
              className="absolute inset-1 rounded-full bg-orange-500/30 animate-ping"
              style={{ animationDuration: "2.5s", animationDelay: "0.5s" }}
            ></div>
            {/* Inner pulsating circle */}
            <div
              className="absolute inset-2 rounded-full bg-orange-600/40 animate-ping"
              style={{ animationDuration: "2s", animationDelay: "1s" }}
            ></div>

            <button
              onClick={startConversation}
              className="relative bg-primary hover:bg-primary/90 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-200 group"
              aria-label="Start voice conversation"
            >
              <Mic className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-2xl p-4 min-w-[280px]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">
                  {conversation.status === "connected" ? "Connected" : "Connecting..."}
                </span>
              </div>
              <button
                onClick={endConversation}
                className="text-red-500 hover:text-red-600 p-1"
                aria-label="End conversation"
              >
                <PhoneOff className="w-5 h-5" />
              </button>
            </div>

            <div className="text-center">
              <div className="mb-3">
                {conversation.isSpeaking ? (
                  <div className="relative w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                    <div
                      className="absolute inset-0 rounded-full bg-orange-400/30 animate-ping"
                      style={{ animationDuration: "1.5s" }}
                    ></div>
                    <div
                      className="absolute inset-1 rounded-full bg-orange-500/40 animate-ping"
                      style={{ animationDuration: "1.2s", animationDelay: "0.3s" }}
                    ></div>
                    <div className="relative w-8 h-8 bg-primary rounded-full animate-pulse"></div>
                  </div>
                ) : (
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Mic className="w-8 h-8 text-gray-400" />
                  </div>
                )}
              </div>

              <p className="text-sm text-gray-600 mb-4">
                {conversation.isSpeaking ? "AI is speaking..." : "Speak now or tap to end call"}
              </p>

              <button
                onClick={endConversation}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                End Call
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default function ElevenLabsVoiceWidget() {
  return (
    <ConversationProvider>
      <VoiceWidgetInner />
    </ConversationProvider>
  )
}
