import React from 'react'
import Navbar from './components/Navbar'
import Hello from '@/public/images/Hello.svg'
import Photo from '@/public/images/Photo.svg'
import Image from 'next/image'
import { Facebook, Github, Instagram, Linkedin, Sparkle, Twitter, Youtube } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { RiInstagramFill, RiYoutubeFill } from 'react-icons/ri'
import Frontend from '@/public/images/FE.svg'

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
      <div className='flex py-10 border-y-[3px] border-darkUser'>
        <div className='w-1/12'></div>
        <div className='w-10/12 flex justify-between items-center'>
          <div className='flex items-center gap-2'>
            <div className='p-2 rounded-full border-[3px] border-darkUser'>
              <Facebook fill='darkUser' size={24} />
            </div>
            <span className='text-2xl'>Facebook</span>
          </div>
          <Sparkle fill='darkUser' size={16} />
          <div className='flex items-center gap-2'>
            <div className='p-2 rounded-full border-[3px] border-darkUser'>
              <RiInstagramFill className='text-darkUser text-2xl' />
            </div>
            <span className='text-2xl'>Instagram</span>
          </div>
          <Sparkle fill='darkUser' size={16} />
          <div className='flex items-center gap-2'>
            <div className='p-2 rounded-full border-[3px] border-darkUser'>
              <RiYoutubeFill className='text-darkUser text-2xl' />
            </div>
            <span className='text-2xl'>Youtube</span>
          </div>
          <Sparkle fill='darkUser' size={16} />
          <div className='flex items-center gap-2'>
            <div className='p-2 rounded-full border-[3px] border-darkUser'>
              <Github fill='darkUser' size={24} />
            </div>
            <span className='text-2xl'>Github</span>
          </div>
          <Sparkle fill='darkUser' size={16} />
          <div className='flex items-center gap-2'>
            <div className='p-2 rounded-full border-[3px] border-darkUser'>
              <Linkedin fill='darkUser' size={24} />
            </div>
            <span className='text-2xl'>LinkedIn</span>
          </div>
        </div>
        <div className='w-1/12'></div>
      </div>
      <div className='bg-quadUser py-20'>
        <div className='flex items-center justify-center gap-2'>
          <Sparkle fill='darkUser' size={16} />
            <span className='text-2xl'>Services</span>
          <Sparkle fill='darkUser' size={16} />
        </div>
        <h2 className='text-5xl text-center mt-1'>My broad set of services</h2>
        <p className='text-base text-center w-2/4 mx-auto mt-1'>Lorem ipsum dolor sit amet, consectetur adipiscing elit aliquam et erat donec pulvinar enim potenti etiam at quis volutpat aliquet</p>
        <div className='flex mt-10'>
          <div className='w-1/12'></div>
          <div className='w-10/12 rounded-t-3xl rounded-b-3xl border-t-[3px] border-b-[3px] border-x-[3px] border-darkUser bg-darkUser flex gap-1 justify-center flex-wrap py-[2px]'>
            <div className='w-[33%] p-10 flex flex-col justify-center items-center bg-white rounded-tl-[20px]'>
              <Image src={Frontend} width={120} alt="Logo" />
              <h3 className='text-2xl'>Front-End Developer</h3>
              <span className='text-center'>Lacus adipiscing lectus convallis purus aliquet cursus magnaol dolori montes augue donec cras.</span>
            </div>
            <div className='w-[33%] p-10 flex flex-col justify-center items-center bg-white'>
              <Image src={Frontend} width={120} alt="Logo" />
              <h3 className='text-2xl'>UI/UX design</h3>
              <span className='text-center'>Lacus adipiscing lectus convallis purus aliquet cursus magnaol dolori montes augue donec cras.</span>
            </div>
            <div className='w-[33%] p-10 flex flex-col justify-center items-center bg-white rounded-tr-[20px]'>
              <Image src={Frontend} width={120} alt="Logo" />
              <h3 className='text-2xl'>Wordpress Developer</h3>
              <span className='text-center'>Lacus adipiscing lectus convallis purus aliquet cursus magnaol dolori montes augue donec cras.</span>
            </div>
            <div className='w-[33%] p-10 flex flex-col justify-center items-center bg-white rounded-bl-[20px]'>
              <Image src={Frontend} width={120} alt="Logo" />
              <h3 className='text-2xl'>Designer</h3>
              <span className='text-center'>Lacus adipiscing lectus convallis purus aliquet cursus magnaol dolori montes augue donec cras.</span>
            </div>
            <div className='w-[33%] p-10 flex flex-col justify-center items-center bg-white'>
              <Image src={Frontend} width={120} alt="Logo" />
              <h3 className='text-2xl'>Front-End Developer</h3>
              <span className='text-center'>Lacus adipiscing lectus convallis purus aliquet cursus magnaol dolori montes augue donec cras.</span>
            </div>
            <div className='w-[33%] p-10 flex flex-col justify-center items-center bg-white rounded-br-[20px]'>
              <h3 className='text-2xl'>Get in Touch</h3>
              <span className='text-center'>Lacus adipiscing lectus convallis purus aliquet cursus magnaol dolori montes augue donec cras.</span>
            </div>
          </div>
          <div className='w-1/12'></div>
        </div>
      </div>
    </>
  )
}
