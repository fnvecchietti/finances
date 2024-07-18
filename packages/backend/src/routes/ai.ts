import { Router } from "express";
import { authenticationMiddleware } from "../middleware/authentication";
import { createPromptController } from "../controllers/ai-prompt";

export const router = Router();



router.post('/ai/prompt', authenticationMiddleware, createPromptController);
