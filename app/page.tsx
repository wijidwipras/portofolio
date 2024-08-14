import React from 'react'
import Navbar from './components/Navbar'
import Hello from '@/public/images/Hello.svg'
import Photo from '@/public/images/photo.svg'
import Image from 'next/image'
import { Sparkle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <div className='w-full flex h-[625px] px'>
        <div className='w-1/12 bg-primaryUser'></div>
        <div className='w-1/2 flex justify-center items-center p-20 border-r-[3px] border-darkUser bg-primaryUser'>
          <div className='flex flex-col gap-2'>
            <div className='flex gap-1 items-center'>
              <Sparkle size={14} />
              <span className='text-base font-semibold text-black'>Welcome</span>
              <Sparkle size={14} />
            </div>
            <span className='text-5xl font-semibold text-black'>Hey, I&apos;m Pras, A Creative Front-End Developer</span>
            <span className='text-base font-semibold text-black'>Lorem ipsum dolor sit amet, consectetur adipiscing elit aliquam et erat donec pulvinar enim potenti etiam</span>
            <div className='flex mt-4'>
              <Button className='text-base font-semibold text-white bg-darkUser hover:bg-white hover:text-darkUser border-[3px] border-darkUser rounded-full px-6 py-6'>Contact me</Button>
              <Button className='text-base font-semibold text-darkUser bg-white border-[3px] border-darkUser rounded-full px-6 py-6 ml-2 hover:text-white'>Send me a message</Button>
            </div>
          </div>
        </div>
        <div className='w-1/2 bg-secondaryUser'>
          <div className='w-full h-full flex justify-center items-center'>
            <div className=' w-[450px] h-[450px] relative'>
              <Image src={Photo} width={400} height={400} alt="Photo" />
              <Image src={Hello} width={180} alt="Photo" className='absolute right-5 -top-5' />
              </div>
          </div>
        </div>
        <div className='w-1/12 bg-secondaryUser'></div>
      </div>
    </>
  )
}
