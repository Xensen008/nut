"use client"
import React, { useState } from 'react'
import { ThemeProvider } from "next-themes"
import Header from '@/components/custom/Header'
import { MessagesContext } from '@/context/MessagesContext'

const Provider = ({ children }) => {
    const {messages, setMessages} = useState()
    return (
        <MessagesContext.Provider value={{messages, setMessages}}> 
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                <Header />
                {children}
            </ThemeProvider>
        </MessagesContext.Provider>
    )
}

export default Provider