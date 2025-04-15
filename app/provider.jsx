"use client"
import React, { use, useEffect, useState } from 'react'
import { ThemeProvider } from "next-themes"
import Header from '@/components/custom/Header'
import { MessagesContext } from '@/context/MessagesContext'
import { UserDetailContext } from '@/context/UserDetailContext'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { useConvex } from 'convex/react'
import { api } from '@/convex/_generated/api'

const Provider = ({ children }) => {
    const [messages, setMessages] = useState()
    const [userDetail, setUserDetail] = useState()
    const convex= useConvex();

    useEffect(()=>{
        IsAuthenticated();
    },[])

    const IsAuthenticated=async()=>{
        if(typeof window !== 'undefined'){
            const user = JSON.parse(localStorage.getItem('user'))
            //fetch the user from convex db
            const result = await convex.query(api.users.GetUser,{
                email:user?.email
            })
            setUserDetail(result)
            console.log(result)
        }
    }

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