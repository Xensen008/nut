"use client";
import { MessagesContext } from "@/context/MessagesContext";
import { UserDetailContext } from "@/context/UserDetailContext";
import { api } from "@/convex/_generated/api";
import Colors from "@/data/Colors";
import Lookups from "@/data/Lookups";
import Prompt from "@/data/Prompt";
import axios from "axios";
import { useConvex } from "convex/react";
import { ArrowRight, Link, Loader2Icon } from "lucide-react";
import Image from "next/image";
// import Link from 'next/link';
import { useParams } from "next/navigation";
import React, { useContext, useEffect } from "react";

const ChatView = () => {
  const { id } = useParams();
  // console.log("ID", id)
  const convex = useConvex();
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const { messages, setMessages } = useContext(MessagesContext);
  const [userInput, setUserInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    id && GetWorkspaceData();
  }, [id]);

  //getting the result from the workspace
  const GetWorkspaceData = async () => {
    const result = await convex.query(api.workspace.GetWorkspace, {
      workspaceId: id,
    });
    setMessages(result?.messages);
    console.log("Result", result);
  };

  useEffect(() => {
    if (messages?.length > 0) {
      const role = messages[messages?.length - 1]?.role;
      if (role === "user") {
        GetAiResponse();
      }
    }
  }, [messages]);

  //sending the message to the AI
  const GetAiResponse = async () => {
    setLoading(true);
    const PROPMT = JSON.stringify(messages) + Prompt.CHAT_PROMPT;
    // console.log("Prompt", PROPMT);
    const result = await axios.post("/api/ai-chat", {
      prompt: PROPMT,
    });
    console.log("AI Response", result.data.result);
    setMessages((prev) => [
      ...prev,
      { role: "AI", content: result.data.result },
    ]);
    setLoading(false);
  };

  // sending the message to the AI

   const onGenerate = async (input) => {
        setMessages((prev) => [
            ...prev,
            { role: "user", content: input },
        ]); // Add user message to messages
   }
  return (
    <div className="relative h-[79vh] flex flex-col">
      <div className="flex-1 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {messages?.map((msg, index) => (
          <div
            key={index}
            className="p-3 rounded-lg mb-2 flex gap-2 items-start leading-5.5"
            style={{
              backgroundColor: Colors.CHAT_BACKGROUND,
            }}
          >
            {msg?.role === "user" && (
              <Image
                src={userDetail?.picture}
                alt="user"
                width={35}
                height={35}
                className="rounded-full"
              />
            )}
            <h2>{msg?.content}</h2>
          </div>
        ))}
        {loading && <div style={{
            backgroundColor: Colors.CHAT_BACKGROUND,
        }} className="p-3 rounded-lg mb-2 flex gap-2 items-start">
                <Loader2Icon className="animate-spin"/>
                <h2>Generating response...</h2>
            </div>}
      </div>

      {/* input field */}
      <div
        className="p-5 border rounded-xl max-w-lg w-full mt-3"
        style={{
          backgroundColor: Colors.BACKGROUND,
        }}
      >
        <div className="relative flex items-center">
          <textarea
            className="outline-none bg-transparent w-full h-24 md:h-30 max-h-56 resize-none text-sm md:text-base placeholder:text-gray-500"
            placeholder={Lookups.INPUT_PLACEHOLDER}
            onChange={(event) => setUserInput(event.target.value)}
          />
          {userInput && (
            <ArrowRight
              onClick={() => onGenerate(userInput)}
              className="absolute right-0 bottom-0 bg-blue-600 hover:bg-blue-500 p-2 sm:p-3 h-8 w-8 rounded-md cursor-pointer text-white transition-all duration-300 transform hover:scale-105 flex-shrink-0"
            />
          )}
        </div>
        <div className="mt-2 flex items-center">
          <Link className="h-4 w-4 text-gray-400 mr-2" />
          <span className="text-xs text-gray-500">
            Paste a link or type your request
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatView;
