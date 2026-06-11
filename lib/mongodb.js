

// import mongoose from "mongoose";

// let cached = global.mongoose;

// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null };
// }

// export async function connectDB() {
//   if (cached.conn) return cached.conn;

//   const MONGODB_URI = process.env.MONGODB_URI;

//   if (!MONGODB_URI) {
//     throw new Error("MONGODB_URI not found");
//   }

//   if (!cached.promise) {
//     cached.promise = mongoose.connect(MONGODB_URI);
//   }

//   cached.conn = await cached.promise;
//   return cached.conn;
// }


import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) {
    // Agar pehle se connect hai, toh bina message ke return karega 
    // taaki baar-baar console flood na ho
    return cached.conn; 
  }

  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI not found");
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI);
  }

  try {
    cached.conn = await cached.promise;
    
    // Naya message jo success hone par dikhega
    console.log("MongoDB Connected Successfully! 🎉"); 
    
    return cached.conn;
  } catch (error) {
    // Agar connect hone mein koi dikkat aati hai
    console.error("MongoDB connection error: ❌", error);
    throw error;
  }
}
