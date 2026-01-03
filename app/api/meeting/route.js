import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Meeting from "@/models/Meeting";

export async function POST(req) {

try{
   await connectDB();
   const{name , email , phone , subject , date , time} = await req.json();

   if(!name || !email || !phone || !subject || !date || !time){
    return NextResponse.json(
        {error: "All fields are required"},
        {status: 400}
    );
   }

   const meeting = await Meeting.create({
    name,
    email,
    phone,
    subject,
    time,
    date,
   })

   return NextResponse.json(
    {
        message: "Your meeting request has been submitted successfully. We will contact you shortly.",
        data: meeting,
       statusCode: 200,
    },
    {status: 201}
   )

}
catch(err){
   return NextResponse.json(
    { error: err.message },
    { status: 500 }
   )
}

}    

export async function GET(){
  await connectDB();
  const bookings = await Meeting.find();
  return NextResponse.json({
     message: "Bookings Fetched successfully",
     data: bookings,
      statusCode: 201,
  },
  {status: 200}
)
}