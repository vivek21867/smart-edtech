"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, Video, FileText, Lightbulb, Send, Loader2, Play } from "lucide-react"

type Message = {
  id: string
  content: string
  type: "user" | "ai"
  format?: "text" | "video" | "diagram"
}

export default function DoubtResolver() {
  const [question, setQuestion] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [responseFormat, setResponseFormat] = useState<"text" | "video" | "diagram">("text")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!question.trim()) return

    // Add user message
    const newUserMessage: Message = {
      id: Date.now().toString(),
      content: question,
      type: "user",
    }

    setMessages([...messages, newUserMessage])
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      let aiResponse: Message

      if (responseFormat === "text") {
        aiResponse = {
          id: (Date.now() + 1).toString(),
          content: generateTextResponse(question),
          type: "ai",
          format: "text",
        }
      } else if (responseFormat === "video") {
        aiResponse = {
          id: (Date.now() + 1).toString(),
          content: "AI-generated video explanation",
          type: "ai",
          format: "video",
        }
      } else {
        aiResponse = {
          id: (Date.now() + 1).toString(),
          content: "AI-generated diagram explanation",
          type: "ai",
          format: "diagram",
        }
      }

      setMessages((prev) => [...prev, aiResponse])
      setIsLoading(false)
      setQuestion("")
    }, 1500)
  }

  const generateTextResponse = (query: string) => {
    // Simple response generation based on keywords
    if (query.toLowerCase().includes("activation function")) {
      return "Activation functions introduce non-linearity into neural networks. Common activation functions include:\n\n1. ReLU (Rectified Linear Unit): f(x) = max(0, x)\n2. Sigmoid: f(x) = 1 / (1 + e^(-x))\n3. Tanh: f(x) = (e^x - e^(-x)) / (e^x + e^(-x))\n4. Softmax: Used for multi-class classification in output layers\n\nReLU is most commonly used in hidden layers due to its computational efficiency and ability to mitigate the vanishing gradient problem."
    } else if (query.toLowerCase().includes("backpropagation")) {
      return "Backpropagation is the primary algorithm used to train neural networks. It works by:\n\n1. Forward pass: Input data passes through the network to generate predictions\n2. Error calculation: The difference between predictions and actual values is computed\n3. Backward pass: The error is propagated backward through the network\n4. Weight updates: Network parameters are adjusted to minimize the error\n\nThis process uses the chain rule of calculus to efficiently calculate gradients for each weight in the network."
    } else {
      return "Neural networks are computational systems inspired by the human brain. They consist of layers of interconnected nodes (neurons) that process information. Each connection has a weight that adjusts as the network learns.\n\nNeural networks excel at:\n\n1. Image and speech recognition\n2. Natural language processing\n3. Pattern recognition in complex data\n4. Generating creative content\n\nThe power of neural networks comes from their ability to learn representations of data through multiple layers of abstraction. Would you like me to explain any specific aspect of neural networks in more detail?"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-green-500" />
          AI Doubt Resolution
        </CardTitle>
        <CardDescription>Ask any question about the lesson and get instant AI-generated explanations</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Tabs value={responseFormat} onValueChange={(v) => setResponseFormat(v as any)}>
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="text" className="flex items-center gap-1">
                <FileText className="h-4 w-4" />
                <span>Text</span>
              </TabsTrigger>
              <TabsTrigger value="video" className="flex items-center gap-1">
                <Video className="h-4 w-4" />
                <span>Video</span>
              </TabsTrigger>
              <TabsTrigger value="diagram" className="flex items-center gap-1">
                <Lightbulb className="h-4 w-4" />
                <span>Diagram</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="space-y-4 mb-4 max-h-[300px] overflow-y-auto p-1">
          {messages.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Lightbulb className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>Ask any question about machine learning concepts</p>
              <p className="text-sm mt-1">
                For example: "What is a decision tree?" or "Explain supervised vs unsupervised learning"
              </p>
            </div>
          ) : (
            messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`rounded-lg px-4 py-2 max-w-[80%] ${
                    message.type === "user" ? "bg-green-500 text-white" : "bg-gray-100 dark:bg-gray-800"
                  }`}
                >
                  {message.format === "video" ? (
                    <div className="bg-black rounded-md aspect-video flex items-center justify-center mb-2">
                      <Play className="h-8 w-8 text-white opacity-70" />
                    </div>
                  ) : message.format === "diagram" ? (
                    <div className="bg-white dark:bg-gray-700 rounded-md p-3 mb-2">
                      <img
                        src="/placeholder.svg?height=200&width=400"
                        alt="AI-generated diagram"
                        className="w-full h-auto"
                      />
                    </div>
                  ) : null}
                  <p className="whitespace-pre-line">{message.content}</p>
                </div>
              </div>
            ))
          )}
          {isLoading && (
            <div className="flex justify-start">
              <div className="rounded-lg px-4 py-2 bg-gray-100 dark:bg-gray-800">
                <Loader2 className="h-5 w-5 animate-spin" />
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <Textarea
            placeholder="Type your question here..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="min-h-[60px]"
          />
          <Button type="submit" className="bg-green-500 hover:bg-green-600" disabled={isLoading || !question.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

