"use client"

import { signIn } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'

export default function SignInBtns() {
  return (
    <>
    <h1 className='text-center mt-8'>Sign In</h1>
    <div className='flex flex-col items-center justify-center
          gap-4 mt-4 p-4
    '>
    <button className='flex items-center border rounded-full gap-4
              hover:bg-slate-100/25 p-4 transition
    '
    onClick={()=>signIn("github")}
    >
        <span>
          <Image src={'/github-logo.svg'}
           alt='github'
           width={30} height={30}  />
        </span>
        Sign in with GitHub
      </button>
      <button className='flex items-center border rounded-full gap-4
              hover:bg-slate-100/25  transition p-4'
              onClick={()=>signIn("google")}
              >
        <span>
          <Image src={'/google-logo.svg'}
           alt='google'
           width={30} height={30}  />
        </span>
        Sign in with Google
      </button>
    </div>
     
     
    </>
  )
}
