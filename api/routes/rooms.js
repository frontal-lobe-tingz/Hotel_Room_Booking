import express from "express";
import { createdRoom,updateRoom,getAllRooms,getRoomById,deleteRoom } from "../controllers/room.js";
import { verifyAdmin } from "../util/verifyToken.js";

const router = express.Router();

//create

router.post("/:hotelid",verifyAdmin, createdRoom);

//update

router.put("/:id",verifyAdmin, updateRoom);

//getbyid

router.get("/:id", getRoomById);

//get all rooms

router.get("/", getAllRooms);

//delete room

router.delete("/:id/:hotelid",verifyAdmin, deleteRoom);

export default router;