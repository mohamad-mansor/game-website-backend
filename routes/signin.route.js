import { Router } from "express";
import { signInController } from "../controllers/signin.controller.js";
import { check } from "express-validator";
import { reqValidation } from "../middlewares/security/req.validation.js";
import { userAuthorization } from "../middlewares/security/user.authorization.js";
import { createJWT } from "../middlewares/jwt/create.jwt.js";

export const SignInRouter = Router();

SignInRouter.post(
  "/",
  check("email").isEmail().withMessage("Valid email is required"),
  check("password").notEmpty().withMessage("Password is required"),
  reqValidation,
  userAuthorization,
  createJWT,
  signInController
);
