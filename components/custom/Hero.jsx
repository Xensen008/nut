"use client";
import Lookups from "@/data/Lookups";
import { ArrowRight, Link } from "lucide-react";
import React, { useState } from "react";

const Hero = () => {
  const [userInput, setUserInput] = useState("");
  return (
    <div className="flex flex-col items-center mt-36 xl:mt-30 gap-2">
      <h2 className="font-semibold text-[44px]">{Lookups.HERO_HEADING}</h2>
      <p className="text-gray-400 font-medium">{Lookups.HERO_DESC}</p>
      <div className="p-5 border rounded-xl max-w-[32rem] w-full mt-3">
        <div className="flex gap-2">
          <textarea
            className="outline-none bg-transparent w-full h-30 max-h-56 resize-none"
            placeholder={Lookups.INPUT_PLACEHOLDER}
            onChange={(event) => setUserInput(event.target.value)}
          />
          {userInput && (
            <ArrowRight className="bg-blue-500 p-3 h-8 w-8 rounded-md" />
          )}
        </div>
        <div>
          <Link className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
