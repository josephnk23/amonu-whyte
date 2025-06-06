import type React from "react"

import { Inter } from "next/font/google"

import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

const inter = Inter({ subsets: ["latin"] })


export default function RootLayout({
   children,
 }: {
   children: React.ReactNode
 }) {
   return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1">{children}</main>
    </SidebarProvider>
   )
 }
