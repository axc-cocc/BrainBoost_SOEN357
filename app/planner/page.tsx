"use client"

import React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "lucide-react"

// Mock data for study sessions
const mockStudySessions = [
  {
    id: 1,
    subject: "Biology",
    topic: "Cell Structure",
    day: "Monday",
    startTime: "09:00",
    endTime: "10:30",
    color: "bg-green-100 border-green-300 text-green-800",
  },
  {
    id: 2,
    subject: "Mathematics",
    topic: "Calculus",
    day: "Monday",
    startTime: "13:00",
    endTime: "14:30",
    color: "bg-blue-100 border-blue-300 text-blue-800",
  },
  {
    id: 3,
    subject: "Physics",
    topic: "Mechanics",
    day: "Tuesday",
    startTime: "10:00",
    endTime: "12:00",
    color: "bg-purple-100 border-purple-300 text-purple-800",
  },
  {
    id: 4,
    subject: "Chemistry",
    topic: "Organic Chemistry",
    day: "Wednesday",
    startTime: "14:00",
    endTime: "16:00",
    color: "bg-red-100 border-red-300 text-red-800",
  },
  {
    id: 5,
    subject: "History",
    topic: "World War II",
    day: "Thursday",
    startTime: "09:00",
    endTime: "10:30",
    color: "bg-yellow-100 border-yellow-300 text-yellow-800",
  },
  {
    id: 6,
    subject: "English",
    topic: "Essay Writing",
    day: "Friday",
    startTime: "11:00",
    endTime: "12:30",
    color: "bg-indigo-100 border-indigo-300 text-indigo-800",
  },
]

// Days of the week
const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

// Time slots
const timeSlots = Array.from({ length: 14 }, (_, i) => {
  const hour = i + 8 // Start from 8 AM
  return `${hour.toString().padStart(2, "0")}:00`
})

export default function PlannerPage() {
  const [isAddSessionOpen, setIsAddSessionOpen] = useState(false)
  const [studySessions, setStudySessions] = useState(mockStudySessions)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)

  const getSessionsForDay = (day: string) => {
    return studySessions.filter((session) => session.day === day)
  }

  const getSessionsForTimeSlot = (day: string, timeSlot: string) => {
    const hour = Number.parseInt(timeSlot.split(":")[0])
    return studySessions.filter((session) => {
      const startHour = Number.parseInt(session.startTime.split(":")[0])
      const endHour = Number.parseInt(session.endTime.split(":")[0])
      return session.day === day && startHour <= hour && endHour > hour
    })
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Study Planner</h1>
        <p className="text-muted-foreground">Plan and organize your study sessions</p>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex items-center space-x-4">
          <Button onClick={() => setIsAddSessionOpen(true)}>Add Study Session</Button>
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            View Calendar
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <Switch id="notifications" checked={notificationsEnabled} onCheckedChange={setNotificationsEnabled} />
          <Label htmlFor="notifications">Enable Notifications</Label>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Weekly Study Schedule</CardTitle>
          <CardDescription>Your planned study sessions for the week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="grid grid-cols-8 min-w-[800px]">
              {/* Header row with days */}
              <div className="sticky left-0 bg-background z-10 border-r"></div>
              {daysOfWeek.map((day) => (
                <div key={day} className="p-2 text-center font-medium border-b">
                  {day}
                </div>
              ))}

              {/* Time slots */}
              {timeSlots.map((timeSlot) => (
                <React.Fragment key={timeSlot}>
                  <div className="sticky left-0 bg-background z-10 p-2 text-sm border-r border-b">{timeSlot}</div>
                  {daysOfWeek.map((day) => (
                    <div key={`${day}-${timeSlot}`} className="border-b border-r p-1 min-h-[60px]">
                      {getSessionsForTimeSlot(day, timeSlot).map((session) => (
                        <div key={session.id} className={`text-xs p-1 rounded border ${session.color} mb-1`}>
                          {session.subject}: {session.topic}
                          <div className="text-xs opacity-75">
                            {session.startTime} - {session.endTime}
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Smart Suggestions</CardTitle>
            <CardDescription>AI-recommended study times based on your performance</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  High Priority
                </Badge>
                <div>
                  <p className="font-medium">Study Organic Chemistry</p>
                  <p className="text-sm text-muted-foreground">Recommended: Tuesday, 10:00 - 12:00</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                  Medium Priority
                </Badge>
                <div>
                  <p className="font-medium">Review Calculus Problems</p>
                  <p className="text-sm text-muted-foreground">Recommended: Thursday, 14:00 - 15:30</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  Regular Review
                </Badge>
                <div>
                  <p className="font-medium">Practice Essay Writing</p>
                  <p className="text-sm text-muted-foreground">Recommended: Saturday, 09:00 - 10:30</p>
                </div>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Apply Suggestions
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
            <CardDescription>Customize how you receive study reminders</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive daily summaries via email</p>
              </div>
              <Switch checked={true} />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Push Notifications</Label>
                <p className="text-sm text-muted-foreground">Get alerts before scheduled sessions</p>
              </div>
              <Switch checked={true} />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Reminder Time</Label>
                <p className="text-sm text-muted-foreground">How early to send reminders</p>
              </div>
              <Select defaultValue="15">
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 minutes</SelectItem>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Study Session Dialog */}
      <Dialog open={isAddSessionOpen} onOpenChange={setIsAddSessionOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Study Session</DialogTitle>
            <DialogDescription>Create a new study session for your weekly schedule.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="subject" className="text-right">
                Subject
              </Label>
              <Input id="subject" placeholder="e.g. Biology" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="topic" className="text-right">
                Topic
              </Label>
              <Input id="topic" placeholder="e.g. Cell Structure" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="day" className="text-right">
                Day
              </Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select day" />
                </SelectTrigger>
                <SelectContent>
                  {daysOfWeek.map((day) => (
                    <SelectItem key={day} value={day.toLowerCase()}>
                      {day}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="start-time" className="text-right">
                Start Time
              </Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 24 }, (_, i) => {
                    const hour = i.toString().padStart(2, "0")
                    return (
                      <SelectItem key={`${hour}:00`} value={`${hour}:00`}>
                        {`${hour}:00`}
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="end-time" className="text-right">
                End Time
              </Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 24 }, (_, i) => {
                    const hour = i.toString().padStart(2, "0")
                    return (
                      <SelectItem key={`${hour}:00`} value={`${hour}:00`}>
                        {`${hour}:00`}
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="reminder" className="text-right">
                Reminder
              </Label>
              <div className="flex items-center space-x-2 col-span-3">
                <Switch id="reminder" defaultChecked />
                <Label htmlFor="reminder">Enable reminder</Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddSessionOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsAddSessionOpen(false)}>Add Session</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
