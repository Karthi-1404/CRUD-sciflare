import express from "express";
import { 
    getAllOrganization,
    updateOrganization ,
    createOrganization,
    deleteOrganization,
    getAllUser,
    updateUser ,
    createUser,
    deleteUser} from "../controllers/adminController/admin.controller.js";

const router = express.Router();

router.get("/organizations", getAllOrganization);
router.post("/organizations", createOrganization);
router.put("/organizations/:id", updateOrganization);
router.delete("/organizations/:id", deleteOrganization);
router.get("/user", getAllUser);
router.post("/user", createUser);
router.put("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);

export default router;
