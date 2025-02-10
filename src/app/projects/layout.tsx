import type { Metadata } from "next"
import type React from "react"

export const metadata: Metadata = {
    title: "Projects | Portfolio",
    description: "Anas's portfolio projects",
    }

    export default function ProjectsLayout({
    children,
    }: Readonly<{
    children: React.ReactNode
    }>) {
    return <>{children}</>
}

