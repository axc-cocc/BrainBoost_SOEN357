"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { CheckCircle2, XCircle, HelpCircle, ArrowRight, ArrowLeft, RotateCcw } from "lucide-react"

// Mock data
const quizData = {
  title: "Biology Fundamentals",
  totalQuestions: 5,
  mcqQuestions: [
    {
      id: 1,
      question: "Which organelle is known as the 'powerhouse of the cell'?",
      options: [
        { id: "a", text: "Nucleus" },
        { id: "b", text: "Mitochondria" },
        { id: "c", text: "Endoplasmic Reticulum" },
        { id: "d", text: "Golgi Apparatus" },
      ],
      correctAnswer: "b",
      explanation:
        "Mitochondria are called the powerhouse of the cell because they generate most of the cell's supply of adenosine triphosphate (ATP), used as a source of chemical energy.",
    },
    {
      id: 2,
      question: "What is the primary function of chloroplasts in plant cells?",
      options: [
        { id: "a", text: "Cellular respiration" },
        { id: "b", text: "Protein synthesis" },
        { id: "c", text: "Photosynthesis" },
        { id: "d", text: "Waste removal" },
      ],
      correctAnswer: "c",
      explanation:
        "Chloroplasts contain chlorophyll and are responsible for photosynthesis, the process of converting light energy into chemical energy.",
    },
    {
      id: 3,
      question: "Which of the following is NOT a phase of mitosis?",
      options: [
        { id: "a", text: "Prophase" },
        { id: "b", text: "Metaphase" },
        { id: "c", text: "Interphase" },
        { id: "d", text: "Telophase" },
      ],
      correctAnswer: "c",
      explanation:
        "Interphase is not a phase of mitosis. It is the period between cell divisions when the cell grows and replicates its DNA in preparation for mitosis.",
    },
    {
      id: 4,
      question: "What is the main function of the cell membrane?",
      options: [
        { id: "a", text: "Energy production" },
        { id: "b", text: "Protein synthesis" },
        { id: "c", text: "Selective permeability" },
        { id: "d", text: "DNA replication" },
      ],
      correctAnswer: "c",
      explanation:
        "The cell membrane provides selective permeability, controlling what enters and exits the cell through various transport mechanisms.",
    },
    {
      id: 5,
      question: "Which of these is a product of photosynthesis?",
      options: [
        { id: "a", text: "Carbon dioxide" },
        { id: "b", text: "Water" },
        { id: "c", text: "Oxygen" },
        { id: "d", text: "Nitrogen" },
      ],
      correctAnswer: "c",
      explanation: "Photosynthesis produces glucose and oxygen. The oxygen is released as a byproduct of the process.",
    },
  ],
  flashcards: [
    {
      id: 1,
      question: "What is the function of the nucleus?",
      answer:
        "The nucleus contains the cell's genetic material (DNA) and controls cellular activities such as growth, metabolism, protein synthesis, and reproduction.",
    },
    {
      id: 2,
      question: "Define cellular respiration.",
      answer:
        "Cellular respiration is the process by which cells convert nutrients into energy in the form of ATP. It requires oxygen and produces carbon dioxide and water as waste products.",
    },
    {
      id: 3,
      question: "What is the difference between prokaryotic and eukaryotic cells?",
      answer:
        "Prokaryotic cells lack a nucleus and membrane-bound organelles, while eukaryotic cells have a true nucleus and various membrane-bound organelles.",
    },
    {
      id: 4,
      question: "Explain the process of osmosis.",
      answer:
        "Osmosis is the movement of water molecules across a semipermeable membrane from an area of lower solute concentration to an area of higher solute concentration.",
    },
    {
      id: 5,
      question: "What are enzymes and what is their role in cells?",
      answer:
        "Enzymes are biological catalysts that speed up chemical reactions in cells without being consumed in the process. They lower the activation energy required for reactions to occur.",
    },
  ],
}

