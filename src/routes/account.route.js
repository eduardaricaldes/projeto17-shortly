import { Router } from "express";
import { SignUpController, SignInController } from "../controllers/account.controller.js";
import { SchemaValidation } from "../middlewares/schema-validation.middleware.js";
import { SignUpSchema, SignInSchema } from '../schemas/account.schema.js';

const router = Router();

router.post("/signup", SchemaValidation(SignUpSchema), SignUpController);
router.post("/signin", SchemaValidation(SignInSchema), SignInController);
export default router;              
