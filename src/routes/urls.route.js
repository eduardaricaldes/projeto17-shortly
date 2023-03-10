import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware.js";
import { SchemaValidation } from "../middlewares/schema-validation.middleware.js";
import {
  CreateShortUrlController,
  GetShortUrlByIdController,
  RedirectController,
  DeleteShortByIdController,
  GetUsersMeController,
  GetRankingController,
} from "../controllers/urls.controller.js";
import { CreateShortUrlSchema } from "../schemas/urls.schema.js";
const router = Router();

router.post("/urls/shorten", [AuthMiddleware, SchemaValidation(CreateShortUrlSchema)], CreateShortUrlController);
router.get("/urls/:id", GetShortUrlByIdController);
router.get("/urls/open/:shortUrl", RedirectController);
router.delete("/urls/:id",AuthMiddleware,DeleteShortByIdController );
router.get("/users/me",AuthMiddleware, GetUsersMeController);
router.get("/ranking", GetRankingController)

export default router;              
