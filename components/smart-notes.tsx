"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Download, BookOpen, Lightbulb, ListChecks } from "lucide-react"

interface SmartNotesProps {
  lessonId: string
  onDownloadNotes?: () => void
  onGeneratePractice?: () => void
}

export default function SmartNotes({ lessonId, onDownloadNotes, onGeneratePractice }: SmartNotesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-green-500" />
          Smart Notes & Summaries
        </CardTitle>
        <CardDescription>AI-generated notes based on your learning progress and quiz performance</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="key-concepts">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="key-concepts" className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              <span>Key Concepts</span>
            </TabsTrigger>
            <TabsTrigger value="common-mistakes" className="flex items-center gap-1">
              <Lightbulb className="h-4 w-4" />
              <span>Insights</span>
            </TabsTrigger>
            <TabsTrigger value="practice" className="flex items-center gap-1">
              <ListChecks className="h-4 w-4" />
              <span>Practice</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="key-concepts" className="space-y-4">
            <div className="prose prose-sm dark:prose-invert max-w-none">
              {lessonId === "neural-networks" ? (
                <>
                  <h3>Neural Networks: The Fundamentals</h3>
                  <p>
                    Neural networks are computing systems inspired by the biological neural networks in animal brains.
                    They consist of artificial neurons that transmit signals to each other, forming the foundation of
                    deep learning.
                  </p>

                  <h4>Structure of Neural Networks</h4>
                  <ul>
                    <li>
                      <strong>Input Layer:</strong> Receives the initial data
                      <ul>
                        <li>Each neuron represents a feature in the data</li>
                        <li>No computation occurs at this layer</li>
                      </ul>
                    </li>
                    <li>
                      <strong>Hidden Layers:</strong> Process the inputs using weights and activation functions
                      <ul>
                        <li>Multiple hidden layers make a "deep" neural network</li>
                        <li>Each layer extracts increasingly complex features</li>
                      </ul>
                    </li>
                    <li>
                      <strong>Output Layer:</strong> Produces the final prediction or classification
                      <ul>
                        <li>Format depends on the problem (binary, multi-class, continuous)</li>
                      </ul>
                    </li>
                  </ul>

                  <h4>Key Components</h4>
                  <ul>
                    <li>
                      <strong>Neurons:</strong> Basic computational units that process inputs
                    </li>
                    <li>
                      <strong>Weights:</strong> Parameters that determine the strength of connections
                    </li>
                    <li>
                      <strong>Bias:</strong> Additional parameter that allows shifting the activation function
                    </li>
                    <li>
                      <strong>Activation Functions:</strong> Non-linear functions that determine neuron output
                    </li>
                  </ul>
                </>
              ) : (
                <>
                  <h3>AI vs Machine Learning: Understanding the Differences</h3>
                  <p>
                    Artificial Intelligence (AI) and Machine Learning (ML) are related but distinct concepts in the
                    field of computer science. Understanding their relationship and differences is crucial for grasping
                    the broader landscape of intelligent systems.
                  </p>

                  <h4>Definitions and Relationship</h4>
                  <ul>
                    <li>
                      <strong>Artificial Intelligence (AI):</strong> The broader concept of machines being able to carry
                      out tasks in a way that we would consider "smart"
                      <ul>
                        <li>Encompasses various approaches to creating intelligent behavior</li>
                        <li>Includes rule-based systems, expert systems, and machine learning</li>
                      </ul>
                    </li>
                    <li>
                      <strong>Machine Learning (ML):</strong> A subset of AI that focuses on systems that learn from
                      data
                      <ul>
                        <li>Improves performance through experience without explicit programming</li>
                        <li>Relies on patterns and inference rather than hard-coded rules</li>
                      </ul>
                    </li>
                  </ul>

                  <h4>Key Distinctions</h4>
                  <ul>
                    <li>
                      <strong>Scope:</strong> AI is the broader field; ML is one approach to achieving AI
                    </li>
                    <li>
                      <strong>Approach:</strong> AI can include rule-based systems; ML focuses on data-driven learning
                    </li>
                    <li>
                      <strong>Evolution:</strong> AI has existed since the 1950s; ML gained prominence more recently
                      with increased data availability
                    </li>
                    <li>
                      <strong>Goal:</strong> AI aims to create human-like intelligence; ML specifically targets learning
                      from data
                    </li>
                  </ul>
                </>
              )}
            </div>
          </TabsContent>

          <TabsContent value="common-mistakes" className="space-y-4">
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <h3>Learning Insights</h3>

              <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg mb-4">
                <h4 className="text-amber-800 dark:text-amber-300 mt-0">Areas for Improvement</h4>
                <p className="mb-0">Based on your quiz performance, you might need to focus more on:</p>
                <ul className="mb-0">
                  {lessonId === "neural-networks" ? (
                    <>
                      <li>Understanding the role of activation functions in neural networks</li>
                      <li>Distinguishing between different types of neural network architectures</li>
                    </>
                  ) : (
                    <>
                      <li>Understanding the relationship between AI and ML</li>
                      <li>Identifying real-world applications of machine learning</li>
                    </>
                  )}
                </ul>
              </div>

              <h4>Common Misconceptions</h4>
              <ul>
                {lessonId === "neural-networks" ? (
                  <>
                    <li>
                      <strong>Misconception:</strong> Neural networks work like human brains.
                      <br />
                      <strong>Reality:</strong> While inspired by biological neurons, artificial neural networks
                      function very differently from actual brains.
                    </li>
                    <li>
                      <strong>Misconception:</strong> More layers always lead to better performance.
                      <br />
                      <strong>Reality:</strong> Deeper networks can suffer from vanishing gradients and overfitting
                      without proper design.
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <strong>Misconception:</strong> AI and ML are the same thing.
                      <br />
                      <strong>Reality:</strong> ML is a subset of AI; not all AI approaches involve machine learning.
                    </li>
                    <li>
                      <strong>Misconception:</strong> ML systems truly "understand" the data they process.
                      <br />
                      <strong>Reality:</strong> ML systems recognize patterns but lack true comprehension or contextual
                      understanding.
                    </li>
                  </>
                )}
              </ul>

              <h4>Personalized Tips</h4>
              <ul>
                {lessonId === "neural-networks" ? (
                  <>
                    <li>Try implementing a simple neural network to understand the flow of data</li>
                    <li>Experiment with different activation functions to see their effects</li>
                    <li>Visualize the architecture of popular neural networks like LeNet or AlexNet</li>
                  </>
                ) : (
                  <>
                    <li>Create a comparison chart of AI vs. ML techniques and applications</li>
                    <li>Identify everyday examples of AI and ML in technology you use</li>
                    <li>Explore the historical development of AI and how ML emerged as a subfield</li>
                  </>
                )}
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="practice" className="space-y-4">
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <h3>Practice Questions</h3>

              <div className="space-y-4">
                {lessonId === "neural-networks" ? (
                  <>
                    <div className="p-4 border rounded-lg">
                      <p className="font-medium">
                        1. What happens if you remove all activation functions from a neural network?
                      </p>
                      <ul className="mb-0">
                        <li>A) The network becomes more efficient</li>
                        <li>B) The network can only represent linear transformations</li>
                        <li>C) The network will learn faster</li>
                        <li>D) Nothing changes in the network's capabilities</li>
                      </ul>
                      <p className="text-sm text-muted-foreground mt-2">
                        Hint: Think about what non-linearity brings to neural networks.
                      </p>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <p className="font-medium">
                        2. In a neural network with 3 input neurons, 4 hidden neurons, and 2 output neurons, how many
                        weights are there in total (excluding biases)?
                      </p>
                      <ul className="mb-0">
                        <li>A) 9</li>
                        <li>B) 12</li>
                        <li>C) 20</li>
                        <li>D) 24</li>
                      </ul>
                      <p className="text-sm text-muted-foreground mt-2">
                        Hint: Calculate connections between each layer.
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="p-4 border rounded-lg">
                      <p className="font-medium">
                        1. Which of the following is an example of AI but NOT machine learning?
                      </p>
                      <ul className="mb-0">
                        <li>A) A neural network that recognizes faces</li>
                        <li>B) A rule-based expert system for medical diagnosis</li>
                        <li>C) A recommendation system on a streaming platform</li>
                        <li>D) A clustering algorithm that segments customers</li>
                      </ul>
                      <p className="text-sm text-muted-foreground mt-2">
                        Hint: Look for systems that don't learn from data.
                      </p>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <p className="font-medium">
                        2. What distinguishes modern machine learning from earlier AI approaches?
                      </p>
                      <ul className="mb-0">
                        <li>A) It requires less computational power</li>
                        <li>B) It relies more on data than on hand-crafted rules</li>
                        <li>C) It can only solve classification problems</li>
                        <li>D) It doesn't require human oversight</li>
                      </ul>
                      <p className="text-sm text-muted-foreground mt-2">
                        Hint: Consider the role of data in modern ML systems.
                      </p>
                    </div>
                  </>
                )}

                <div className="p-4 border rounded-lg">
                  <p className="font-medium">3. What is the relationship between deep learning and neural networks?</p>
                  <ul className="mb-0">
                    <li>A) They are completely different approaches to AI</li>
                    <li>B) Deep learning is a subset of neural networks</li>
                    <li>C) Neural networks are a subset of deep learning</li>
                    <li>D) Deep learning refers to neural networks with multiple hidden layers</li>
                  </ul>
                  <p className="text-sm text-muted-foreground mt-2">
                    Hint: Think about what makes a neural network "deep."
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" className="flex items-center gap-2" onClick={onDownloadNotes}>
          <Download className="h-4 w-4" />
          Download Notes
        </Button>
        <Button className="bg-green-500 hover:bg-green-600" onClick={onGeneratePractice}>
          Generate Custom Practice Set
        </Button>
      </CardFooter>
    </Card>
  )
}

