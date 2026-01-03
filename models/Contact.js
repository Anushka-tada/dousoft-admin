import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
        },
         email:{
            type: String,
            required: true,
        },
         phone:{
            type: Number,
            required: true,
        },
        message:{
            type: String,
            required: false,
        },
        
    }, { timestamps: true },
);
export default mongoose.models.Contact ||

mongoose.model("Contact", ContactSchema);