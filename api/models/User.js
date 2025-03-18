import mongoose from "mongoose";

const UserSchema = new mongoose.Schema ({
    username:{
        type:String,
        required: true,
        unique: true,
        

    },
    password:{

    },
    email:{
        type:String,
        required: true,
        unique: true,
      
    },
    isAdmin:{
        type:Boolean,
        default: false,
        required: true,
    },



},{timestamps:true}
);

export default mongoose.model("User", UserSchema)