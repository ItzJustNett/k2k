"use client"

import { useVoiceControl } from "@/contexts/voice-control-context"
import { Mic, CheckCircle } from "lucide-react"
import { useEffect, useState } from "react"

export function VoiceControlIndicator() {
  const { isListening, isProcessing, transcript, detectedCommand } = useVoiceControl()
  const [dots, setDots] = useState(".")
  const [visible, setVisible] = useState(false)

  // Show indicator when listening or processing
  useEffect(() => {
    if (isListening || isProcessing) {
      setVisible(true)
    } else {
      // Keep visible for a short time after processing
      const timer = setTimeout(() => {
        setVisible(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [isListening, isProcessing])

  // Animate dots when listening
  useEffect(() => {
    if (!isListening) return

    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "." : prev + "."))
    }, 500)

    return () => clearInterval(interval)
  }, [isListening])

  if (!visible) return null

  return (
    <div className="fixed bottom-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-full shadow-lg flex items-center gap-2 z-50 animate-pulse">
      {isListening ? (
        <>
          <Mic className="h-4 w-4" />
          <span>Listening{dots}</span>
        </>
      ) : isProcessing ? (
        <>
          <div className="h-4 w-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" />
          <span>Processing...</span>
        </>
      ) : detectedCommand ? (
        <>
          <CheckCircle className="h-4 w-4" />
          <span>Command: {detectedCommand}</span>
        </>
      ) : transcript ? (
        <>
          <Mic className="h-4 w-4" />
          <span className="max-w-[200px] truncate">{transcript}</span>
        </>
      ) : null}
    </div>
  )
}
