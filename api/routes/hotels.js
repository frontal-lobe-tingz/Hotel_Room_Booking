import express from "express";
import { createdHotel, updateHotel, deleteHotel, getAllHotels, getHotelById, countByCity, countByType } from "../controllers/hotel.js";
import { createError } from "../util/error.js";
import { verifyAdmin } from "../util/verifyToken.js";

const router = express.Router();

//Create
router.post("/",verifyAdmin, createdHotel);

//update
router.put("/:id",verifyAdmin, updateHotel);

//delete

router.delete("/:id",verifyAdmin, deleteHotel);
//GEtby id

router.get("/find/:id",getHotelById);

//getall

router.get("/", getAllHotels);

router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
    
export default router;