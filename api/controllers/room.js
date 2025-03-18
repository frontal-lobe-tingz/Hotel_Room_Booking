import Room from "../models/Room.js"
import {createError} from "../util/error.js"
import Hotel from "../models/Hotel.js"




export const createdRoom = async (req,res,next) => {

const hotelId = req.params.hotelId;
const newRoom = new Room(req.body)

try{

    const savedRoom = await newRoom.save()
try{
await Hotel.findByIdAndUpdate(hotelId,{$push:{rooms: savedRoom._id}})
}catch(err){
next(err);
}
res.status(200).json(savedRoom);
}catch(err){
    next(createError(400, "Invalid Room Data"));
}

}

// Update
export const updateRoom = async (req, res, next) => {
    try {
        const updatedRoom = await Hotel.findByIdAndUpdate(
            req.params.id, req.body, 
            { new: true });
        if (!updatedHotel) {
            return res.status(404).json({ message: 'Hotel not found' });
        }
        res.status(200).json(updatedHotel);
    } catch (e) {
        next(e);
    }
};

// Delete
export const deleteRoom = async (req, res, next) => {
 const hotelId = req.params.hotelId;
    try {
        const deletedRoom = await Room.findByIdAndDelete(req.params.id);
        if (!deletedRoom) {
            return res.status(404).json({ message: 'Room not found' });
        }
        try{
await Hotel.findByIdAndUpdate(hotelId,{
    $pull:{rooms:req.params.id },
});
        }catch (e) {
        
        }
        res.status(200).json("Room deleted");
    } catch (e) {
        next(e);
    }
};

// Get all
export const getAllRooms = async (req, res, next) => {
    try {
        const rooms = await Room.find();
        res.status(200).json(hotels);
    } catch (e) {
        next(e);
    }
};

// Get by ID
export const getRoomById = async (req, res, next) => {
    try {
        const Room = await Room.findById(req.params.id);
        if (!Room) {
            return res.status(404).json({ message: 'Hotel not found' });
        }
        res.json(Room);
    } catch (e) {
        next(e);
    }
};
