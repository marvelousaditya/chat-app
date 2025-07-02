import getUsers from "../controllers/user.controllers";
import { Router } from "express";
import verifyToken from "../middlewares/verifyToken";
const router = Router();

router.get("/", verifyToken, getUsers);

export default router;
