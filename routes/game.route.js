import { Router } from "express";
import { createGame, approveGame } from "../controllers/game.controller.js";
import { checkJWT } from "../middlewares/jwt/check.jwt.js";
import { checkRole } from "../middlewares/security/roleCheck.js";

export const GameRouter = Router();

GameRouter.post("/", checkJWT, checkRole("developer"), createGame);
GameRouter.patch("/approve/:id", checkJWT, checkRole("admin"), approveGame);
