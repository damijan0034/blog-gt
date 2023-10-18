"use client"

import Link from 'next/link'
import { useSession,signOut } from 'next-auth/react'

export default function Navbar() {
    const{status}=useSession()
  return (
    <div className='flex justify-between pb-4 border-b mb-4'>
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
                <div>
                    <button className='btn' onClick={()=>signOut()}>Sign Out</button>
                </div>
            ) : (
                <div className='flex items-center'>
                <Link className='btn' href={"/sign-in"}>Signin</Link>
                </div>
            )
        }
        
    </div>
  )
}
