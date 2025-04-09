"use client"

import { AuthenticatedLayout } from "@/components/layout/authenticated-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mic, Keyboard, Info } from "lucide-react"

export default function HelpPage() {
  return (
    <AuthenticatedLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Help & Documentation</h1>
          <p className="text-muted-foreground">Learn how to use PureMind's features</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mic className="h-5 w-5" />
              Voice Control
            </CardTitle>
            <CardDescription>Use voice commands to navigate the application</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-2">Activating Voice Control</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Press <kbd className="px-2 py-1 bg-muted rounded">Ctrl</kbd> +{" "}
                <kbd className="px-2 py-1 bg-muted rounded">Shift</kbd> +{" "}
                <kbd className="px-2 py-1 bg-muted rounded">Space</kbd> to start recording, or click the microphone icon
                in the header.
              </p>
              <p className="text-sm text-muted-foreground">
                Press the same key combination again or click the microphone icon to stop recording and process your
                command.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Available Commands</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-md p-3">
                  <p className="font-medium">"Open dashboard"</p>
                  <p className="text-sm text-muted-foreground">Navigate to the dashboard</p>
                </div>
                <div className="border rounded-md p-3">
                  <p className="font-medium">"Open lessons"</p>
                  <p className="text-sm text-muted-foreground">Navigate to the lessons page</p>
                </div>
                <div className="border rounded-md p-3">
                  <p className="font-medium">"Open store"</p>
                  <p className="text-sm text-muted-foreground">Navigate to the store</p>
                </div>
                <div className="border rounded-md p-3">
                  <p className="font-medium">"Open settings"</p>
                  <p className="text-sm text-muted-foreground">Navigate to your profile settings</p>
                </div>
                <div className="border rounded-md p-3">
                  <p className="font-medium">"Open AI features"</p>
                  <p className="text-sm text-muted-foreground">Navigate to the AI features page</p>
                </div>
              </div>
            </div>

            <div className="bg-muted p-4 rounded-md mt-4">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium">About Browser Speech Recognition</h4>
                  <p className="text-sm mt-1">
                    This application uses your browser's built-in speech recognition capabilities. No additional models
                    need to be downloaded.
                  </p>
                  <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                    <li>Works in most modern browsers (Chrome, Edge, Safari)</li>
                    <li>Processing happens on your device</li>
                    <li>Command detection uses simple pattern matching</li>
                    <li>For best results, speak clearly and use the exact command phrases</li>
                    <li>Requires microphone permission</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Keyboard className="h-5 w-5" />
              Keyboard Shortcuts
            </CardTitle>
            <CardDescription>Keyboard shortcuts to improve your workflow</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex justify-between items-center border-b pb-2">
                <span className="font-medium">Voice Control</span>
                <div>
                  <kbd className="px-2 py-1 bg-muted rounded">Ctrl</kbd> +{" "}
                  <kbd className="px-2 py-1 bg-muted rounded">Shift</kbd> +{" "}
                  <kbd className="px-2 py-1 bg-muted rounded">Space</kbd>
                </div>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="font-medium">Toggle Dark Mode</span>
                <div>
                  <kbd className="px-2 py-1 bg-muted rounded">Ctrl</kbd> +{" "}
                  <kbd className="px-2 py-1 bg-muted rounded">D</kbd>
                </div>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="font-medium">Go to Dashboard</span>
                <div>
                  <kbd className="px-2 py-1 bg-muted rounded">Alt</kbd> +{" "}
                  <kbd className="px-2 py-1 bg-muted rounded">1</kbd>
                </div>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="font-medium">Go to Lessons</span>
                <div>
                  <kbd className="px-2 py-1 bg-muted rounded">Alt</kbd> +{" "}
                  <kbd className="px-2 py-1 bg-muted rounded">2</kbd>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AuthenticatedLayout>
  )
}
