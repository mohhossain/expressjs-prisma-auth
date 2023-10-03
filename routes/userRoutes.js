import { getUsers, getUserById } from "../controller/userController.js";
import express from "express";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUserById);

export default router;
