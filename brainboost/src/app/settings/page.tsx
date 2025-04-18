"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabaseClient"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Moon, Sun, Trash2, User, Bell, Shield, Download, BookOpen } from "lucide-react"
import { useSearchParams } from "next/navigation"

export default function SettingsPage() {
    const [theme, setTheme] = useState("system")
    const [quizFormat, setQuizFormat] = useState("mcq")
    const [user, setUser] = useState<any>(null)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isSignUp, setIsSignUp] = useState(false)
    const searchParams = useSearchParams()
    const initialTab = searchParams.get("tab") || "appearance"

    useEffect(() => {
        const getUser = async () => {
          const { data: { user } } = await supabase.auth.getUser()
          setUser(user)
        }
        getUser()
    
        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
          setUser(session?.user ?? null)
        })
    
        return () => {
          listener.subscription.unsubscribe()
        }
      }, [])
    
      const handleLogin = async () => {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) alert("Login failed: " + error.message)
      }
    
      const handleSignUp = async () => {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin,
          },
        })
        if (error) {
          alert("Signup failed: " + error.message)
        } else {
          alert("Check your email to confirm your account.")
        }
      }
    
      const handleLogout = async () => {
        const { error } = await supabase.auth.signOut()
        if (error) alert("Logout failed: " + error.message)
        setUser(null)
      }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-6">
                <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                <p className="text-muted-foreground">Manage your account settings and preferences</p>
            </div>

            <Tabs defaultValue={initialTab}>
                <div className="flex overflow-x-auto pb-2">
                    <TabsList className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
                        <TabsTrigger
                            value="appearance"
                            className="inline-flex items-center justify-center whitespace-nowrap px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                        >
                            <Sun className="mr-2 h-4 w-4" />
                            Appearance
                        </TabsTrigger>
                        <TabsTrigger value="preferences">
                            <BookOpen className="mr-2 h-4 w-4" />
                            Study Preferences
                        </TabsTrigger>
                        <TabsTrigger value="notifications">
                            <Bell className="mr-2 h-4 w-4" />
                            Notifications
                        </TabsTrigger>
                        <TabsTrigger value="account">
                            <User className="mr-2 h-4 w-4" />
                            Account
                        </TabsTrigger>
                        <TabsTrigger value="privacy">
                            <Shield className="mr-2 h-4 w-4" />
                            Privacy
                        </TabsTrigger>
                    </TabsList>
                </div>

                <div className="mt-6 space-y-6">
                    <TabsContent value="appearance" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Appearance</CardTitle>
                                <CardDescription>Customize how Brain Boost looks on your device</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-lg font-medium">Theme</h3>
                                        <p className="text-sm text-muted-foreground">Select your preferred theme for the application</p>
                                    </div>
                                    <RadioGroup defaultValue={theme} onValueChange={setTheme} className="grid grid-cols-3 gap-4">
                                        <div>
                                            <RadioGroupItem value="light" id="theme-light" className="peer sr-only" />
                                            <Label
                                                htmlFor="theme-light"
                                                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                            >
                                                <Sun className="mb-3 h-6 w-6" />
                                                Light
                                            </Label>
                                        </div>
                                        <div>
                                            <RadioGroupItem value="dark" id="theme-dark" className="peer sr-only" />
                                            <Label
                                                htmlFor="theme-dark"
                                                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                            >
                                                <Moon className="mb-3 h-6 w-6" />
                                                Dark
                                            </Label>
                                        </div>
                                        <div>
                                            <RadioGroupItem value="system" id="theme-system" className="peer sr-only" />
                                            <Label
                                                htmlFor="theme-system"
                                                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                            >
                                                <div className="mb-3 flex h-6 w-6 items-center justify-center rounded-full border-2">
                                                    <div className="h-2.5 w-2.5 rounded-full bg-foreground" />
                                                </div>
                                                System
                                            </Label>
                                        </div>
                                    </RadioGroup>
                                </div>

                                <Separator />

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label htmlFor="font-size">Font Size</Label>
                                        <p className="text-sm text-muted-foreground">Adjust the font size for better readability</p>
                                    </div>
                                    <Select defaultValue="medium">
                                        <SelectTrigger className="w-[120px]">
                                            <SelectValue placeholder="Select size" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="small">Small</SelectItem>
                                            <SelectItem value="medium">Medium</SelectItem>
                                            <SelectItem value="large">Large</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <Separator />

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label htmlFor="reduced-motion">Reduced Motion</Label>
                                        <p className="text-sm text-muted-foreground">Reduce the amount of animations in the interface</p>
                                    </div>
                                    <Switch id="reduced-motion" />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="preferences" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Study Preferences</CardTitle>
                                <CardDescription>Customize your study experience</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-lg font-medium">Default Quiz Format</h3>
                                        <p className="text-sm text-muted-foreground">Choose your preferred quiz format</p>
                                    </div>
                                    <RadioGroup
                                        defaultValue={quizFormat}
                                        onValueChange={setQuizFormat}
                                        className="grid grid-cols-2 gap-4"
                                    >
                                        <div>
                                            <RadioGroupItem value="mcq" id="quiz-mcq" className="peer sr-only" />
                                            <Label
                                                htmlFor="quiz-mcq"
                                                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                            >
                                                Multiple Choice
                                            </Label>
                                        </div>
                                        <div>
                                            <RadioGroupItem value="flashcard" id="quiz-flashcard" className="peer sr-only" />
                                            <Label
                                                htmlFor="quiz-flashcard"
                                                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                            >
                                                Flashcards
                                            </Label>
                                        </div>
                                    </RadioGroup>
                                </div>

                                <Separator />

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label htmlFor="difficulty">Default Difficulty</Label>
                                        <p className="text-sm text-muted-foreground">Set your preferred difficulty level for quizzes</p>
                                    </div>
                                    <Select defaultValue="medium">
                                        <SelectTrigger className="w-[120px]">
                                            <SelectValue placeholder="Select difficulty" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="easy">Easy</SelectItem>
                                            <SelectItem value="medium">Medium</SelectItem>
                                            <SelectItem value="hard">Hard</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <Separator />

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label htmlFor="timezone">Timezone</Label>
                                        <p className="text-sm text-muted-foreground">Set your timezone for accurate scheduling</p>
                                    </div>
                                    <Select defaultValue="utc">
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Select timezone" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="utc">UTC (GMT+0)</SelectItem>
                                            <SelectItem value="est">Eastern Time (GMT-5)</SelectItem>
                                            <SelectItem value="pst">Pacific Time (GMT-8)</SelectItem>
                                            <SelectItem value="cet">Central European (GMT+1)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <Separator />

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label htmlFor="auto-save">Auto-Save Progress</Label>
                                        <p className="text-sm text-muted-foreground">Automatically save your progress in quizzes</p>
                                    </div>
                                    <Switch id="auto-save" defaultChecked />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="notifications" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Notification Settings</CardTitle>
                                <CardDescription>Manage how and when you receive notifications</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Study Reminders</Label>
                                        <p className="text-sm text-muted-foreground">Receive reminders for scheduled study sessions</p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>

                                <Separator />

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Quiz Due Alerts</Label>
                                        <p className="text-sm text-muted-foreground">Get notified when quizzes are due</p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>

                                <Separator />

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Weekly Progress Reports</Label>
                                        <p className="text-sm text-muted-foreground">Receive weekly summaries of your study progress</p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>

                                <Separator />

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Email Notifications</Label>
                                        <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>

                                <Separator />

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Push Notifications</Label>
                                        <p className="text-sm text-muted-foreground">Receive push notifications on your device</p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="account" className="space-y-4">
                        <Card>
                          <CardHeader>
                            <CardTitle>Account</CardTitle>
                            <CardDescription>
                              {user ? "Update your profile or manage your account" : "Sign in to manage your account"}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            {!user ? (
                              <>
                                <div className="flex items-center justify-between">
                                  <h2 className="text-lg font-medium">
                                    {isSignUp ? "Create an account" : "Sign in to your account"}
                                  </h2>
                                  <Button
                                    variant="link"
                                    className="text-sm px-0"
                                    onClick={() => setIsSignUp(!isSignUp)}
                                  >
                                    {isSignUp ? "Already have an account?" : "Create account"}
                                  </Button>
                                </div>
                                <div className="space-y-2">
                                  <Label>Email</Label>
                                  <Input
                                    type="email"
                                    placeholder="you@example.com"
                                    onChange={(e) => setEmail(e.target.value)}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label>Password</Label>
                                  <Input
                                    type="password"
                                    placeholder="••••••••"
                                    onChange={(e) => setPassword(e.target.value)}
                                  />
                                </div>
                                <Button onClick={isSignUp ? handleSignUp : handleLogin}>
                                  {isSignUp ? "Sign Up" : "Sign In"}
                                </Button>
                              </>
                            ) : (
                              <>
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="first-name">First Name</Label>
                                    <Input id="first-name" placeholder="First name" />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="last-name">Last Name</Label>
                                    <Input id="last-name" placeholder="Last name" />
                                  </div>
                                </div>
                            
                                <div className="space-y-2">
                                  <Label>Email</Label>
                                  <Input value={user.email} readOnly disabled />
                                </div>
                              </>
                            )}
                          </CardContent>
                        
                          {user && (
                            <CardFooter className="flex flex-col items-start border-t px-6 py-4">
                              <h3 className="text-lg font-medium">Danger Zone</h3>
                              <p className="text-sm text-muted-foreground mb-4">
                                Sign out of your account or permanently delete all of your data.
                              </p>
                              <div className="flex flex-col gap-3 w-full">
                                <Button onClick={handleLogout} variant="secondary" className="w-full">
                                  Sign Out
                                </Button>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button variant="destructive" className="w-full">
                                      <Trash2 className="mr-2 h-4 w-4" /> Delete Account
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        This action cannot be undone. It will delete your account and all your data.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction className="bg-destructive text-destructive-foreground">
                                        Delete Account
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>
                            </CardFooter>
                          )}
                        </Card>
                    </TabsContent>

                    <TabsContent value="privacy" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Privacy Settings</CardTitle>
                                <CardDescription>Manage your data and privacy preferences</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Data Collection</Label>
                                        <p className="text-sm text-muted-foreground">
                                            Allow us to collect usage data to improve your experience
                                        </p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>

                                <Separator />

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>AI Learning</Label>
                                        <p className="text-sm text-muted-foreground">Allow our AI to learn from your study patterns</p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>

                                <Separator />

                                <div className="space-y-2">
                                    <Button variant="outline" className="w-full">
                                        <Download className="mr-2 h-4 w-4" />
                                        Download Your Data
                                    </Button>
                                </div>

                                <div className="space-y-2">
                                    <Button variant="outline" className="w-full">
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        Delete All Study Data
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    )
}