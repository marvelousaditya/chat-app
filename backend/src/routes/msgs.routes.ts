import { Router } from "express";
import { getMsgsForConversation } from "../controllers/msgs.controllers";

const router = Router();

router.get("/", getMsgsForConversation);

export default router;
