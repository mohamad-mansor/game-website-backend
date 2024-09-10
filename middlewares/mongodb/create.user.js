import createHttpError from "http-errors";
import { UserModel } from "../../models/User.model.js";

export async function createUser(req, res, next) {
  try {
    // Attempt to create a new user using the request body
    const user = await UserModel.create(req.body);
    req.user = user;
    next();
  } catch (error) {
    console.error(error); // Log the error for debugging
    next(
      createHttpError.InternalServerError(
        "Failed to create your Account, please contact support."
      )
    );
  }
}