export default function QuizPage() {
  const [quizMode, setQuizMode] = useState<"mcq" | "flashcard">("mcq")
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false)
  const [showAnswer, setShowAnswer] = useState(false)
  const [score, setScore] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)

  const handleAnswerSelect = (answerId: string) => {
    if (!isAnswerSubmitted) {
      setSelectedAnswer(answerId)
    }
  }

  const handleSubmitAnswer = () => {
    if (selectedAnswer) {
      setIsAnswerSubmitted(true)

      if (quizMode === "mcq") {
        const currentMcq = quizData.mcqQuestions[currentQuestion]
        if (selectedAnswer === currentMcq.correctAnswer) {
          setScore((prev) => prev + 1)
        }
      }
    }
  }

  const handleNextQuestion = () => {
    const totalQuestions = quizMode === "mcq" ? quizData.mcqQuestions.length : quizData.flashcards.length

    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion((prev) => prev + 1)
      setSelectedAnswer(null)
      setIsAnswerSubmitted(false)
      setShowAnswer(false)
    } else {
      setQuizCompleted(true)
    }
  }

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
      setSelectedAnswer(null)
      setIsAnswerSubmitted(false)
      setShowAnswer(false)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setIsAnswerSubmitted(false)
    setShowAnswer(false)
    setScore(0)
    setQuizCompleted(false)
  }

  const currentProgress = ((currentQuestion + 1) / quizData.totalQuestions) * 100

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Quiz Mode</h1>
        <p className="text-muted-foreground">Test your knowledge with AI-generated quizzes</p>
      </div>

      <Tabs
        defaultValue="mcq"
        value={quizMode}
        onValueChange={(v) => {
          setQuizMode(v as "mcq" | "flashcard")
          resetQuiz()
        }}
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="mcq">Multiple Choice</TabsTrigger>
          <TabsTrigger value="flashcard">Flashcards</TabsTrigger>
        </TabsList>

        <div className="mt-6">
          {!quizCompleted ? (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>{quizData.title}</CardTitle>
                    <CardDescription>
                      Question {currentQuestion + 1} of {quizData.totalQuestions}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">
                      Score: {score}/{quizData.totalQuestions}
                    </div>
                  </div>
                </div>
                <Progress value={currentProgress} className="h-2 mt-2" />
              </CardHeader>

              <CardContent>
                <TabsContent value="mcq" className="mt-0">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">{quizData.mcqQuestions[currentQuestion].question}</h3>

                    <RadioGroup value={selectedAnswer || ""} onValueChange={handleAnswerSelect}>
                      {quizData.mcqQuestions[currentQuestion].options.map((option) => (
                        <div
                          key={option.id}
                          className={`flex items-center space-x-2 p-3 rounded-md border ${
                            isAnswerSubmitted && option.id === quizData.mcqQuestions[currentQuestion].correctAnswer
                              ? "border-green-500 bg-green-50"
                              : isAnswerSubmitted && option.id === selectedAnswer
                                ? "border-red-500 bg-red-50"
                                : "border-input"
                          }`}
                        >
                          <RadioGroupItem value={option.id} id={`option-${option.id}`} disabled={isAnswerSubmitted} />
                          <Label htmlFor={`option-${option.id}`} className="flex-1 cursor-pointer">
                            {option.text}
                          </Label>
                          {isAnswerSubmitted && option.id === quizData.mcqQuestions[currentQuestion].correctAnswer && (
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                          )}
                          {isAnswerSubmitted &&
                            option.id === selectedAnswer &&
                            option.id !== quizData.mcqQuestions[currentQuestion].correctAnswer && (
                              <XCircle className="h-5 w-5 text-red-500" />
                            )}
                        </div>
                      ))}
                    </RadioGroup>

                    {isAnswerSubmitted && (
                      <div className="mt-4 p-4 bg-muted rounded-md">
                        <h4 className="font-medium mb-1">Explanation:</h4>
                        <p>{quizData.mcqQuestions[currentQuestion].explanation}</p>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="flashcard" className="mt-0">
                  <div
                    className={`min-h-[200px] p-6 border rounded-md flex items-center justify-center cursor-pointer transition-all ${
                      showAnswer ? "bg-muted" : "hover:bg-muted/50"
                    }`}
                    onClick={() => setShowAnswer(!showAnswer)}
                  >
                    <div className="text-center">
                      {!showAnswer ? (
                        <>
                          <h3 className="text-lg font-medium mb-4">{quizData.flashcards[currentQuestion].question}</h3>
                          <div className="flex items-center justify-center text-muted-foreground">
                            <HelpCircle className="h-5 w-5 mr-2" />
                            <span>Click to reveal answer</span>
                          </div>
                        </>
                      ) : (
                        <p>{quizData.flashcards[currentQuestion].answer}</p>
                      )}
                    </div>
                  </div>
                </TabsContent>
              </CardContent>

              <CardFooter className="flex justify-between">
                <div>
                  <Button variant="outline" onClick={handlePrevQuestion} disabled={currentQuestion === 0}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>
                </div>

                <div className="flex space-x-2">
                  {quizMode === "mcq" && !isAnswerSubmitted ? (
                    <Button onClick={handleSubmitAnswer} disabled={!selectedAnswer}>
                      Submit Answer
                    </Button>
                  ) : (
                    <Button onClick={handleNextQuestion}>
                      {currentQuestion < quizData.totalQuestions - 1 ? (
                        <>
                          Next
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </>
                      ) : (
                        "Finish Quiz"
                      )}
                    </Button>
                  )}
                </div>
              </CardFooter>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Quiz Completed!</CardTitle>
                <CardDescription>You've completed the {quizData.title} quiz</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="text-center py-6">
                  <div className="text-5xl font-bold mb-4">
                    {score}/{quizData.totalQuestions}
                  </div>
                  <p className="text-muted-foreground mb-6">
                    {score === quizData.totalQuestions
                      ? "Perfect score! Excellent work!"
                      : score >= quizData.totalQuestions / 2
                        ? "Good job! Keep practicing to improve."
                        : "Keep studying and try again to improve your score."}
                  </p>

                  <div className="flex justify-center space-x-4">
                    <Button onClick={resetQuiz}>
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Restart Quiz
                    </Button>
                    <Button variant="outline">Review Answers</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </Tabs>
    </div>
  )
}
