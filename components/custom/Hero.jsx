"use client";
import { MessagesContext } from "@/context/MessagesContext";
import { UserDetailContext } from "@/context/UserDetailContext";
import Lookups from "@/data/Lookups";
import { ArrowRight, Link } from "lucide-react";
import React, { useContext, useState } from "react";
import SignInDialog from "./SignInDialog";

const Hero = () => {
  const [userInput, setUserInput] = useState("");
  const { messages, setMessages } = useContext(MessagesContext)
  const { userDetail, setUserDetail } = useContext(UserDetailContext)
  const [openDialog, setOpenDialog] = useState(false)

  const onGenerate = (input) => {
    if (!userDetail?.name) {
      setOpenDialog(true)
      return
    }
    setMessages({
      role: "user",
      content: input
    })
  }

  return (
    <div className="flex flex-col items-center px-4 sm:px-6 py-8 md:py-12 mt-10 md:mt-16 lg:mt-20 xl:mt-24 gap-3 md:gap-4">
      <h2 className="font-semibold text-[28px] sm:text-[36px] md:text-[44px] text-center leading-tight">{Lookups.HERO_HEADING}</h2>
      <p className="text-gray-400 font-medium text-center max-w-lg mx-auto text-sm sm:text-base">{Lookups.HERO_DESC}</p>
      <div className="p-3 sm:p-4 md:p-5 border border-gray-700 hover:border-gray-500 transition-colors duration-300 rounded-xl max-w-[32rem] w-full mt-3 shadow-sm bg-gray-900/30 backdrop-blur-sm">
        <div className="flex gap-2 items-start">
          <textarea
            className="outline-none bg-transparent w-full h-24 md:h-30 max-h-56 resize-none text-sm md:text-base placeholder:text-gray-500"
            placeholder={Lookups.INPUT_PLACEHOLDER}
            onChange={(event) => setUserInput(event.target.value)}
          />
          {userInput && (
            <ArrowRight
              onClick={() => onGenerate(userInput)}
              className="bg-blue-600 hover:bg-blue-500 p-2 sm:p-3 h-8 w-8 rounded-md cursor-pointer text-white transition-all duration-300 transform hover:scale-105 flex-shrink-0 mt-1"
            />
          )}
        </div>
        <div className="mt-2 flex items-center">
          <Link className="h-4 w-4 text-gray-400 mr-2" />
          <span className="text-xs text-gray-500">Paste a link or type your request</span>
        </div>
      </div>
      <div className="mt-3 sm:mt-4 md:mt-6 w-full max-w-2xl">
        <div className="flex flex-wrap justify-center gap-2 md:gap-3">
          {Lookups.SUGGSTIONS.map((suggestion) => {
            return (
              <h2
                onClick={() => onGenerate(suggestion)}
                className="p-1 px-2 md:px-3 border border-gray-700 rounded-full text-xs sm:text-sm text-gray-400 hover:text-white hover:bg-gray-800 hover:border-gray-500 transition-all duration-300 cursor-pointer"
                key={suggestion}
              >
                {suggestion}
              </h2>
            )
          })}
        </div>
      </div>
      <SignInDialog 
        openDialog={openDialog} 
        closeDialog={setOpenDialog}
      />
    </div>
  );
};

export default Hero;
