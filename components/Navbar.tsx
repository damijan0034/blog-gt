"use client"

import Link from 'next/link'
import { useSession,signOut } from 'next-auth/react'
import Image from 'next/image'
import { useState } from 'react'

export default function Navbar() {

    const{status,data:session}=useSession()
    const[isPopupVisible,setIsPopupVisible]=useState(false)
    
   
   
    
  return (
    <div className='flex justify-between pb-4 border-b mb-4 relative'>
        <div>
            <Link href={'/'}>
                <h1 className='text-4xl font-bold 
                tracking-tighter text-dark'>Tech News</h1>
            </Link>
            <p className='text-sm'>
                Exploring tommorow innovations <br />
                One byte a time
            </p>
        </div>
        {
            status === "authenticated" ? (
                <>
                    <div className={`absolute z-30 right-0 top-20
                    bg-white p-6 shadow-lg rounded-md flex flex-col
                    gap-2 text-right min-w-[160px]
                    ${
                        isPopupVisible ? 'flex' : 'hidden'
                    }`}>
                        <div className='font-bold'>
                            {
                                session?.user?.name
                            }
                        </div>
                        <div >
                            {
                                session?.user?.email
                            }
                        </div>
                        <Link href={'/dashboard'}>Dashboard</Link>
                        <Link href={'/create-post'}>Create post</Link>
                        <button className='btn' onClick={()=>signOut()}>Sign Out</button>
                    </div>
                    <div className='flex gap-2 items-center'>

                    
                    <Link className='hidden md:flex gap-2 items-center mr-6' href={"/create-post"}>
                    <span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    </span>
                    <span>Create New</span>
                    
                    </Link>
                    <div onClick={()=>setIsPopupVisible(prev=>!prev)}>
                        <Image src={session?.user?.image || ""} 
                        width={36} height={36} alt='Profile'
                        className='rounded-full cursor-pointer'
                        />
                       
                    </div>
                    </div>
                    </>
                
            ) : (
                <div className='flex items-center'>
                    <Link className='btn' href={"/sign-in"}>Signin</Link>
                </div>
            )
        }
        
    </div>
  )
}
