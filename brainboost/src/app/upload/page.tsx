"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { FileUp, LinkIcon, Loader2, CheckCircle2, AlertCircle } from "lucide-react"

export default function UploadPage() {
    const [activeTab, setActiveTab] = useState("file")
    const [isUploading, setIsUploading] = useState(false)
    const [uploadStatus, setUploadStatus] = useState<null | "success" | "error">(null)
    const [processingStatus, setProcessingStatus] = useState<null | "processing" | "complete">(null)

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsUploading(true)
        setUploadStatus(null)
        setProcessingStatus(null)
      
        const formData = new FormData()
        if (activeTab === "file") {
          const input = document.getElementById("file") as HTMLInputElement
          if (input?.files?.[0]) {
            formData.append("file", input.files[0])
          }
        } else if (activeTab === "text") {
          const textInput = document.getElementById("text") as HTMLTextAreaElement
          formData.append("text", textInput.value)
        } else if (activeTab === "url") {
          const urlInput = document.getElementById("url") as HTMLInputElement
          formData.append("url", urlInput.value)
        }
      
        try {
          const res = await fetch("/api/process", {
            method: "POST",
            body: formData,
          })
      
          if (!res.ok) throw new Error("Failed")
      
            const data = await res.json()
            setUploadStatus("success")
            setProcessingStatus("complete")
            console.log("Summary:", data.summary)
            console.log("Quiz:", data.quiz)
            // You can store these in state or navigate to a results page
          // You could now navigate to /results and pass data.result or display it here
        } catch (error) {
          console.error(error)
          setUploadStatus("error")
        } finally {
          setIsUploading(false)
        }
      }
      

    return (
        <div className="max-w-3xl mx-auto">
            <div className="mb-6">
                <h1 className="text-3xl font-bold tracking-tight">Upload Study Material</h1>
                <p className="text-muted-foreground">Upload your study materials to get AI-generated summaries and quizzes</p>
            </div>

            <Tabs defaultValue="file" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="file">File Upload</TabsTrigger>
                    <TabsTrigger value="text">Text Input</TabsTrigger>
                    <TabsTrigger value="url">URL</TabsTrigger>
                </TabsList>

                <div className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                {activeTab === "file" && "Upload Files"}
                                {activeTab === "text" && "Enter Text"}
                                {activeTab === "url" && "Enter URL"}
                            </CardTitle>
                            <CardDescription>
                                {activeTab === "file" && "Upload PDF, DOCX, or TXT files"}
                                {activeTab === "text" && "Paste your study text directly"}
                                {activeTab === "url" && "Enter a webpage URL to extract content"}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleUpload}>
                                <TabsContent value="file" className="mt-0">
                                    <div className="grid w-full items-center gap-4">
                                        <div className="flex flex-col space-y-1.5">
                                            <Label htmlFor="file">Upload Files</Label>
                                            <div className="border-2 border-dashed rounded-md p-8 text-center cursor-pointer hover:bg-muted/50 transition-colors">
                                                <FileUp className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                                                <p className="text-sm text-muted-foreground mb-2">
                                                    Drag and drop your files here or click to browse
                                                </p>
                                                <Input id="file" type="file" className="hidden" accept=".pdf,.docx,.txt" multiple />
                                                <Button size="sm" onClick={() => document.getElementById("file")?.click()}>
                                                    Select Files
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </TabsContent>

                                <TabsContent value="text" className="mt-0">
                                    <div className="grid w-full items-center gap-4">
                                        <div className="flex flex-col space-y-1.5">
                                            <Label htmlFor="text">Study Text</Label>
                                            <Textarea id="text" placeholder="Paste your study material here..." className="min-h-[200px]" />
                                        </div>
                                    </div>
                                </TabsContent>

                                <TabsContent value="url" className="mt-0">
                                    <div className="grid w-full items-center gap-4">
                                        <div className="flex flex-col space-y-1.5">
                                            <Label htmlFor="url">URL</Label>
                                            <div className="flex space-x-2">
                                                <div className="relative flex-1">
                                                    <LinkIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                                    <Input id="url" placeholder="https://example.com/study-material" className="pl-9" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </TabsContent>

                                <div className="mt-6">
                                    <Button type="submit" className="w-full" disabled={isUploading}>
                                        {isUploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        {isUploading ? "Uploading..." : "Upload and Process"}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>

                        {(uploadStatus || processingStatus) && (
                            <CardFooter className="flex flex-col items-start">
                                {uploadStatus === "success" && (
                                    <Alert variant="default" className="bg-green-50 text-green-800 border-green-200 w-full mb-2">
                                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                                        <AlertDescription className="text-green-800">
                                            Upload successful! Your material is ready for processing.
                                        </AlertDescription>
                                    </Alert>
                                )}

                                {uploadStatus === "error" && (
                                    <Alert variant="destructive" className="w-full mb-2">
                                        <AlertCircle className="h-4 w-4" />
                                        <AlertDescription>Upload failed. Please try again.</AlertDescription>
                                    </Alert>
                                )}

                                {processingStatus === "processing" && (
                                    <Alert variant="default" className="bg-blue-50 text-blue-800 border-blue-200 w-full">
                                        <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                                        <AlertDescription className="text-blue-800">
                                            AI is processing your material. This may take a few moments...
                                        </AlertDescription>
                                    </Alert>
                                )}

                                {processingStatus === "complete" && (
                                    <Alert variant="default" className="bg-green-50 text-green-800 border-green-200 w-full">
                                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                                        <AlertDescription className="text-green-800">
                                            Processing complete! Your summaries and quizzes are ready.
                                        </AlertDescription>
                                    </Alert>
                                )}
                            </CardFooter>
                        )}
                    </Card>
                </div>
            </Tabs>
        </div>
    )
}
