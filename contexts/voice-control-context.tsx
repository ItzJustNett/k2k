"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { useNotification } from "@/contexts/notification-context"

// Define the commands we want to recognize
const COMMANDS = ["open dashboard", "open lessons", "open store", "open settings", "open ai features"]

interface VoiceControlContextType {
  isListening: boolean
  toggleListening: () => void
  isProcessing: boolean
  transcript: string
  detectedCommand: string | null
}

const VoiceControlContext = createContext<VoiceControlContextType | undefined>(undefined)

export function VoiceControlProvider({ children }: { children: ReactNode }) {
  const [isListening, setIsListening] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [detectedCommand, setDetectedCommand] = useState<string | null>(null)
  const [recognition, setRecognition] = useState<any>(null)
  const router = useRouter()
  const { showNotification } = useNotification()

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Check if browser supports speech recognition
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

      if (SpeechRecognition) {
        const recognitionInstance = new SpeechRecognition()

        // Configure recognition
        recognitionInstance.continuous = false
        recognitionInstance.interimResults = true
        recognitionInstance.lang = "en-US"

        // Set up event handlers
        recognitionInstance.onstart = () => {
          console.log("Speech recognition started")
          setIsListening(true)
          setTranscript("")
          setDetectedCommand(null)
        }

        recognitionInstance.onresult = (event: any) => {
          const currentTranscript = Array.from(event.results)
            .map((result: any) => result[0].transcript)
            .join(" ")

          setTranscript(currentTranscript.toLowerCase().trim())

          // Check for final results
          if (event.results[0].isFinal) {
            detectCommandLocally(currentTranscript.toLowerCase().trim())
          }
        }

        recognitionInstance.onerror = (event: any) => {
          console.error("Speech recognition error:", event.error)
          showNotification(`Speech recognition error: ${event.error}`, "error")
          setIsListening(false)
        }

        recognitionInstance.onend = () => {
          console.log("Speech recognition ended")
          setIsListening(false)
        }

        setRecognition(recognitionInstance)
      } else {
        console.error("Speech recognition not supported in this browser")
        showNotification("Speech recognition is not supported in your browser", "error")
      }
    }
  }, [showNotification])

  // Detect command locally without using server AI
  const detectCommandLocally = (text: string) => {
    setIsProcessing(true)

    try {
      // Simple command detection using string matching
      const normalizedText = text.toLowerCase().trim()

      // Find the best matching command
      let bestMatch = null
      let highestScore = 0

      for (const command of COMMANDS) {
        // Calculate similarity score (simple contains check)
        if (normalizedText.includes(command)) {
          const score = command.length / normalizedText.length
          if (score > highestScore) {
            highestScore = score
            bestMatch = command
          }
        }
      }

      // If no direct match, try fuzzy matching
      if (!bestMatch) {
        for (const command of COMMANDS) {
          const commandWords = command.split(" ")
          let matchedWords = 0

          for (const word of commandWords) {
            if (normalizedText.includes(word)) {
              matchedWords++
            }
          }

          const score = matchedWords / commandWords.length
          if (score > 0.5 && score > highestScore) {
            highestScore = score
            bestMatch = command
          }
        }
      }

      if (bestMatch) {
        setDetectedCommand(bestMatch)
        showNotification(`Command detected: ${bestMatch}`, "success")
        executeCommand(bestMatch)
      } else {
        showNotification("No command detected", "info")
      }
    } catch (error) {
      console.error("Error detecting command:", error)
      showNotification("Error detecting command", "error")
    } finally {
      setIsProcessing(false)
    }
  }

  // Execute the recognized command
  const executeCommand = (command: string) => {
    switch (command) {
      case "open lessons":
        showNotification("Navigating to lessons", "success")
        router.push("/lessons")
        break
      case "open dashboard":
        showNotification("Navigating to dashboard", "success")
        router.push("/dashboard")
        break
      case "open store":
        showNotification("Navigating to store", "success")
        router.push("/store")
        break
      case "open settings":
        showNotification("Navigating to profile settings", "success")
        router.push("/profile")
        break
      case "open ai features":
        showNotification("Navigating to AI features", "success")
        router.push("/ai-features")
        break
      default:
        showNotification(`Command not recognized: ${command}`, "error")
    }
  }

  // Toggle listening state
  const toggleListening = useCallback(() => {
    if (isProcessing) return

    if (!recognition) {
      showNotification("Speech recognition is not supported in your browser", "error")
      return
    }

    if (isListening) {
      recognition.stop()
    } else {
      try {
        recognition.start()
        showNotification("Voice recognition started. Speak your command.", "info")
      } catch (error) {
        console.error("Error starting speech recognition:", error)
        showNotification("Error starting speech recognition", "error")
      }
    }
  }, [isListening, isProcessing, recognition, showNotification])

  // Set up keyboard shortcut (Ctrl+Shift+Space)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.code === "Space") {
        e.preventDefault()
        toggleListening()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [toggleListening])

  return (
    <VoiceControlContext.Provider
      value={{
        isListening,
        toggleListening,
        isProcessing,
        transcript,
        detectedCommand,
      }}
    >
      {children}
    </VoiceControlContext.Provider>
  )
}

export function useVoiceControl() {
  const context = useContext(VoiceControlContext)
  if (context === undefined) {
    throw new Error("useVoiceControl must be used within a VoiceControlProvider")
  }
  return context
}
