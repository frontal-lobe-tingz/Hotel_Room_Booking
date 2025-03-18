import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema(
{
    title:{
        type: 'string',
        required: true,
    },
    hotelId: {type: mongoose.Schema.Types.ObjectId, ref: 'Hotel'},
    roomNumbers: [{number: Number,unavailableDates:{type:[Date]}}],
    price: {type: Number, required: true},
    desc: {type: String, required: true},
    maxPeople: {type: Number, required: true},
  }
,{timestamps: true}
)





export default mongoose.model("Room",RoomSchema);