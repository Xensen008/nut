'use client'
import { api } from '@/convex/_generated/api';
import { useConvex } from 'convex/react';
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'

const ChatView = () => {

    const { id } = useParams();
    console.log("ID", id)
    const convex = useConvex();

    useEffect(() => {
        id && GetWorkspaceData();
    },[id])

    //getting the result from the workspace
    const GetWorkspaceData= async()=>{
        const result = await convex.query(api.workspace.GetWorkspace,{
            workspaceId: id
        });
        console.log("Result", result)
    }

    return (
        <div>ChatView</div>
    )
}

export default ChatView