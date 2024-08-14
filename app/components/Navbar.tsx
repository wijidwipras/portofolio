import React from 'react'
import Image from 'next/image'
import Sparkle from '@/public/images/Sparkle.svg'
import Braces from '@/public/images/Braces.svg'
import localFont from 'next/font/local'
import { cn } from "@/lib/utils"
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

const clashDisplay = localFont({
    src: [
      {
        path: '../../public/font/clashDisplay/ClashDisplay-Semibold.woff2',
        weight: '600',
        style: 'semibold',
      },
    ],
  })

const Menus = [
    {
        name: "Home",
        path: "/",
    },
    {
        name: "Blog",
        path: "/blog",
    },
    {
        name: "About",
        path: "/about",
    },
]

export default function Navbar() {
  return (
    <div className='h-24 w-full flex bg-darkUser'>
        <div className="border-[3px] border-darkUser w-1/12 flex justify-center items-center">
            <Image src={Sparkle} width={65} height={65} alt="sparkle" />
        </div>
        <div className="border-y-[3px] border-darkUser w-10/12 flex">
            <div className={cn("bg-tertiaryUser flex justify-center items-center px-5", clashDisplay.className )}>
                <span className='text-3xl font-semibold'>PRZ</span>
            </div>
            <div className='bg-darkUser w-full flex justify-center items-center px-5'>
                <div className='border-r-[3px] border-white h-full text-darkUser'></div>
                {
                    Menus.map((menu, index) => (
                        <div key={index} className={cn("flex justify-center items-center px-5 border-r-[3px] border-white h-full", clashDisplay.className )}>
                            <Link href={menu.path} className='text-base font-semibold text-white'>{menu.name.toLocaleUpperCase()}</Link>
                        </div>
                    ))
                }
            </div>
            <div className={cn("bg-tertiaryUser flex justify-center items-center px-5", clashDisplay.className )}>
                <span className='font-semibold text-nowrap flex'>CONTACT ME <ArrowUpRight /></span>
            </div>
        </div>
        <div className="border-[3px] border-darkUser w-1/12 flex justify-center items-center">
            <Image src={Braces} width={65} height={65} alt="braces" />
        </div>
    </div>
  )
}
