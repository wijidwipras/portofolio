"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Logo from '@/public/Logo.svg'
import { Card } from '@/components/ui/card'
import { Oswald as FontSans } from "next/font/google"
import { cn } from "@/lib/utils"
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { IoPersonCircleOutline } from "react-icons/io5";
import { RiFilePaper2Line } from "react-icons/ri";
import Link from 'next/link'

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

const dataFeature = [
  {
    name: "Home",
    path: "/dashboard",
    icon: <MdOutlineSpaceDashboard />
  },
  {
    name: "Blog",
    path: "/dashboard/blog",
    icon: <RiFilePaper2Line />
  },
  {
    name: "Profile",
    path: "/dashboard/profile",
    icon: <IoPersonCircleOutline />
  },
]

export default function Sidebar() {
  const [sidebarActive, setSidebarActive] = useState("home")

  useEffect(() => {
    if (typeof window !== "undefined") { // memastikan dijalankan di browser
      const activeMenu = localStorage.getItem("sidebar") ?? "home";
      setSidebarActive(activeMenu);
    }
  }, []);

  const handleClick = (data: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("sidebar", data);
      setSidebarActive(data);
    }
  }

  // console.log(sidebarActive)

  const active = "bg-black text-white"
  const nonActive = "bg-white text-black"

  return (
    <div className='w-2/12 h-screen bg-zinc-50 p-4'>
      <Card className={cn('flex gap-2 items-center py-3 px-4 rounded-md text-2xl mb-2', fontSans.className)}>
        <Image
          src={Logo}
          width={24}
          height={24}
          alt="Logo"
        />
        PRZ
      </Card>
      <div className='flex flex-col gap-2'>
        {
          dataFeature.map((item, index) => (
            <Link key={index} href={item.path}>
              <Card key={index} className={`py-3 px-4 rounded-md flex gap-2 items-center ${sidebarActive === item.name.toLowerCase() ? active : nonActive } group hover:bg-black hover:text-white`} onClick={() => handleClick(item.name.toLowerCase())}>
                <div className='text-xl  group-hover:text-white'>
                  {item.icon}
                </div>
                {item.name}
              </Card>
            </Link>
          ))
        }
      </div>
    </div>
  )
}
