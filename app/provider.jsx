"use client"
import React, { useState } from 'react'
import { ThemeProvider } from "next-themes"
import Header from '@/components/custom/Header'
import { MessagesContext } from '@/context/MessagesContext'
import { UserDetailContext } from '@/context/UserDetailContext'
import { GoogleOAuthProvider } from '@react-oauth/google'

const Provider = ({ children }) => {
    const [messages, setMessages] = useState()
    const [userDetail, setUserDetail] = useState()
    
    return (
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID_KEY}>
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
        </GoogleOAuthProvider>
    )
}

export default Provider