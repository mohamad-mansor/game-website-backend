import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import { UserModel } from "../../models/User.model.js"; // Import user model to retrieve user data

export async function checkJWT(req, res, next) {
  try {
    const jwttoken = req.cookies.jwt;
    if (!jwttoken) {
      return next(
        createHttpError.Unauthorized("Access denied! No token provided.")
      );
    }

    // Verify the token
    const decoded = jwt.verify(jwttoken, process.env.JWTKEY);

    // Fetch user data from the database
    const user = await UserModel.findById(decoded.id);
    if (!user) {
      return next(
        createHttpError.Unauthorized("Access denied! User not found.")
      );
    }

    req.user = user; // Assign the user object to req.user
    next();
  } catch (error) {
    console.log(error);
    next(createHttpError.Unauthorized("Invalid token or expired token!"));
  }
}
