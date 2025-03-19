"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, BookOpen, HelpCircle, BarChart3, Play } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import VideoPlayer from "@/components/video-player"
import QuizSection from "@/components/quiz-section"
import DoubtResolver from "@/components/doubt-resolver"
import SmartNotes from "@/components/smart-notes"
import LearningAssistant from "@/components/learning-assistant"
import HelpChatbot from "@/components/help-chatbot"

// Define course lessons
const lessons = [
  {
    id: "ai-vs-ml",
    title: "AI vs Machine Learning",
    description: "Understand the differences between AI and machine learning with IBM Technology",
    videoId: "4RixMPF4xis",
    startTime: 0,
    difficulty: 2,
  },
  {
    id: "neural-networks",
    title: "What is a Neural Network?",
    description: "Learn the fundamentals of neural networks with Zara Dar",
    videoId: "6PvbVT4_EvU",
    startTime: 83,
    difficulty: 3,
  },
]

export default function HomePage() {
  const { toast } = useToast()
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0)
  const [lessonProgress, setLessonProgress] = useState<Record<string, number>>({})
  const [quizScores, setQuizScores] = useState<Record<string, number>>({})
  const [overallProgress, setOverallProgress] = useState(0)
  const [activeTab, setActiveTab] = useState("quiz")
  const currentLesson = lessons[currentLessonIndex]

  // Initialize progress from localStorage if available
  useEffect(() => {
    const savedProgress = localStorage.getItem("lessonProgress")
    const savedQuizScores = localStorage.getItem("quizScores")

    if (savedProgress) {
      setLessonProgress(JSON.parse(savedProgress))
    }

    if (savedQuizScores) {
      setQuizScores(JSON.parse(savedQuizScores))
    }
  }, [])

  // Calculate overall progress whenever lesson progress or quiz scores change
  useEffect(() => {
    const totalLessons = lessons.length
    let completedLessonsCount = 0

    lessons.forEach((lesson) => {
      const videoProgress = lessonProgress[lesson.id] || 0
      const quizScore = quizScores[lesson.id] || 0

      // Consider a lesson "completed" if video progress is 90%+ and quiz score is 70%+
      if (videoProgress >= 90 && quizScore >= 70) {
        completedLessonsCount += 1
      } else {
        // Partial completion
        const videoWeight = 0.6 // 60% of completion is watching the video
        const quizWeight = 0.4 // 40% of completion is passing the quiz

        completedLessonsCount += (videoProgress / 100) * videoWeight + (quizScore / 100) * quizWeight
      }
    })

    const calculatedProgress = Math.round((completedLessonsCount / totalLessons) * 100)
    setOverallProgress(calculatedProgress)
  }, [lessonProgress, quizScores])

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("lessonProgress", JSON.stringify(lessonProgress))
  }, [lessonProgress])

  useEffect(() => {
    localStorage.setItem("quizScores", JSON.stringify(quizScores))
  }, [quizScores])

  const goToNextLesson = () => {
    if (currentLessonIndex < lessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1)
      toast({
        title: "Next Lesson",
        description: `Loading ${lessons[currentLessonIndex + 1].title}`,
      })
    } else {
      toast({
        title: "Course Complete",
        description: "You've reached the end of the available lessons.",
      })
    }
  }

  const goToPreviousLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1)
      toast({
        title: "Previous Lesson",
        description: `Loading ${lessons[currentLessonIndex - 1].title}`,
      })
    }
  }

  const handleVideoProgress = (progress: number) => {
    setLessonProgress((prev) => ({
      ...prev,
      [currentLesson.id]: Math.max(progress, prev[currentLesson.id] || 0),
    }))
  }

  const handleVideoEnd = () => {
    // Mark the video as 100% complete
    setLessonProgress((prev) => ({
      ...prev,
      [currentLesson.id]: 100,
    }))

    toast({
      title: "Video Complete",
      description: "Great job! Now try the quiz to test your knowledge.",
    })

    // Switch to quiz tab
    setActiveTab("quiz")
  }

  const handleQuizComplete = (score: number, totalQuestions: number) => {
    const percentage = Math.round((score / totalQuestions) * 100)
    setQuizScores((prev) => ({
      ...prev,
      [currentLesson.id]: percentage,
    }))
  }

  const handleSupportClick = () => {
    toast({
      title: "Support",
      description: "Our support team has been notified. We'll get back to you soon.",
    })
  }

  const handleMyLearningClick = () => {
    toast({
      title: "My Learning",
      description: "Viewing your current learning progress and course materials.",
    })
  }

  const handleViewStudyPlanClick = () => {
    toast({
      title: "Study Plan",
      description: "Your personalized study plan is being generated based on your progress.",
    })
  }

  const handleDownloadNotesClick = () => {
    toast({
      title: "Notes Downloaded",
      description: "Your smart notes have been downloaded successfully.",
    })
  }

  const handleGeneratePracticeClick = () => {
    toast({
      title: "Custom Practice Set",
      description: "Generating a personalized practice set based on your performance.",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <header className="border-b bg-white dark:bg-slate-950 sticky top-0 z-10">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-green-500" />
            <h1 className="text-xl font-bold">SmartLearn AI</h1>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="#"
              className="text-sm font-medium hover:text-green-500 transition-colors"
              onClick={() => toast({ title: "Dashboard", description: "Navigating to your dashboard" })}
            >
              Dashboard
            </Link>
            <Link
              href="#"
              className="text-sm font-medium hover:text-green-500 transition-colors"
              onClick={() => toast({ title: "My Courses", description: "Viewing your enrolled courses" })}
            >
              My Courses
            </Link>
            <Link
              href="#"
              className="text-sm font-medium hover:text-green-500 transition-colors"
              onClick={() => toast({ title: "Progress", description: "Checking your learning progress" })}
            >
              Progress
            </Link>
            <Link
              href="#"
              className="text-sm font-medium hover:text-green-500 transition-colors"
              onClick={() => toast({ title: "Notes", description: "Accessing your saved notes" })}
            >
              Notes
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={handleSupportClick}>
              <HelpCircle className="h-4 w-4 mr-2" />
              Support
            </Button>
            <Button size="sm" className="bg-green-500 hover:bg-green-600" onClick={handleMyLearningClick}>
              <BookOpen className="h-4 w-4 mr-2" />
              My Learning
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader className="pb-0">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-2xl">{currentLesson.title}</CardTitle>
                    <CardDescription>{currentLesson.description}</CardDescription>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="font-medium">Difficulty:</span>
                    <span className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span
                          key={i}
                          className={`h-2 w-2 rounded-full ${
                            i < currentLesson.difficulty ? "bg-green-500" : "bg-gray-300 dark:bg-gray-700"
                          }`}
                        />
                      ))}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <VideoPlayer
                  videoId={currentLesson.videoId}
                  startTime={currentLesson.startTime}
                  onProgressChange={handleVideoProgress}
                  onVideoEnd={handleVideoEnd}
                />
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-6">
                <Button variant="outline" size="sm" onClick={goToPreviousLesson} disabled={currentLessonIndex === 0}>
                  <Play className="h-4 w-4 mr-2 rotate-180" />
                  Previous Lesson
                </Button>
                <div className="flex items-center">
                  <span className="text-sm mr-2">Progress: {lessonProgress[currentLesson.id] || 0}%</span>
                  <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 rounded-full"
                      style={{ width: `${lessonProgress[currentLesson.id] || 0}%` }}
                    ></div>
                  </div>
                </div>
                <Button
                  size="sm"
                  className="bg-green-500 hover:bg-green-600"
                  onClick={goToNextLesson}
                  disabled={currentLessonIndex === lessons.length - 1}
                >
                  Next Lesson
                  <Play className="h-4 w-4 ml-2" />
                </Button>
              </CardFooter>
            </Card>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="quiz">Interactive Quiz</TabsTrigger>
                <TabsTrigger value="doubt">Doubt Resolution</TabsTrigger>
                <TabsTrigger value="notes">Smart Notes</TabsTrigger>
              </TabsList>
              <TabsContent value="quiz" className="mt-0">
                <QuizSection lessonId={currentLesson.id} onQuizComplete={handleQuizComplete} />
              </TabsContent>
              <TabsContent value="doubt" className="mt-0">
                <DoubtResolver />
              </TabsContent>
              <TabsContent value="notes" className="mt-0">
                <SmartNotes
                  lessonId={currentLesson.id}
                  onDownloadNotes={handleDownloadNotesClick}
                  onGeneratePractice={handleGeneratePracticeClick}
                />
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-green-500" />
                  Learning Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Course Completion</span>
                      <span className="font-medium">{overallProgress}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: `${overallProgress}%` }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Quiz Performance</span>
                      <span className="font-medium">{quizScores[currentLesson.id] || 0}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${quizScores[currentLesson.id] || 0}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Engagement Score</span>
                      <span className="font-medium">91%</span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500 rounded-full" style={{ width: "91%" }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <LearningAssistant />

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Recommended Next Steps
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-sm">Complete the "Decision Trees" practice exercises</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-sm">Review your notes on "Supervised vs. Unsupervised Learning"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-sm">Watch the supplementary video on "Feature Engineering"</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-green-500 hover:bg-green-600" onClick={handleViewStudyPlanClick}>
                  View Personalized Study Plan
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>

      {/* Help Chatbot */}
      <HelpChatbot />
    </div>
  )
}

