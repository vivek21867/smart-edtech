"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { CheckCircle, XCircle, ArrowRight } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type Question = {
  id: number
  question: string
  options: string[]
  correctAnswer: number
}

// Define questions for each lesson
const questionsByLesson: Record<string, Question[]> = {
  "ai-vs-ml": [
    {
      id: 1,
      question: "Which of the following best describes the relationship between AI and ML?",
      options: [
        "AI and ML are completely different fields with no overlap",
        "ML is a subset of AI",
        "AI is a subset of ML",
        "AI and ML are exactly the same thing",
      ],
      correctAnswer: 1,
    },
    {
      id: 2,
      question: "What distinguishes machine learning from traditional programming?",
      options: [
        "Machine learning requires more lines of code",
        "Machine learning is always faster than traditional programming",
        "Machine learning learns from data instead of following explicit instructions",
        "Machine learning only works with numerical data",
      ],
      correctAnswer: 2,
    },
    {
      id: 3,
      question: "Which of these is NOT an example of artificial intelligence?",
      options: [
        "A chess program that can beat grandmasters",
        "A spam filter that learns from user feedback",
        "A database that stores customer information",
        "A virtual assistant that can understand natural language",
      ],
      correctAnswer: 2,
    },
  ],
  "neural-networks": [
    {
      id: 1,
      question: "What is the basic computational unit of a neural network?",
      options: ["Bit", "Neuron", "Pixel", "Tensor"],
      correctAnswer: 1,
    },
    {
      id: 2,
      question: "Which of the following is NOT a common type of neural network?",
      options: [
        "Convolutional Neural Network (CNN)",
        "Recurrent Neural Network (RNN)",
        "Quantum Neural Network (QNN)",
        "Transformative Neural Network (TNN)",
      ],
      correctAnswer: 3,
    },
    {
      id: 3,
      question: "What is the purpose of an activation function in a neural network?",
      options: [
        "To initialize the weights",
        "To introduce non-linearity",
        "To normalize the input data",
        "To reduce computational complexity",
      ],
      correctAnswer: 1,
    },
  ],
}

interface QuizSectionProps {
  lessonId: string
  onQuizComplete?: (score: number, totalQuestions: number) => void
}

