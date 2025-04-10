"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, RefreshCw, BookOpen, List, AlignLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Mock data
const summaryData = [
  {
    id: 1,
    title: "Cell Biology",
    summary:
      "Cells are the basic structural and functional units of life. They are composed of various organelles, each with specific functions. The cell membrane controls what enters and exits the cell, while the nucleus contains genetic material. Mitochondria are the powerhouse of the cell, generating energy through cellular respiration.",
    keyPoints: [
      "Cells are the basic units of life",
      "Cell membrane controls what enters and exits",
      "Nucleus contains genetic material",
      "Mitochondria generate energy through cellular respiration",
      "Endoplasmic reticulum is involved in protein synthesis",
    ],
    difficulty: "Medium",
  },
  {
    id: 2,
    title: "Photosynthesis",
    summary:
      "Photosynthesis is the process by which green plants and some other organisms use sunlight to synthesize foods with carbon dioxide and water. It is a complex process that occurs in chloroplasts and consists of light-dependent and light-independent reactions. The end products are glucose and oxygen.",
    keyPoints: [
      "Occurs in chloroplasts of plant cells",
      "Requires sunlight, water, and carbon dioxide",
      "Produces glucose and oxygen",
      "Has light-dependent and light-independent reactions",
      "Essential for maintaining atmospheric oxygen levels",
    ],
    difficulty: "Hard",
  },
  {
    id: 3,
    title: "Cellular Respiration",
    summary:
      "Cellular respiration is the process by which cells convert nutrients into energy in the form of ATP. It occurs in the mitochondria and involves glycolysis, the Krebs cycle, and the electron transport chain. The process requires oxygen and produces carbon dioxide and water as waste products.",
    keyPoints: [
      "Occurs in mitochondria",
      "Converts glucose to ATP (energy)",
      "Requires oxygen",
      "Produces carbon dioxide and water",
      "Involves glycolysis, Krebs cycle, and electron transport chain",
    ],
    difficulty: "Medium",
  },
]

export default function SummaryPage() {
  const [viewMode, setViewMode] = useState<"bullets" | "paragraphs">("bullets")
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (id: number) => {
    setOpenItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const regenerateSummary = (id: number) => {
    // In a real app, this would call an API to regenerate the summary
    console.log(`Regenerating summary for item ${id}`)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Study Summaries</h1>
        <p className="text-muted-foreground">AI-generated summaries of your study materials</p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <Tabs defaultValue="bullets" value={viewMode} onValueChange={(v) => setViewMode(v as "bullets" | "paragraphs")}>
          <TabsList>
            <TabsTrigger value="bullets">
              <List className="h-4 w-4 mr-2" />
              Bullet Points
            </TabsTrigger>
            <TabsTrigger value="paragraphs">
              <AlignLeft className="h-4 w-4 mr-2" />
              Paragraphs
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <Button variant="outline" size="sm">
          <BookOpen className="h-4 w-4 mr-2" />
          View Original
        </Button>
      </div>

      <div className="space-y-4">
        {summaryData.map((item) => (
          <Card key={item.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>
                    <Badge variant="outline" className="mt-1">
                      {item.difficulty} Difficulty
                    </Badge>
                  </CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => regenerateSummary(item.id)}
                  title="Regenerate summary"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Collapsible open={openItems.includes(item.id)} onOpenChange={() => toggleItem(item.id)}>
                {viewMode === "bullets" ? (
                  <ul className="list-disc pl-5 space-y-1">
                    {item.keyPoints.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                ) : (
                  <p>{item.summary}</p>
                )}
                <CollapsibleContent className="mt-4">
                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-2">Additional Details</h4>
                    {viewMode === "bullets" ? (
                      <p>{item.summary}</p>
                    ) : (
                      <ul className="list-disc pl-5 space-y-1">
                        {item.keyPoints.map((point, index) => (
                          <li key={index}>{point}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </CollapsibleContent>
                <div className="flex justify-center mt-2">
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm">
                      {openItems.includes(item.id) ? "Show Less" : "Show More"}
                      <ChevronDown
                        className={`h-4 w-4 ml-2 transition-transform ${openItems.includes(item.id) ? "rotate-180" : ""}`}
                      />
                    </Button>
                  </CollapsibleTrigger>
                </div>
              </Collapsible>
            </CardContent>
            <CardFooter className="pt-0">
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  Create Quiz
                </Button>
                <Button variant="outline" size="sm">
                  Save to Notes
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
