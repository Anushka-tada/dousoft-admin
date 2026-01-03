import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import mongoose from "mongoose";

export async function GET(req , {params}){
    try{
        await connectDB();
       console.log("PARAMS:", params);
        const {id} = await params;

        // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid blog ID" },
        { status: 400 }
      );
    }

    const blog = await Blog.findById(id);

    if(!blog){
        return NextResponse.json(
            {message:"Blog not found"},
            {status:404}
        )
    }

    return NextResponse.json(
        {
            message:"Blogs Fetched Successfully",
            data: blog
        },
        {status:200}
    )


    }
    catch(error){
        return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
    }
}