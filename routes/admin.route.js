import { Router } from "express";
import { checkJWT } from "../middlewares/jwt/check.jwt.js";
import { checkRole } from "../middlewares/security/roleCheck.js";
import { promoteUser } from "../controllers/admin.controller.js";

export const AdminRouter = Router();

// Route to promote users to developer or admin, accessible only by admins
AdminRouter.patch(
  "/promote/:userId",
  checkJWT,
  checkRole("admin"),
  promoteUser
);