export default function QuizSection({ lessonId, onQuizComplete }: QuizSectionProps) {
  const { toast } = useToast()
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [showExplanation, setShowExplanation] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)

  useEffect(() => {
    // Reset quiz state when lesson changes
    setQuestions(questionsByLesson[lessonId] || [])
    setCurrentQuestion(0)
    setSelectedOption(null)
    setIsAnswered(false)
    setScore(0)
    setShowExplanation(false)
    setQuizCompleted(false)
  }, [lessonId])

  const handleOptionSelect = (value: string) => {
    setSelectedOption(Number.parseInt(value))
  }

  const checkAnswer = () => {
    if (selectedOption === null) return

    setIsAnswered(true)
    setShowExplanation(true)

    if (selectedOption === questions[currentQuestion]?.correctAnswer) {
      setScore(score + 1)
      toast({
        title: "Correct!",
        description: "Great job! You got the right answer.",
      })
    } else {
      toast({
        title: "Incorrect",
        description: "Don't worry, learning is a process. Check the explanation.",
      })
    }
  }

  const nextQuestion = () => {
    setSelectedOption(null)
    setIsAnswered(false)
    setShowExplanation(false)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setQuizCompleted(true)
      if (onQuizComplete) {
        onQuizComplete(score, questions.length)
      }
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedOption(null)
    setIsAnswered(false)
    setShowExplanation(false)
    setScore(0)
    setQuizCompleted(false)
    toast({
      title: "Quiz Reset",
      description: "You can now retake the quiz.",
    })
  }

  const continueToNextLesson = () => {
    toast({
      title: "Moving to Next Lesson",
      description: "Loading the next lesson in the course.",
    })
    // The parent component will handle the actual navigation
  }

  if (questions.length === 0) {
    return (
      <Card>
        <CardContent className="py-10 text-center">
          <p>No quiz available for this lesson yet.</p>
        </CardContent>
      </Card>
    )
  }

  if (quizCompleted) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Quiz Completed!</CardTitle>
          <CardDescription>
            You scored {score} out of {questions.length}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center py-6">
            <div className="relative mb-4">
              <div className="h-32 w-32 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                <span className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {Math.round((score / questions.length) * 100)}%
                </span>
              </div>
            </div>
            <p className="text-center mb-4">
              {score === questions.length
                ? "Excellent! You've mastered this topic."
                : score >= questions.length / 2
                  ? "Good job! You're making progress."
                  : "Keep practicing! You'll improve with time."}
            </p>
            <div className="w-full p-4 bg-green-50 dark:bg-green-900/20 rounded-lg mb-4">
              <h3 className="font-medium mb-2">AI Recommendation:</h3>
              <p className="text-sm">
                Based on your performance, we recommend focusing on understanding the fundamentals of
                {score < questions.length / 2
                  ? lessonId === "neural-networks"
                    ? " neural network architecture and activation functions"
                    : " the differences between AI and machine learning"
                  : lessonId === "neural-networks"
                    ? " advanced neural network types and applications"
                    : " practical applications of AI and ML in real-world scenarios"}
                .
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={resetQuiz}>
            Retry Quiz
          </Button>
          <Button className="bg-green-500 hover:bg-green-600" onClick={continueToNextLesson}>
            Continue to Next Lesson
          </Button>
        </CardFooter>
      </Card>
    )
  }

  const currentQ = questions[currentQuestion]

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Interactive Quiz</CardTitle>
            <CardDescription>
              Question {currentQuestion + 1} of {questions.length}
            </CardDescription>
          </div>
          <div className="text-sm font-medium">
            Score: {score}/{currentQuestion}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-4">{currentQ?.question}</h3>
          <RadioGroup value={selectedOption?.toString()} onValueChange={handleOptionSelect}>
            <div className="space-y-3">
              {currentQ?.options.map((option, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-2 p-3 rounded-md border ${
                    isAnswered && index === selectedOption
                      ? index === currentQ.correctAnswer
                        ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                        : "border-red-500 bg-red-50 dark:bg-red-900/20"
                      : isAnswered && index === currentQ.correctAnswer
                        ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                        : "border-gray-200 dark:border-gray-800"
                  }`}
                >
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} disabled={isAnswered} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                  {isAnswered && index === currentQ.correctAnswer && <CheckCircle className="h-5 w-5 text-green-500" />}
                  {isAnswered && index === selectedOption && index !== currentQ.correctAnswer && (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>

        {showExplanation && (
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg mb-4">
            <h4 className="font-medium mb-2">Explanation:</h4>
            <p className="text-sm">
              {lessonId === "neural-networks"
                ? currentQuestion === 0
                  ? "A neuron is the fundamental unit of a neural network, inspired by biological neurons. It takes inputs, applies weights, adds a bias, and passes the result through an activation function."
                  : currentQuestion === 1
                    ? "While CNNs, RNNs, and QNNs are all valid types of neural networks, there is no standard architecture called a 'Transformative Neural Network'. The closest would be Transformer networks, which use attention mechanisms."
                    : "Activation functions introduce non-linearity into the network, allowing it to learn complex patterns. Without activation functions, neural networks would only be capable of learning linear relationships."
                : currentQuestion === 0
                  ? "Machine Learning (ML) is a subset of Artificial Intelligence (AI). AI is the broader concept of machines being able to carry out tasks in a way that we would consider 'smart', while ML is a specific approach to achieving AI through algorithms that improve through experience."
                  : currentQuestion === 1
                    ? "Traditional programming requires explicit instructions for every scenario, while machine learning algorithms learn patterns from data and can generalize to new, unseen examples without being explicitly programmed for each case."
                    : "A database that stores customer information is just a repository of data with no intelligence or learning capabilities. The other options all represent systems that exhibit some form of artificial intelligence."}
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end">
        {!isAnswered ? (
          <Button onClick={checkAnswer} disabled={selectedOption === null} className="bg-green-500 hover:bg-green-600">
            Check Answer
          </Button>
        ) : (
          <Button onClick={nextQuestion} className="bg-green-500 hover:bg-green-600">
            {currentQuestion < questions.length - 1 ? (
              <>
                Next Question
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            ) : (
              "Complete Quiz"
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

