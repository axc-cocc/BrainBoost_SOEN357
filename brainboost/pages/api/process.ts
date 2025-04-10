import type { NextApiRequest, NextApiResponse } from "next"
import { IncomingForm } from "formidable"
import OpenAI from "openai"
import pdfParse from "pdf-parse"
import fs from "fs/promises"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

export const config = {
  api: {
    bodyParser: false,
  },
}

// Helper: chunk large text into manageable pieces (~3000 tokens)
function chunkText(text: string, maxLength: number = 12000): string[] {
  const chunks = []
  for (let i = 0; i < text.length; i += maxLength) {
    chunks.push(text.slice(i, i + maxLength))
  }
  return chunks
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" })

  const form = new IncomingForm()

  form.parse(req, async (err, fields, files) => {
    try {
      if (err) return res.status(500).json({ error: "Failed to parse form" })

      let content = ""

      if (fields.text) {
        content = fields.text.toString()
      } else if (fields.url) {
        const response = await fetch(fields.url.toString())
        content = await response.text()
      } else if (files.file) {
        const file = files.file[0]
        const buffer = await fs.readFile(file.filepath)
      
        if (file.originalFilename?.endsWith(".pdf")) {
          const pdfData = await pdfParse(buffer)
          content = pdfData.text
        } else {
          content = buffer.toString("utf-8")
        }
      }

      if (!content) return res.status(400).json({ error: "No content found" })

      // Split the content into chunks
      const CHUNK_SIZE = 12000
      const contentChunks = chunkText(content, CHUNK_SIZE)

      let allSummaries = ""
      let allQuizzes = ""

      for (const chunk of contentChunks) {
        const prompt = `
You are an AI tutor. Based on the following material, do two things:
1. Write a concise summary of the content.
2. Create 2–3 quiz questions (with answers) to help a student review.

Material:
${chunk}
        `.trim()

        const aiRes = await openai.chat.completions.create({
          model: "gpt-3.5-turbo-1106",
          messages: [{ role: "user", content: prompt }],
        })

        const result = aiRes.choices[0].message?.content || ""
        const [summary, ...quizParts] = result.split("2.")
        const quiz = quizParts.join("2.").trim()

        allSummaries += summary.replace("1.", "").trim() + "\n\n"
        allQuizzes += quiz + "\n\n"
      }

      return res.status(200).json({
        summary: allSummaries.trim(),
        quiz: allQuizzes.trim(),
      })
    } catch (e) {
      console.error("API error:", e)
      return res.status(500).json({ error: "Something went wrong" })
    }
  })
}
