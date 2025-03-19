"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Brain, Send, Sparkles, Clock, Calendar, BookOpen, BarChart3 } from "lucide-react"

export default function LearningAssistant() {
  const [message, setMessage] = useState("")
  const [isExpanded, setIsExpanded] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would send the message to an AI service
    console.log("Message sent:", message)
    setMessage("")
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-green-500" />
            <span>Smart Learning Assistant</span>
          </div>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? "-" : "+"}
          </Button>
        </CardTitle>
        {!isExpanded && <CardDescription>Your personalized AI study companion</CardDescription>}
      </CardHeader>

      {isExpanded && (
        <>
          <CardContent className="pb-3">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="h-4 w-4 text-green-500" />
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 text-sm">
                  <p>Based on your learning patterns, I recommend focusing on these topics:</p>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Decision Trees vs. Random Forests</li>
                    <li>Evaluating Model Performance</li>
                    <li>Feature Engineering Techniques</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                  <Clock className="h-4 w-4 text-blue-500" />
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 text-sm">
                  <p>Your optimal study times based on past performance:</p>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                      <span>9:00 AM - 11:00 AM</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                      <span>4:00 PM - 6:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                  <Calendar className="h-4 w-4 text-purple-500" />
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 text-sm">
                  <p>Suggested study plan for this week:</p>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Monday:</span>
                      <span>Supervised Learning (1 hour)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Wednesday:</span>
                      <span>Decision Trees (1 hour)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Friday:</span>
                      <span>Practice Problems (1 hour)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
              <Textarea
                placeholder="Ask for study tips or schedule adjustments..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="min-h-[60px]"
              />
              <Button type="submit" className="bg-green-500 hover:bg-green-600" disabled={!message.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardContent>

          <CardFooter className="pt-0">
            <div className="grid grid-cols-3 gap-2 w-full">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                <span>Study Plan</span>
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <BarChart3 className="h-4 w-4" />
                <span>Analytics</span>
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Sparkles className="h-4 w-4" />
                <span>Challenges</span>
              </Button>
            </div>
          </CardFooter>
        </>
      )}

      {!isExpanded && (
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center border-2 border-white dark:border-gray-900">
                  <Sparkles className="h-4 w-4 text-green-500" />
                </div>
                <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center border-2 border-white dark:border-gray-900">
                  <Clock className="h-4 w-4 text-blue-500" />
                </div>
                <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center border-2 border-white dark:border-gray-900">
                  <Calendar className="h-4 w-4 text-purple-500" />
                </div>
              </div>
              <span className="text-sm">3 new recommendations</span>
            </div>
            <Button size="sm" className="bg-green-500 hover:bg-green-600" onClick={() => setIsExpanded(true)}>
              View
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  )
}

