import prisma from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(req :Request,
                        {params} :{params :{id :string}}
                                ){
                try {
                    const id =params.id
                    const post=await prisma.post.findUnique({
                        where:{id}
                    })
                    return NextResponse.json(post)
                } catch (error) {
                    return NextResponse.json({message:"Error has ocurred"})
                }                    
                                    
}

export async function PUT(req :Request,
        {params}:{params:{id:string}}
    ){
        const id=params.id

        const{title,
            content,
            links,
            catName:selectedCategory,
            imgUrl,
            publicId
        }=await req.json()

        const session=await getServerSession(authOptions)

        if(!session){
            return NextResponse.json({error:"Not authenticated"},{status:401})
        }

        try {
            const post=await prisma.post.update({
                where:{id},
                data:{
                    title,content,links,catName:selectedCategory,imgUrl,publicId
                }
            }
    
                )
           
                return NextResponse.json(post)
        } catch (error) {
            console.log(error)
            return NextResponse.json({message:"Couldnt update"})
        }

       
}

export async function DELETE(req :Request,
        {params}:{params:{id:string}}
    ){
        const id= params.id

        const session=await getServerSession(authOptions)

        if(!session){
            return NextResponse.json({error:"Not authenticated"},{status:401})
        }

        try {
            const post=await prisma.post.delete({where:{id}})

            return NextResponse.json(post)
        } catch (error) {
            console.log(error)
            return NextResponse.json({message:"Cant delete"})
        }

       

}