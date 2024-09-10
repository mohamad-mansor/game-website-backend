import { Router } from "express";
import { signUpController } from "../controllers/signup.controller.js";
import { check } from "express-validator";
import { reqValidation } from "../middlewares/security/req.validation.js";
import { createUser } from "../middlewares/mongodb/create.user.js";
import { createJWT } from "../middlewares/jwt/create.jwt.js";

export const SignUpRouter = Router();

SignUpRouter.post(
  "/",
  check("username").notEmpty().withMessage("Username is required"),
  check("password").notEmpty().withMessage("Password is required"),
  check("email").isEmail().withMessage("Valid email is required"),
  reqValidation,
  createUser,
  createJWT,
  signUpController
);
