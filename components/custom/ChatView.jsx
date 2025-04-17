'use client'
import { MessagesContext } from '@/context/MessagesContext';
import { UserDetailContext } from '@/context/UserDetailContext';
import { api } from '@/convex/_generated/api';
import Colors from '@/data/Colors';
import { useConvex } from 'convex/react';
import Image from 'next/image';
import { useParams } from 'next/navigation'
import React, { useContext, useEffect } from 'react'

const ChatView = () => {

    const { id } = useParams();
    // console.log("ID", id)
    const convex = useConvex();
    const {userDetail, setUserDetail} = useContext(UserDetailContext)
    const {messages, setMessages} = useContext(MessagesContext)

    useEffect(() => {
        id && GetWorkspaceData();
    },[id])

    //getting the result from the workspace
    const GetWorkspaceData= async()=>{
        const result = await convex.query(api.workspace.GetWorkspace,{
            workspaceId: id
        });
        setMessages(result?.messages)
        console.log("Result", result)
    }

    return (
        <div>
            <div>
                {messages?.map((msg, index)=>(
                    <div key={index} className='p-3 rounded-lg mb-2 flex gap-2 items-start' style={{
                        backgroundColor:Colors.CHAT_BACKGROUND
                    }}> 
                        {msg?.role === "user" && 
                            <Image
                                src={userDetail?.picture}
                                alt="user"
                                width={35}
                                height={35}
                                className='rounded-full'
                            />
                        }
                        <h2>{msg?.content}</h2>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ChatView