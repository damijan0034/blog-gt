import cloudinary from "cloudinary"
import { NextResponse } from "next/server"

cloudinary.v2.config({
    cloud_name:process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

const removeImage=async (public_id:string)=>{
    try {
        await cloudinary.v2.uploader.destroy(public_id)
        console.log("Image removed");
        
    } catch (error) {
        console.log(error);
        
    }
}

export async function POST(req: Request){
    const public_id=await req.json()
    await removeImage(public_id)
    return NextResponse.json({message:"success"})
}