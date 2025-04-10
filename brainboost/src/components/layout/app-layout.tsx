"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import {
    SidebarProvider,
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarFooter,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarInset,
} from "@/components/ui/sidebar"
import { MobileNav } from "@/components/layout/mobile-nav"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { LayoutDashboard, Upload, FileText, BookOpen, Calendar, Settings, LogOut } from "lucide-react"
import Link from "next/link"
import { supabase } from "@/lib/supabaseClient"

const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Upload", href: "/upload", icon: Upload },
    { name: "Summary", href: "/summary", icon: FileText },
    { name: "Quiz", href: "/quiz", icon: BookOpen },
    { name: "Planner", href: "/planner", icon: Calendar },
    { name: "Settings", href: "/settings", icon: Settings },
]

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const [isMounted, setIsMounted] = useState(false)
    const [user, setUser] = useState<any>(null)

    useEffect(() => {
        setIsMounted(true)

        const fetchUser = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            setUser(user)
        }

        fetchUser()

        const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null)
        })

        return () => {
            authListener.subscription.unsubscribe()
        }
    }, [])

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut()
        if (error) console.error("Logout error:", error)
    }

    if (!isMounted) {
        return null
    }

    return (
        <SidebarProvider>
            <div className="flex min-h-screen">
                <Sidebar variant="inset" collapsible="icon">
                    <SidebarHeader className="flex items-center justify-center py-4">
                        <div className="flex items-center space-x-2">
                            <div className="rounded-full bg-primary p-1">
                                <BookOpen className="h-6 w-6 text-primary-foreground" />
                            </div>
                            <span className="text-xl font-bold">Brain Boost</span>
                        </div>
                    </SidebarHeader>
                    <SidebarContent>
                        <SidebarMenu>
                            {navigation.map((item) => (
                                <SidebarMenuItem key={item.name}>
                                    <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.name}>
                                        <Link href={item.href}>
                                            <item.icon className="h-5 w-5" />
                                            <span>{item.name}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarContent>
                    <SidebarFooter>
                        <SidebarMenu>
                            {user ? (
                                <>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton>
                                            <div className="flex items-center">
                                                <Avatar className="h-6 w-6 mr-2">
                                                    <AvatarFallback>
                                                        {user.email?.charAt(0).toUpperCase()}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <span className="truncate">{user.email}</span>
                                            </div>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton onClick={handleLogout}>
                                            <LogOut className="h-5 w-5" />
                                            <span>Logout</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                </>
                            ) : (
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild>
                                        <Link href="/settings?tab=account">
                                            <div className="flex items-center">
                                                <Avatar className="h-6 w-6 mr-2">
                                                    <AvatarFallback>SI</AvatarFallback>
                                                </Avatar>
                                                <span>Sign In or Sign Up</span>
                                            </div>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            )}
                        </SidebarMenu>
                    </SidebarFooter>
                </Sidebar>
                <SidebarInset className="flex flex-col">
                    <div className="flex-1 p-4 md:p-6">{children}</div>
                    <MobileNav navigation={navigation} />
                </SidebarInset>
            </div>
        </SidebarProvider>
    )
}
