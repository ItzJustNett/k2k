"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useVoiceControl } from "@/contexts/voice-control-context"
import { Mic, MicOff, Bug } from "lucide-react"

export function VoiceControlDebug() {
  const { isListening, toggleListening, isProcessing, transcript, detectedCommand } = useVoiceControl()
  const [showDebug, setShowDebug] = useState(false)

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <Button variant="outline" size="icon" className="rounded-full shadow-lg" onClick={() => setShowDebug(!showDebug)}>
        <Bug className="h-4 w-4" />
      </Button>

      {showDebug && (
        <Card className="absolute bottom-12 left-0 w-80">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Voice Control Debug</CardTitle>
            <CardDescription>Browser Speech Recognition</CardDescription>
          </CardHeader>
          <CardContent className="text-xs space-y-2">
            <div className="flex justify-between">
              <span>Status:</span>
              <span className={isListening ? "text-red-500" : isProcessing ? "text-amber-500" : "text-green-500"}>
                {isListening ? "Listening" : isProcessing ? "Processing" : "Ready"}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Shortcut:</span>
              <span>Ctrl+Shift+Space</span>
            </div>
            <div className="border-t pt-2 mt-2">
              <p className="font-medium">Transcript:</p>
              <p className="text-muted-foreground break-words min-h-[20px]">{transcript || "(No speech detected)"}</p>
            </div>
            <div>
              <p className="font-medium">Detected Command:</p>
              <p className={`${detectedCommand ? "text-green-500" : "text-muted-foreground"}`}>
                {detectedCommand || "(None)"}
              </p>
            </div>
            <div className="text-muted-foreground">
              Available commands: "open dashboard", "open lessons", "open store", "open settings", "open ai features"
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Button
              size="sm"
              className="w-full"
              variant={isListening ? "destructive" : "default"}
              onClick={toggleListening}
              disabled={isProcessing}
            >
              {isListening ? (
                <>
                  <MicOff className="h-4 w-4 mr-2" />
                  Stop Listening
                </>
              ) : (
                <>
                  <Mic className="h-4 w-4 mr-2" />
                  Start Listening
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
