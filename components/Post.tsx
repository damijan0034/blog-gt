import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import DeleteButton from './DeleteButton';
import { GetServerSideProps } from 'next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

interface PostProps{
    id:string,
    author:string,
    date:string,
    thumbnail?:string,
    title:string,
    authorEmail?:string,
    content:string,
    links?:string[],
    category?:string

}

export default async function Post({
    id,
    author,
    date,
    thumbnail,
    title,
    authorEmail,
    content,
    links,
    category


}:PostProps) {
    const session=await getServerSession(authOptions)

    const isEditable=
        session && session?.user?.email === authorEmail
    

    

  return (
    <div className='my-4 py-7 border-b border-b-slate-300'>
        <div className='mb-4'>
            {author ?(
                <>
                     Posted by <span className='font-bold'>{author}</span>  on {date}
                </>
            ) :
            (
                <>
                     Posted  on {date}
                </>
            )
                
            }
       
        </div>
        <div className='w-full h-72 relative'>
            {thumbnail ? (
                <Image src={thumbnail} alt='author' fill
                    className='object-cover rounded-md object-center'
                />
            ) : (
                <Image src={'/thumbnail-placeholder.png'} alt='title' fill
                        className='object-cover rounded-md object-center'
                />
            )}
        </div>
        {
            category && (
                <Link className='bg-slate-800 w-fit text-white
                px-4 py-0.5 text-sm font-bold rounded-md mt-4 block
                ' 
                href={`/categories/${category}`}>{category}</Link>
            )
        }
        <h2>{title}</h2>
        <p className='content'>{content}</p>

        {
            links && (
                <div className='my-4 flex flex-col gap-3'>
                    {
                        links.map((link,i)=>(
                            <div key={i} className='flex gap-2 items-center'>
                                <Link className='link' href={link}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                                </svg>
                                {link}
                                </Link>
                            </div>
                        ))
                    }
                </div>
            )
        }

        {
            isEditable && (
                <div className='flex gap-3 font-bold
                    px-4 py-2 bg-slate-200 rounded-md w-fit
                '>
                       <Link href={`/edit-post/${id}`}>Edit</Link>
                       <DeleteButton id={id} /> 
                </div>
                
            )
        }
        
       
    </div>
  )
}
