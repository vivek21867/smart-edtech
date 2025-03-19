"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { MessageSquare, X, Send, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

type Message = {
  id: string
  content: string
  role: "user" | "assistant"
}

const initialMessages: Message[] = [
  {
    id: "1",
    content: "Hi there! 👋 I'm your SmartLearn AI assistant. How can I help you today?",
    role: "assistant",
  },
]

export default function HelpChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const botResponse = generateResponse(input)
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          content: botResponse,
          role: "assistant",
        },
      ])
      setIsLoading(false)
    }, 1000)
  }

  const generateResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase()

    if (lowerQuery.includes("course") || lowerQuery.includes("lesson")) {
      return "Our platform offers courses on various topics including Machine Learning, Neural Networks, AI Fundamentals, and more. New courses are added regularly. You can find them in the 'My Courses' section."
    } else if (lowerQuery.includes("account") || lowerQuery.includes("login") || lowerQuery.includes("sign")) {
      return "You can manage your account settings by clicking on your profile icon in the top right corner. If you're having trouble logging in, you can reset your password through the login page."
    } else if (lowerQuery.includes("payment") || lowerQuery.includes("subscription") || lowerQuery.includes("price")) {
      return "We offer several subscription plans starting at $9.99/month. All plans include access to our AI-powered learning features. You can view detailed pricing on our pricing page."
    } else if (lowerQuery.includes("certificate") || lowerQuery.includes("completion")) {
      return "Yes, you can earn certificates upon completing courses. These certificates can be shared on LinkedIn or downloaded as PDFs. They're available immediately after course completion."
    } else if (lowerQuery.includes("problem") || lowerQuery.includes("issue") || lowerQuery.includes("help")) {
      return "I'm sorry you're experiencing issues. For technical problems, please email support@smartlearn.ai with details about the issue. Our team typically responds within 24 hours."
    } else {
      return "Thanks for your question! I'm here to help with any questions about our platform, courses, account management, or technical support. Could you provide more details so I can assist you better?"
    }
  }

  return (
    <>
      {/* Chat button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 rounded-full h-14 w-14 p-0 shadow-lg bg-green-500 hover:bg-green-600"
        aria-label="Open help chat"
      >
        <MessageSquare className="h-6 w-6" />
      </Button>

      {/* Chat window */}
      <div
        className={cn(
          "fixed bottom-4 right-4 w-80 sm:w-96 z-50 transition-all duration-300 ease-in-out transform",
          isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none",
        )}
      >
        <Card className="shadow-xl border-green-100 dark:border-green-900/50">
          <CardHeader className="py-3 px-4 flex flex-row items-center justify-between space-y-0 bg-green-500 text-white rounded-t-lg">
            <CardTitle className="text-base font-medium">Help Center</CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 text-white hover:bg-green-600 rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-80 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}>
                  <div
                    className={cn(
                      "rounded-lg px-3 py-2 max-w-[85%]",
                      message.role === "user" ? "bg-green-500 text-white" : "bg-gray-100 dark:bg-gray-800",
                    )}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="rounded-lg px-3 py-2 bg-gray-100 dark:bg-gray-800">
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </CardContent>
          <CardFooter className="p-3 border-t">
            <form onSubmit={handleSubmit} className="flex w-full gap-2">
              <Textarea
                placeholder="Type your question..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="min-h-[40px] resize-none"
              />
              <Button
                type="submit"
                size="icon"
                className="bg-green-500 hover:bg-green-600"
                disabled={!input.trim() || isLoading}
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}

