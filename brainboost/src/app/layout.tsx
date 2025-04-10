import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import AppLayout from "@/components/layout/app-layout"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "Brain Boost - AI Study Assistant",
    description: "Boost your learning with AI-powered study tools",
}

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <AppLayout>{children}</AppLayout>
        </ThemeProvider>
        </body>
        </html>
    )
}
