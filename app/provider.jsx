"use client"
import React from 'react'
import { ThemeProvider } from "next-themes"
import Header from '@/components/custom/Header'


const Provider = ({ children }) => {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >   
            <Header/>
            {children}
        </ThemeProvider>
    )
}

export default Provider