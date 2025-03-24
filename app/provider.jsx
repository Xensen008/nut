"use client"
import React, { useState } from 'react'
import { ThemeProvider } from "next-themes"
import Header from '@/components/custom/Header'
import { MessagesContext } from '@/context/MessagesContext'
import { UserDetailContext } from '@/context/UserDetailContext'

const Provider = ({ children }) => {
    const { messages, setMessages } = useState()
    const {userDetail, setUserDetail} = useState()
    return (
        <UserDetailContext.Provider value={{userDetail, setUserDetail}}>
            <MessagesContext.Provider value={{ messages, setMessages }}>
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
        </UserDetailContext.Provider>
    )
}

export default Provider