"use client";
import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import Colors from '@/data/Colors'

const Header = () => {
  return (
    <div className='p-3 flex justify-between items-center'>
      <Image
        src="/icons/iconnew.png"
        alt="logo"
        width={80}
        height={80}
        priority
      />
      <div className='flex gap-5'>
        <Button variant="ghost">Sign In</Button>
        <Button 
        className="text-white"
        style={{
          backgroundColor: Colors.BLUE
        }}>Get Started</Button>
      </div>
    </div>
  )
}

export default Header