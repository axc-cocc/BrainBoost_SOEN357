import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Calendar } from "@/components/ui/calendar"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Bell, BookOpen, Clock, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function DashboardPage() {
    // Mock data
    const today = new Date()
    const userName = "John"
    const completedQuizzes = 12
    const totalQuizzes = 15
    const studyHours = 24
    const studyGoal = 30
    const streakDays = 7

    const upcomingSessions = [
        { id: 1, title: "Biology Revision", date: "Today, 3:00 PM", duration: "1 hour" },
        { id: 2, title: "Math Practice", date: "Tomorrow, 10:00 AM", duration: "2 hours" },
    ]

    const pendingQuizzes = [
        { id: 1, title: "Chemistry Chapter 5", dueDate: "Today" },
        { id: 2, title: "History World War II", dueDate: "Tomorrow" },
    ]

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Good morning, {userName}!</h1>
                    <p className="text-muted-foreground">Here's your study overview for today.</p>
                </div>
                <div className="mt-4 md:mt-0">
                    <Button>
                        <BookOpen className="mr-2 h-4 w-4" />
                        Start Studying
                    </Button>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Quiz Progress</CardTitle>
                        <Trophy className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {completedQuizzes}/{totalQuizzes}
                        </div>
                        <Progress value={(completedQuizzes / totalQuizzes) * 100} className="h-2 mt-2" />
                        <p className="text-xs text-muted-foreground mt-2">
                            {((completedQuizzes / totalQuizzes) * 100).toFixed(0)}% complete
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Study Hours</CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {studyHours}/{studyGoal}
                        </div>
                        <Progress value={(studyHours / studyGoal) * 100} className="h-2 mt-2" />
                        <p className="text-xs text-muted-foreground mt-2">
                            {studyGoal - studyHours} hours to reach your weekly goal
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Study Streak</CardTitle>
                        <div className="flex items-center">
                            <Badge variant="outline" className="ml-2">
                                {streakDays} days
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-center">
                            <div className="grid grid-cols-7 gap-1">
                                {Array.from({ length: 7 }).map((_, i) => (
                                    <div
                                        key={i}
                                        className={`h-8 w-8 rounded-full flex items-center justify-center text-xs ${
                                            i < streakDays ? "bg-primary text-primary-foreground" : "bg-muted"
                                        }`}
                                    >
                                        {i + 1}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Upcoming Study Sessions</CardTitle>
                        <CardDescription>Your scheduled study blocks</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {upcomingSessions.map((session) => (
                                <div key={session.id} className="flex items-start space-x-4">
                                    <div className="bg-primary/10 p-2 rounded-md">
                                        <Clock className="h-5 w-5 text-primary" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="font-medium">{session.title}</p>
                                        <div className="flex items-center text-sm text-muted-foreground">
                                            <span>{session.date}</span>
                                            <span className="mx-2">•</span>
                                            <span>{session.duration}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {upcomingSessions.length === 0 && (
                                <p className="text-muted-foreground text-center py-4">No upcoming sessions scheduled</p>
                            )}
                            <Button variant="outline" className="w-full mt-2">
                                View All Sessions
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Study Calendar</CardTitle>
                        <CardDescription>Plan your study sessions</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Calendar mode="single" selected={today} className="rounded-md border" />
                    </CardContent>
                </Card>
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-bold">Pending Quizzes</h2>
                {pendingQuizzes.map((quiz) => (
                    <Alert key={quiz.id}>
                        <Bell className="h-4 w-4" />
                        <AlertTitle>{quiz.title}</AlertTitle>
                        <AlertDescription>Due {quiz.dueDate}. Complete this quiz to maintain your streak!</AlertDescription>
                    </Alert>
                ))}
            </div>
        </div>
    )
}
