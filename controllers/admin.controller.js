import { UserModel } from "../models/User.model.js";
import createHttpError from "http-errors";

// Function to promote a user
export async function promoteUser(req, res, next) {
  try {
    const { userId } = req.params; // Get user ID from request parameters
    const { role } = req.body; // Get the new role from request body

    // Ensure that the role is either 'developer' or 'admin'
    if (!["developer", "admin"].includes(role)) {
      return next(
        createHttpError.BadRequest(
          "Invalid role. Must be 'developer' or 'admin'."
        )
      );
    }

    // Find the user in the database by ID
    const user = await UserModel.findById(userId);
    if (!user) {
      return next(createHttpError.NotFound("User not found"));
    }

    // Update the user's role
    user.role = role;
    await user.save();

    // Send a success response
    res.status(200).json({ message: `User promoted to ${role}`, user });
  } catch (error) {
    console.error(error);
    next(createHttpError.InternalServerError("Failed to promote user"));
  }
}
