"use client"

import { Button } from "@/components/ui/button"
import { useVoiceControl } from "@/contexts/voice-control-context"
import { Mic, MicOff, Loader2 } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function VoiceControlButton() {
  const { isListening, toggleListening, isProcessing } = useVoiceControl()

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={isListening ? "destructive" : "outline"}
            size="icon"
            onClick={toggleListening}
            disabled={isProcessing}
            className="relative"
          >
            {isProcessing ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : isListening ? (
              <MicOff className="h-4 w-4" />
            ) : (
              <Mic className="h-4 w-4" />
            )}
            {isListening && <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500 animate-pulse" />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>
            {isProcessing
              ? "Processing voice command..."
              : isListening
                ? "Stop recording (Ctrl+Shift+Space)"
                : "Start voice command (Ctrl+Shift+Space)"}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Say: "open dashboard", "open lessons", "open store", etc.
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
