
// import { NextResponse } from "next/server";
// import Blog from "@/models/Blog";
// import { connectDB } from "@/lib/mongodb";


// export async function POST(req){

//    try{
//      await connectDB();

//     const{title , description, content , image , slug, category , tags , status , author } = await req.json();

//     if(!title || !description || !content || !image || !slug || !category || !author){
//         return NextResponse.json(
//             {
//                 message: "All fields are required"
//             },
//             {status:400}
//         )
//     }

//     const blog = await Blog.create({title , description , content, image , slug , category , tags , status , author});

//     return NextResponse.json(
//         {message:"blog created successfully",
//             data:blog
//         },
//         {status:201},
//     )
//    } catch(err){
//     return NextResponse.json(
//         {message: err.message},
//         {status: 500}
//     )
//    }
// }

// export async function GET(){
//     await connectDB();
//     const blogs = await Blog.find();
//     return NextResponse.json( {
//          message: "Blogs fetched successfully",
//          data: blogs,
//        }, { status: 200 });
// }

import { NextResponse } from "next/server";
import Blog from "@/models/Blog";
import { connectDB } from "@/lib/mongodb";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// Preflight request
export async function OPTIONS() {
  return NextResponse.json({}, { status: 200, headers: corsHeaders });
}

export async function POST(req) {
  try {
    await connectDB();

    const {
      title,
      description,
      content,
      image,
      slug,
      category,
      tags,
      status,
      author
    } = await req.json();

    if (!title || !description || !content || !image || !slug || !category || !author) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400, headers: corsHeaders }
      );
    }

    const blog = await Blog.create({
      title,
      description,
      content,
      image,
      slug,
      category,
      tags,
      status,
      author
    });

    return NextResponse.json(
      {
        message: "Blog created successfully",
        data: blog
      },
      { status: 201, headers: corsHeaders }
    );

  } catch (err) {
    return NextResponse.json(
      { message: err.message },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const blogs = await Blog.find();

    return NextResponse.json(
      {
        message: "Blogs fetched successfully",
        data: blogs
      },
      { status: 200, headers: corsHeaders }
    );

  } catch (err) {
    return NextResponse.json(
      { message: err.message },
      { status: 500, headers: corsHeaders }
    );
  }
}