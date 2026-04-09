// import { NextResponse } from "next/server";
// import { connectDB } from "@/lib/mongodb";
// import JobApplication from "@/models/jobRequest";
// import Career from "@/models/Career";

// // ✅ CORS Headers
// const corsHeaders = {
//   "Access-Control-Allow-Origin": "*",
//   "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
//   "Access-Control-Allow-Headers": "Content-Type, Authorization",
// };

// // ✅ Preflight
// export async function OPTIONS() {
//   return NextResponse.json({}, { status: 200, headers: corsHeaders });
// }


// // 🔹 APPLY JOB (JSON BASED)
// export async function POST(req) {
//   try {
//     await connectDB();

//     const body = await req.json();

//     const {
//       jobId,
//       name,
//       email,
//       phone,
//       linkedin,
//       portfolio,
//       experience,
//       coverLetter,
//       resume, 
//     } = body;

//     // ✅ Validation
//     if (!jobId || !name || !email || !phone || !coverLetter || !resume) {
//       return NextResponse.json(
//         { message: "All required fields must be filled" },
//         { status: 400, headers: corsHeaders }
//       );
//     }

//     // ✅ Check job exists
//     const job = await Career.findById(jobId);
//     if (!job) {
//       return NextResponse.json(
//         { message: "Invalid job" },
//         { status: 404, headers: corsHeaders }
//       );
//     }

//     // ✅ Create application
//     const application = await JobApplication.create({
//       jobId,
//       name,
//       email,
//       phone,
//       linkedin,
//       portfolio,
//       experience,
//       coverLetter,
//       resume,
//     });

//     return NextResponse.json(
//       {
//         message: "Application submitted successfully",
//         data: application,
//       },
//       { status: 201, headers: corsHeaders }
//     );

//   } catch (error) {
//     return NextResponse.json(
//       { message: error.message },
//       { status: 500, headers: corsHeaders }
//     );
//   }
// }



// export async function GET() {
//   try {
//     await connectDB();

//     const applications = await JobApplication.find()
//       .populate("jobId", "title slug");

//     return NextResponse.json(
//       {
//         message: "Applications fetched successfully",
//         data: applications,
//       },
//       { status: 200, headers: corsHeaders }
//     );

//   } catch (error) {
//     return NextResponse.json(
//       { message: error.message },
//       { status: 500, headers: corsHeaders }
//     );
//   }
// }

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import JobApplication from "@/models/jobRequest";
import Career from "@/models/Career";
import fs from "fs";
import path from "path";

// ✅ CORS Headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { status: 200, headers: corsHeaders });
}

// 🔥 UPDATED API (FormData + File Upload)
export async function POST(req) {
  try {
    await connectDB();

    // ✅ GET FORM DATA (NOT JSON)
    const formData = await req.formData();

    const jobId = formData.get("jobId");
    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const linkedin = formData.get("linkedin");
    const portfolio = formData.get("portfolio");
    const experience = formData.get("experience");
    const coverLetter = formData.get("coverLetter");
    const file = formData.get("resume"); // 👈 file

    // ✅ Validation
    if (!jobId || !name || !email || !phone || !coverLetter || !file) {
      return NextResponse.json(
        { message: "All required fields must be filled" },
        { status: 400, headers: corsHeaders }
      );
    }

    // ✅ Check job exists
    const job = await Career.findById(jobId);
    if (!job) {
      return NextResponse.json(
        { message: "Invalid job" },
        { status: 404, headers: corsHeaders }
      );
    }

    // ✅ FILE SAVE LOGIC
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileName = `${Date.now()}-${file.name}`;

    // make sure folder exists
    const uploadDir = path.join(process.cwd(), "public/uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, fileName);
    fs.writeFileSync(filePath, buffer);

    // ✅ SAVE URL
    const resumeUrl = `/uploads/${fileName}`;

    // ✅ SAVE IN DB
    const application = await JobApplication.create({
      jobId,
      name,
      email,
      phone,
      linkedin,
      portfolio,
      experience,
      coverLetter,
      resume: resumeUrl,
    });

    return NextResponse.json(
      {
        message: "Application submitted successfully",
        data: application,
      },
      { status: 201, headers: corsHeaders }
    );

  } catch (error) {
    console.error("UPLOAD ERROR:", error); // 👈 VERY IMPORTANT
    return NextResponse.json(
      { message: error.message },
      { status: 500, headers: corsHeaders }
    );
  }
}