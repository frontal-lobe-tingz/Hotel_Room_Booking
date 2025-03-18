import express from "express";

import { createUser,updateUser,  deleteUser,getUserById,getAllUsers } from "../controllers/user.js";
import { verifyAdmin, verifyToken,verifyUser } from "../util/verifyToken.js";

const router = express.Router();


/* router.get("/checkauthentication",verifyToken,(req,res,next)=>{
res.send("hello user you are logged in")
    })

//check user
router.get("/checkuser/:id",verifyUser,(req,res,next)=>{

    res.send("hello user, you are logged in and you can delete your account")

})

//checadmin

router.get("/checkadmin/:id",verifyAdmin,(req,res,next)=>{

    res.send("hello admin, you are logged in and you can delete all users")

})

 *///verify token    

//Create
router.post("/", createUser);

//update    

router.put("/:id",verifyUser, updateUser);

//delete

router.delete("/:id",verifyUser, deleteUser);

//GEtby id

router.get("/:id",verifyUser,getUserById);

//getall

router.get("/",verifyAdmin ,getAllUsers);

    
export default router;